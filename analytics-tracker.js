/**
 * analytics-tracker.js — Mô Phỏng PWA Tracker
 * Tracks: page views, clicks, video, scroll, session, + app-specific events:
 * - scenario_view, scenario_brake, scenario_score, exam_start, exam_finish,
 *   bookmark_add, bookmark_remove, chapter_view, tip_toggle, practice_filter
 */
(function () {
    'use strict';

    var API_URL = 'https://thayduydaotaolaixe.com/api/public/analytics';
    var SITE = 'mophong';
    var BATCH_INTERVAL = 10000;
    var queue = [];
    var sessionId = '';
    var pageEnteredAt = Date.now();
    var currentPage = '/';

    function getSessionId() {
        var sid = sessionStorage.getItem('_td_sid');
        if (!sid) {
            sid = 'sid_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
            sessionStorage.setItem('_td_sid', sid);
        }
        return sid;
    }

    function buildEvent(eventType, extra) {
        var evt = {
            site: SITE,
            sessionId: sessionId,
            eventType: eventType,
            page: currentPage,
            referrer: document.referrer || null,
            userAgent: navigator.userAgent,
            screenWidth: window.screen ? window.screen.width : null,
            ts: new Date().toISOString()
        };
        if (extra) evt.payload = extra;
        return evt;
    }

    function pushEvent(eventType, extra) {
        queue.push(buildEvent(eventType, extra));
    }

    function doFetch(body) {
        try {
            fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body,
                keepalive: true,
                credentials: 'omit',
                mode: 'cors'
            }).catch(function () { });
        } catch (e) { }
    }

    function flush() {
        if (queue.length === 0) return;
        var batch = queue.splice(0, queue.length);
        var body = JSON.stringify({ events: batch });
        if (navigator.sendBeacon) {
            var sent = navigator.sendBeacon(API_URL, new Blob([body], { type: 'application/json' }));
            if (!sent) doFetch(body);
        } else {
            doFetch(body);
        }
    }

    // ── Page navigation ───────────────────────────────────────
    function trackPageView(pageName) {
        var now = Date.now();
        var durationSec = Math.round((now - pageEnteredAt) / 1000);
        if (durationSec > 0 && currentPage) {
            pushEvent('page_duration', { page: currentPage, duration: durationSec });
        }
        currentPage = pageName || '/';
        pageEnteredAt = now;
        pushEvent('page_view');
    }

    // ── Hook app navigation ───────────────────────────────────
    function hookNavigation() {
        if (typeof window.navigateTo === 'function') {
            var original = window.navigateTo;
            window.navigateTo = function (page, data) {
                trackPageView('/' + (page || 'home'));
                return original.call(this, page, data);
            };
        }
    }

    // ── Hook scenario/brake/exam events ───────────────────────
    function hookAppSpecific() {
        // Scenario view: hook renderScenario
        if (typeof window.renderScenario === 'function') {
            var origRender = window.renderScenario;
            window.renderScenario = function (c) {
                var s = window.state;
                if (s && s.selectedScenario) {
                    pushEvent('scenario_view', { scenarioId: s.selectedScenario.id, title: (s.selectedScenario.title || '').slice(0, 60) });
                }
                return origRender.call(this, c);
            };
        }

        // Brake press: hook pressBrake
        if (typeof window.pressBrake === 'function') {
            var origBrake = window.pressBrake;
            window.pressBrake = function () {
                var s = window.state;
                pushEvent('scenario_brake', { scenarioId: s ? s.selectedScenario?.id : null });
                return origBrake.call(this);
            };
        }

        // Score: hook handleBrakeScore
        if (typeof window.handleBrakeScore === 'function') {
            var origScore = window.handleBrakeScore;
            window.handleBrakeScore = function (score, time) {
                var s = window.state;
                pushEvent('scenario_score', { scenarioId: s ? s.selectedScenario?.id : null, score: score, time: time });
                return origScore.call(this, score, time);
            };
        }

        // Exam start: hook startExam
        if (typeof window.startExam === 'function') {
            var origStart = window.startExam;
            window.startExam = function () {
                pushEvent('exam_start', { type: 'mophong' });
                return origStart.call(this);
            };
        }

        // Exam finish: hook finishExam
        if (typeof window.finishExam === 'function') {
            var origFinish = window.finishExam;
            window.finishExam = function () {
                var s = window.state;
                var examState = s ? s.examState : null;
                var totalScore = 0;
                if (examState && examState.scores) {
                    for (var k in examState.scores) totalScore += examState.scores[k];
                }
                pushEvent('exam_finish', { totalScore: totalScore, scenariosCount: examState ? examState.scenarios?.length : 0 });
                return origFinish.call(this);
            };
        }
    }

    // ── Clicks ────────────────────────────────────────────────
    function hookClicks() {
        document.addEventListener('click', function (e) {
            var target = e.target;
            for (var i = 0; i < 5 && target && target !== document.body; i++) {
                var tagName = target.tagName ? target.tagName.toLowerCase() : '';
                if (tagName === 'button' || tagName === 'a' || target.getAttribute('onclick')) {
                    var label = target.textContent ? target.textContent.trim().slice(0, 50) : '';
                    var id = target.id || '';
                    pushEvent('click', { tag: tagName, id: id, label: label });
                    break;
                }
                target = target.parentElement;
            }
        }, true);
    }

    // ── Videos ────────────────────────────────────────────────
    function hookVideos() {
        var observed = new WeakSet();
        function attachVideo(video) {
            if (observed.has(video)) return;
            observed.add(video);
            video.addEventListener('play', function () { pushEvent('video_play', { src: (video.src || '').slice(-80) }); });
            video.addEventListener('pause', function () { pushEvent('video_pause', { src: (video.src || '').slice(-80), currentTime: Math.round(video.currentTime) }); });
            video.addEventListener('ended', function () { pushEvent('video_ended', { src: (video.src || '').slice(-80) }); });
        }
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                m.addedNodes.forEach(function (node) {
                    if (node.tagName === 'VIDEO') attachVideo(node);
                    if (node.querySelectorAll) node.querySelectorAll('video').forEach(attachVideo);
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
        document.querySelectorAll('video').forEach(attachVideo);
    }

    // ── Scroll depth ──────────────────────────────────────────
    function hookScroll() {
        var reported = {};
        window.addEventListener('scroll', function () {
            var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var pct = Math.round((scrollTop + window.innerHeight) / scrollHeight * 100);
            [25, 50, 75, 100].forEach(function (m) {
                if (pct >= m && !reported[m]) { reported[m] = true; pushEvent('scroll', { depth: m }); }
            });
        }, { passive: true });
    }

    // ── Session end ───────────────────────────────────────────
    function trackSessionEnd() {
        var totalDuration = Math.round((Date.now() - parseInt(sessionStorage.getItem('_td_start') || Date.now())) / 1000);
        pushEvent('session_end', { totalDuration: totalDuration });
        flush();
    }

    // ── Init ──────────────────────────────────────────────────
    function init() {
        sessionId = getSessionId();
        if (!sessionStorage.getItem('_td_start')) sessionStorage.setItem('_td_start', String(Date.now()));
        trackPageView('/home');
        setTimeout(function () { hookNavigation(); hookAppSpecific(); }, 500);
        hookClicks();
        hookVideos();
        hookScroll();
        setInterval(flush, BATCH_INTERVAL);
        document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') trackSessionEnd(); });
        window.addEventListener('beforeunload', function () { trackSessionEnd(); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
