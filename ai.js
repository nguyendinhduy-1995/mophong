// ============================================
//  AI MODULE — Mô Phỏng GPLX
//  11 Features: Reflex Analysis, Adaptive Learning,
//  Voice Coach, Exam Prediction, Gamification,
//  Study Plan, Weakness Profile, Quiz, Replay Coach,
//  Daily Summary, Driving Tips
// ============================================

const AI_KEY = 'mophong_ai';

const AI = {
    data: {
        reactions: [],       // {scenarioId, score, reactionTime, chapter, timestamp}
        streak: { current: 0, longest: 0, lastDate: null },
        achievements: {},    // {id: timestamp}
        voiceEnabled: true,
        dailyChallengeDate: null,
        dailyChallengeIds: [],
        studyPlan: null,     // {days, startDate, schedule}
        quizResults: {},     // {scenarioId: {correct, answer, timestamp}}
        lastTipDate: null,
        lastTipIndex: 0
    },

    // ============ INIT ============

    init() {
        this.load();
        this.updateStreak();
        this.initVoice();
    },

    load() {
        try {
            const saved = localStorage.getItem(AI_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.assign(this.data, parsed);
            }
        } catch (e) { console.error('AI load error', e); }
    },

    save() {
        try {
            localStorage.setItem(AI_KEY, JSON.stringify(this.data));
        } catch (e) { console.error('AI save error', e); }
    },

    // ============ FEATURE 1: REFLEX ANALYSIS ============

    recordReaction(scenarioId, score, reactionTime, chapterId) {
        this.data.reactions.push({
            scenarioId,
            score,
            reactionTime: Math.round(reactionTime * 100) / 100,
            chapter: chapterId,
            timestamp: Date.now()
        });

        // Keep last 500 reactions max
        if (this.data.reactions.length > 500) {
            this.data.reactions = this.data.reactions.slice(-500);
        }

        this.updateStreak();
        this.checkAndAwardAchievements();
        this.save();
    },

    getReflexProfile() {
        const reactions = this.data.reactions;
        if (reactions.length === 0) return null;

        // Average score & reaction time per chapter
        const chapterStats = {};
        const chapters = typeof CHAPTERS !== 'undefined' ? CHAPTERS : [];

        chapters.forEach(ch => {
            const chReactions = reactions.filter(r => r.chapter === ch.id);
            if (chReactions.length > 0) {
                const avgScore = chReactions.reduce((s, r) => s + r.score, 0) / chReactions.length;
                const avgTime = chReactions.reduce((s, r) => s + r.reactionTime, 0) / chReactions.length;
                chapterStats[ch.id] = {
                    name: ch.name,
                    icon: ch.icon,
                    avgScore: Math.round(avgScore * 10) / 10,
                    avgTime: Math.round(avgTime * 10) / 10,
                    count: chReactions.length
                };
            }
        });

        // Overall stats
        const avgScore = reactions.reduce((s, r) => s + r.score, 0) / reactions.length;
        const avgTime = reactions.reduce((s, r) => s + r.reactionTime, 0) / reactions.length;

        // Trend (last 10 vs previous 10)
        let trend = 'stable';
        if (reactions.length >= 10) {
            const recent = reactions.slice(-10);
            const prev = reactions.slice(-20, -10);
            if (prev.length >= 5) {
                const recentAvg = recent.reduce((s, r) => s + r.score, 0) / recent.length;
                const prevAvg = prev.reduce((s, r) => s + r.score, 0) / prev.length;
                if (recentAvg > prevAvg + 0.3) trend = 'improving';
                else if (recentAvg < prevAvg - 0.3) trend = 'declining';
            }
        }

        // Weakest chapter
        let weakestChapter = null;
        let lowestScore = 6;
        Object.entries(chapterStats).forEach(([id, stats]) => {
            if (stats.avgScore < lowestScore && stats.count >= 2) {
                lowestScore = stats.avgScore;
                weakestChapter = { id: parseInt(id), ...stats };
            }
        });

        return {
            totalReactions: reactions.length,
            avgScore: Math.round(avgScore * 10) / 10,
            avgTime: Math.round(avgTime * 10) / 10,
            chapterStats,
            trend,
            weakestChapter
        };
    },

    getWeakScenarios(limit = 5) {
        const scores = typeof state !== 'undefined' ? state.scores : {};
        const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];

        // Scenarios with low scores or not attempted
        const weak = scenarios
            .map(s => ({
                ...s,
                score: scores[s.id],
                lastReaction: this.data.reactions.filter(r => r.scenarioId === s.id).slice(-1)[0]
            }))
            .filter(s => s.score === undefined || s.score <= 2)
            .sort((a, b) => {
                // Prioritize: never attempted → low score → old attempts
                if (a.score === undefined && b.score !== undefined) return -1;
                if (b.score === undefined && a.score !== undefined) return 1;
                if ((a.score || 0) !== (b.score || 0)) return (a.score || 0) - (b.score || 0);
                const aTime = a.lastReaction?.timestamp || 0;
                const bTime = b.lastReaction?.timestamp || 0;
                return aTime - bTime;
            })
            .slice(0, limit);

        return weak;
    },

    // ============ FEATURE 3: ADAPTIVE LEARNING ============

    getDailyPracticeList(limit = 10) {
        const scores = typeof state !== 'undefined' ? state.scores : {};
        const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];
        const now = Date.now();

        return scenarios
            .map(s => {
                const score = scores[s.id];
                const lastReaction = this.data.reactions
                    .filter(r => r.scenarioId === s.id)
                    .slice(-1)[0];
                const daysSince = lastReaction ? (now - lastReaction.timestamp) / 86400000 : 999;

                // Priority score: lower = should practice first
                let priority = 0;
                if (score === undefined) priority = 100;          // Never done
                else if (score <= 1) priority = 90 + daysSince;   // Very weak
                else if (score <= 2) priority = 70 + daysSince;   // Weak
                else if (score <= 3) priority = 40 + daysSince;   // Moderate
                else if (score <= 4) priority = 10 + daysSince;   // Good but old
                else priority = daysSince;                         // Mastered

                return { ...s, priority, score, daysSince: Math.round(daysSince) };
            })
            .sort((a, b) => b.priority - a.priority)
            .slice(0, limit);
    },

    createPersonalizedExam() {
        const scores = typeof state !== 'undefined' ? state.scores : {};
        const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];
        const chapters = typeof CHAPTERS !== 'undefined' ? CHAPTERS : [];

        // 70% weak scenarios, 30% random
        const weak = scenarios.filter(s => scores[s.id] === undefined || scores[s.id] <= 3);
        const strong = scenarios.filter(s => scores[s.id] !== undefined && scores[s.id] > 3);

        const selected = [];
        const usedIds = new Set();

        // Pick 7 from weak (or all if less)
        const shuffledWeak = [...weak].sort(() => Math.random() - 0.5);
        for (const s of shuffledWeak) {
            if (selected.length >= 7) break;
            selected.push(s);
            usedIds.add(s.id);
        }

        // Fill remaining 3 from strong
        const shuffledStrong = [...strong].sort(() => Math.random() - 0.5);
        for (const s of shuffledStrong) {
            if (selected.length >= 10) break;
            if (!usedIds.has(s.id)) {
                selected.push(s);
                usedIds.add(s.id);
            }
        }

        // If still not 10, fill from any
        if (selected.length < 10) {
            const remaining = scenarios.filter(s => !usedIds.has(s.id));
            const shuffled = remaining.sort(() => Math.random() - 0.5);
            for (const s of shuffled) {
                if (selected.length >= 10) break;
                selected.push(s);
            }
        }

        // Shuffle final
        for (let i = selected.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [selected[i], selected[j]] = [selected[j], selected[i]];
        }

        return selected;
    },

    getLearningProgress() {
        const scores = typeof state !== 'undefined' ? state.scores : {};
        const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];
        const chapters = typeof CHAPTERS !== 'undefined' ? CHAPTERS : [];

        const total = scenarios.length;
        const done = Object.keys(scores).length;
        const mastered = Object.values(scores).filter(s => s >= 4).length;

        const chapterProgress = chapters.map(ch => {
            const chScenarios = scenarios.filter(s => s.chapter === ch.id);
            const chDone = chScenarios.filter(s => scores[s.id] !== undefined).length;
            const chMastered = chScenarios.filter(s => scores[s.id] >= 4).length;
            const chAvg = chDone > 0 ?
                chScenarios.reduce((sum, s) => sum + (scores[s.id] || 0), 0) / chScenarios.length : 0;

            return {
                ...ch,
                total: chScenarios.length,
                done: chDone,
                mastered: chMastered,
                avgScore: Math.round(chAvg * 10) / 10,
                pct: Math.round((chDone / chScenarios.length) * 100)
            };
        });

        return { total, done, mastered, pct: Math.round((done / total) * 100), chapterProgress };
    },

    // ============ FEATURE 4: VOICE COACH ============

    _synth: null,
    _voices: [],

    initVoice() {
        if (!('speechSynthesis' in window)) return;
        this._synth = window.speechSynthesis;

        const loadVoices = () => {
            this._voices = this._synth.getVoices();
        };
        loadVoices();
        this._synth.onvoiceschanged = loadVoices;
    },

    speak(text) {
        if (!this.data.voiceEnabled || !this._synth) return;

        this._synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'vi-VN';
        utter.rate = 1.1;
        utter.pitch = 1;

        // Try to find Vietnamese voice
        const viVoice = this._voices.find(v => v.lang.startsWith('vi'));
        if (viVoice) utter.voice = viVoice;

        this._synth.speak(utter);
    },

    announceScore(score) {
        const msgs = {
            5: 'Xuất sắc! 5 điểm! Phản xạ rất nhanh!',
            4: 'Tốt lắm! 4 điểm!',
            3: 'Khá! 3 điểm. Cần nhanh hơn!',
            2: 'Chậm rồi! Chỉ 2 điểm.',
            1: 'Rất chậm! 1 điểm. Cần cải thiện!',
            0: 'Trượt! 0 điểm. Hãy thử lại!'
        };
        this.speak(msgs[score] || msgs[0]);
    },

    announceScenarioStart(title) {
        this.speak(title);
    },

    toggleVoice() {
        this.data.voiceEnabled = !this.data.voiceEnabled;
        this.save();
        return this.data.voiceEnabled;
    },

    // ============ FEATURE 6: EXAM PREDICTION ============

    predictExamResult() {
        const scores = typeof state !== 'undefined' ? state.scores : {};
        const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];

        const done = Object.keys(scores).length;
        if (done < 5) {
            return {
                passRate: 0,
                confidence: 'low',
                message: `Cần làm ít nhất 5 tình huống để dự đoán. Hiện tại: ${done}/5`,
                recommendation: 'Hãy bắt đầu ôn tập ngay!'
            };
        }

        const values = Object.values(scores);
        const avgScore = values.reduce((a, b) => a + b, 0) / values.length;
        const coverage = done / scenarios.length;

        // Consistency: how often score >= 3 (passing threshold equivalent)
        const passing = values.filter(s => s >= 3).length;
        const consistency = passing / values.length;

        // Weighted calculation
        const scoreWeight = 0.45;
        const coverageWeight = 0.25;
        const consistencyWeight = 0.30;

        let rawRate = (
            (avgScore / 5) * scoreWeight +
            Math.min(coverage, 1) * coverageWeight +
            consistency * consistencyWeight
        ) * 100;

        // Boost if high coverage
        if (coverage >= 0.8) rawRate *= 1.05;

        // Penalty if very low consistency
        if (consistency < 0.5) rawRate *= 0.85;

        const passRate = Math.round(Math.min(99, Math.max(5, rawRate)));

        let confidence = 'medium';
        if (done >= 80) confidence = 'high';
        else if (done < 20) confidence = 'low';

        let recommendation = '';
        if (passRate >= 85) recommendation = 'Bạn đã sẵn sàng thi! Hãy tự tin!';
        else if (passRate >= 70) recommendation = 'Gần đạt! Ôn lại các tình huống yếu.';
        else if (passRate >= 50) recommendation = 'Cần ôn thêm nhiều. Tập trung vào chương yếu nhất.';
        else recommendation = 'Cần luyện tập thêm nhiều. Bắt đầu từ chương 1.';

        return {
            passRate,
            confidence,
            avgScore: Math.round(avgScore * 10) / 10,
            coverage: Math.round(coverage * 100),
            consistency: Math.round(consistency * 100),
            message: `Khả năng đậu: ${passRate}%`,
            recommendation
        };
    },

    // ============ FEATURE 7: GAMIFICATION ============

    ACHIEVEMENTS: [
        { id: 'first_one', icon: '🌟', name: 'Khởi đầu', desc: 'Hoàn thành 1 tình huống', check: (ai) => ai.data.reactions.length >= 1 },
        {
            id: 'fast_five', icon: '⚡', name: 'Phản xạ nhanh', desc: '5 lần đạt 5đ liên tiếp', check: (ai) => {
                const r = ai.data.reactions;
                for (let i = r.length - 1; i >= 4; i--) {
                    if (r.slice(i - 4, i + 1).every(x => x.score === 5)) return true;
                }
                return false;
            }
        },
        { id: 'streak_3', icon: '🔥', name: 'Bền bỉ 3 ngày', desc: 'Streak 3 ngày liên tục', check: (ai) => ai.data.streak.longest >= 3 },
        { id: 'streak_7', icon: '🔥', name: 'Bền bỉ 7 ngày', desc: 'Streak 7 ngày liên tục', check: (ai) => ai.data.streak.longest >= 7 },
        {
            id: 'halfway', icon: '🏅', name: 'Nửa chặng đường', desc: 'Hoàn thành 60 TH', check: (ai) => {
                const scores = typeof state !== 'undefined' ? state.scores : {};
                return Object.keys(scores).length >= 60;
            }
        },
        {
            id: 'complete', icon: '🏆', name: 'Chinh phục', desc: 'Hoàn thành 120 TH', check: (ai) => {
                const scores = typeof state !== 'undefined' ? state.scores : {};
                return Object.keys(scores).length >= 120;
            }
        },
        {
            id: 'sharpshooter', icon: '🎯', name: 'Thiện xạ', desc: 'Điểm TB ≥ 4.5', check: (ai) => {
                const scores = typeof state !== 'undefined' ? state.scores : {};
                const vals = Object.values(scores);
                if (vals.length < 10) return false;
                return (vals.reduce((a, b) => a + b, 0) / vals.length) >= 4.5;
            }
        },
        {
            id: 'improving', icon: '📈', name: 'Tiến bộ', desc: 'Cải thiện liên tục', check: (ai) => {
                const profile = ai.getReflexProfile();
                return profile && profile.trend === 'improving';
            }
        },
        {
            id: 'urban_safe', icon: '🛡️', name: 'An toàn đô thị', desc: 'Ch.1 điểm TB ≥ 4', check: (ai) => {
                const profile = ai.getReflexProfile();
                return profile?.chapterStats[1]?.avgScore >= 4 && profile?.chapterStats[1]?.count >= 10;
            }
        },
        {
            id: 'rural_safe', icon: '🌾', name: 'An toàn nông thôn', desc: 'Ch.2 điểm TB ≥ 4', check: (ai) => {
                const profile = ai.getReflexProfile();
                return profile?.chapterStats[2]?.avgScore >= 4 && profile?.chapterStats[2]?.count >= 5;
            }
        },
        {
            id: 'highway_pro', icon: '🏎️', name: 'Cao tốc thành thạo', desc: 'Ch.3 điểm TB ≥ 4', check: (ai) => {
                const profile = ai.getReflexProfile();
                return profile?.chapterStats[3]?.avgScore >= 4 && profile?.chapterStats[3]?.count >= 5;
            }
        },
        {
            id: 'exam_ready', icon: '👑', name: 'Sẵn sàng thi', desc: 'Dự đoán đậu ≥ 85%', check: (ai) => {
                return ai.predictExamResult().passRate >= 85;
            }
        }
    ],

    checkAndAwardAchievements() {
        let newlyAwarded = [];
        for (const ach of this.ACHIEVEMENTS) {
            if (!this.data.achievements[ach.id]) {
                try {
                    if (ach.check(this)) {
                        this.data.achievements[ach.id] = Date.now();
                        newlyAwarded.push(ach);
                    }
                } catch (e) { /* ignore check errors */ }
            }
        }
        if (newlyAwarded.length > 0) {
            this.save();
            // Show toast for first new achievement
            if (typeof showToast === 'function') {
                showToast(`🏆 Thành tích mới: ${newlyAwarded[0].icon} ${newlyAwarded[0].name}!`);
            }
            if (newlyAwarded.length > 0) {
                this.speak(`Chúc mừng! Bạn đạt thành tích ${newlyAwarded[0].name}`);
            }
        }
        return newlyAwarded;
    },

    getAchievements() {
        return this.ACHIEVEMENTS.map(ach => ({
            ...ach,
            unlocked: !!this.data.achievements[ach.id],
            unlockedAt: this.data.achievements[ach.id] || null
        }));
    },

    updateStreak() {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (this.data.streak.lastDate === today) return; // Already counted today

        if (this.data.streak.lastDate === yesterday) {
            this.data.streak.current++;
        } else if (this.data.streak.lastDate !== today) {
            // Check if there's a reaction today
            const todayReactions = this.data.reactions.filter(r =>
                new Date(r.timestamp).toDateString() === today
            );
            if (todayReactions.length > 0) {
                if (this.data.streak.lastDate === yesterday) {
                    this.data.streak.current++;
                } else {
                    this.data.streak.current = 1;
                }
            }
        }

        this.data.streak.lastDate = today;
        if (this.data.streak.current > this.data.streak.longest) {
            this.data.streak.longest = this.data.streak.current;
        }
        this.save();
    },

    getDailyChallenge() {
        const today = new Date().toDateString();

        // Generate new challenge if it's a new day
        if (this.data.dailyChallengeDate !== today) {
            const weak = this.getWeakScenarios(20);
            const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];

            // Pick 3: mix of weak and random
            const ids = [];
            const shuffledWeak = [...weak].sort(() => Math.random() - 0.5);
            for (const s of shuffledWeak) {
                if (ids.length >= 2) break;
                ids.push(s.id);
            }

            // Add 1 random
            const remaining = scenarios.filter(s => !ids.includes(s.id));
            if (remaining.length > 0) {
                ids.push(remaining[Math.floor(Math.random() * remaining.length)].id);
            }

            this.data.dailyChallengeDate = today;
            this.data.dailyChallengeIds = ids;
            this.save();
        }

        const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];
        const scores = typeof state !== 'undefined' ? state.scores : {};

        return this.data.dailyChallengeIds.map(id => {
            const s = scenarios.find(sc => sc.id === id);
            return s ? { ...s, challengeScore: scores[id] } : null;
        }).filter(Boolean);
    },

    getDailyChallengeCompleted() {
        const challenge = this.getDailyChallenge();
        const scores = typeof state !== 'undefined' ? state.scores : {};
        return challenge.filter(s => scores[s.id] !== undefined).length;
    },

    // ============ FEATURE D: STUDY PLAN ============

    createStudyPlan(days) {
        const scores = typeof state !== 'undefined' ? state.scores : {};
        const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];
        const sorted = [...scenarios].sort((a, b) => {
            const sa = scores[a.id], sb = scores[b.id];
            if (sa === undefined && sb !== undefined) return -1;
            if (sb === undefined && sa !== undefined) return 1;
            return (sa || 0) - (sb || 0);
        });
        const perDay = Math.ceil(sorted.length / days);
        const schedule = [];
        for (let d = 0; d < days; d++) {
            const batch = sorted.slice(d * perDay, (d + 1) * perDay);
            schedule.push({ day: d + 1, scenarioIds: batch.map(s => s.id), completed: false });
        }
        this.data.studyPlan = { days, startDate: new Date().toISOString().split('T')[0], schedule };
        this.save();
        return this.data.studyPlan;
    },

    getStudyPlan() { return this.data.studyPlan; },

    getStudyPlanToday() {
        if (!this.data.studyPlan) return null;
        const start = new Date(this.data.studyPlan.startDate);
        const dayIndex = Math.floor((new Date() - start) / 86400000);
        if (dayIndex < 0 || dayIndex >= this.data.studyPlan.schedule.length) return null;
        return { ...this.data.studyPlan.schedule[dayIndex], dayIndex, totalDays: this.data.studyPlan.days };
    },

    markStudyDayComplete(dayIndex) {
        if (this.data.studyPlan?.schedule[dayIndex]) {
            this.data.studyPlan.schedule[dayIndex].completed = true;
            this.save();
        }
    },

    deleteStudyPlan() { this.data.studyPlan = null; this.save(); },

    // ============ FEATURE E: WEAKNESS PROFILE ============

    DANGER_CATEGORIES: [
        { id: 'pedestrian', name: 'Ng\u01b0\u1eddi \u0111i b\u1ed9', icon: '\ud83d\udeb6', keywords: ['ng\u01b0\u1eddi \u0111i b\u1ed9', '\u0111i b\u1ed9', 'sang \u0111\u01b0\u1eddng', 'qua \u0111\u01b0\u1eddng', 'tr\u1ebb em'] },
        { id: 'motorcycle', name: 'Xe m\u00e1y', icon: '\ud83c\udfcd\ufe0f', keywords: ['xe m\u00e1y', 'm\u00f4 t\u00f4', 'xe g\u1eafn m\u00e1y', 'l\u00e1ch'] },
        { id: 'truck', name: 'Xe t\u1ea3i/bu\u00fdt', icon: '\ud83d\ude9b', keywords: ['xe t\u1ea3i', 'xe bu\u00fdt', 'xe kh\u00e1ch', 'container'] },
        { id: 'intersection', name: 'Ng\u00e3 t\u01b0', icon: '\ud83d\udd00', keywords: ['ng\u00e3 t\u01b0', 'ng\u00e3 ba', 'giao l\u1ed9', 'v\u00f2ng xuy\u1ebfn'] },
        { id: 'overtake', name: 'V\u01b0\u1ee3t xe', icon: '\ud83d\udd04', keywords: ['v\u01b0\u1ee3t', 'l\u1ea5n l\u00e0n', 'chuy\u1ec3n l\u00e0n'] },
        { id: 'door', name: 'M\u1edf c\u1eeda xe', icon: '\ud83d\udeaa', keywords: ['m\u1edf c\u1eeda', 'c\u1eeda xe'] },
        { id: 'parked', name: 'Xe \u0111\u1ed7', icon: '\ud83c\udd7f\ufe0f', keywords: ['\u0111\u1ed7', 'd\u1eebng', '\u0111\u00f3n kh\u00e1ch'] },
        { id: 'animal', name: '\u0110\u1ed9ng v\u1eadt', icon: '\ud83d\udc04', keywords: ['gia s\u00fac', 'b\u00f2', 'tr\u00e2u', '\u0111\u1ed9ng v\u1eadt'] },
        { id: 'night', name: 'L\u00e1i \u0111\u00eam', icon: '\ud83c\udf19', keywords: ['\u0111\u00eam', 't\u1ed1i', 'ban \u0111\u00eam'] },
        { id: 'weather', name: 'Th\u1eddi ti\u1ebft x\u1ea5u', icon: '\ud83c\udf27\ufe0f', keywords: ['m\u01b0a', 's\u01b0\u01a1ng', 'tr\u01a1n', 'ng\u1eadp'] },
        { id: 'highway', name: 'Cao t\u1ed1c', icon: '\ud83d\udee3\ufe0f', keywords: ['cao t\u1ed1c'] },
        { id: 'curve', name: 'Kh\u00fac cua', icon: '\ud83d\udd03', keywords: ['cua', 'kh\u00fac cua', '\u0111\u00e8o', 'd\u1ed1c'] }
    ],

    categorizeScenario(scenario) {
        const title = (scenario.title || '').toLowerCase();
        const matched = [];
        for (const cat of this.DANGER_CATEGORIES) {
            if (cat.keywords.some(kw => title.includes(kw))) matched.push(cat.id);
        }
        return matched.length > 0 ? matched : ['other'];
    },

    getWeaknessProfile() {
        const scores = typeof state !== 'undefined' ? state.scores : {};
        const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];
        const catStats = {};
        scenarios.forEach(s => {
            const score = scores[s.id];
            if (score === undefined) return;
            const cats = this.categorizeScenario(s);
            cats.forEach(catId => {
                if (!catStats[catId]) catStats[catId] = { scores: [], ids: [] };
                catStats[catId].scores.push(score);
                catStats[catId].ids.push(s.id);
            });
        });
        return Object.entries(catStats)
            .map(([catId, data]) => {
                const cat = this.DANGER_CATEGORIES.find(c => c.id === catId) || { name: 'Kh\u00e1c', icon: '\u2753' };
                const avg = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
                return { ...cat, avgScore: Math.round(avg * 10) / 10, count: data.scores.length, lowCount: data.scores.filter(s => s <= 2).length, scenarioIds: data.ids };
            })
            .sort((a, b) => a.avgScore - b.avgScore);
    },

    // ============ FEATURE G: QUIZ ============

    getQuizForScenario(scenarioId) {
        const scenario = typeof SCENARIOS !== 'undefined' ? SCENARIOS.find(s => s.id === scenarioId) : null;
        if (!scenario) return null;
        const cats = this.categorizeScenario(scenario);
        const catNames = cats.map(c => { const cat = this.DANGER_CATEGORIES.find(x => x.id === c); return cat ? cat.name : 'tình huống nguy hiểm'; });
        const answers = [catNames[0] + ' gây nguy hiểm', 'Tầm nhìn bị hạn chế', 'Đường trơn hoặc xấu', 'Phương tiện đi ngược chiều'];
        // Shuffle
        const shuffled = [...answers];
        const swapIdx = Math.floor(Math.random() * 4);
        [shuffled[0], shuffled[swapIdx]] = [shuffled[swapIdx], shuffled[0]];
        return { q: `"${scenario.title}" — Nguy hiểm chính là gì?`, a: shuffled, c: shuffled.indexOf(answers[0]), scenarioId };
    },

    answerQuiz(scenarioId, answerIdx) {
        const quiz = this.getQuizForScenario(scenarioId);
        if (!quiz) return false;
        const correct = answerIdx === quiz.c;
        this.data.quizResults[scenarioId] = { correct, answer: answerIdx, timestamp: Date.now() };
        this.save();
        return correct;
    },

    getQuizStats() {
        const results = Object.values(this.data.quizResults);
        if (results.length === 0) return { total: 0, correct: 0, pct: 0 };
        const correct = results.filter(r => r.correct).length;
        return { total: results.length, correct, pct: Math.round((correct / results.length) * 100) };
    },

    // ============ FEATURE H: REPLAY COACH ============

    getReplaySegment(scenario, brakeTime) {
        if (!scenario || !brakeTime) return null;
        return { startTime: Math.max(0, (scenario.startPoint || 10) - 1), endTime: brakeTime + 1, speed: 0.5 };
    },

    // ============ FEATURE K: DAILY SUMMARY ============

    getDailySummary() {
        const today = new Date().toDateString();
        const todayReactions = this.data.reactions.filter(r => new Date(r.timestamp).toDateString() === today);
        if (todayReactions.length === 0) return { count: 0, message: 'Bạn chưa ôn tập hôm nay. Hãy bắt đầu ngay!' };
        const scores = todayReactions.map(r => r.score);
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        const uniqueIds = [...new Set(todayReactions.map(r => r.scenarioId))];
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const yReactions = this.data.reactions.filter(r => new Date(r.timestamp).toDateString() === yesterday);
        const yAvg = yReactions.length > 0 ? yReactions.reduce((s, r) => s + r.score, 0) / yReactions.length : null;
        const comparison = yAvg !== null ? (avg > yAvg ? 'better' : avg < yAvg ? 'worse' : 'same') : null;
        let message = `Hôm nay: ${uniqueIds.length} TH, TB ${avg.toFixed(1)}đ. `;
        if (comparison === 'better') message += '📈 Tốt hơn hôm qua!';
        else if (comparison === 'worse') message += '📉 Cần cố gắng hơn!';
        return { count: uniqueIds.length, totalAttempts: todayReactions.length, avgScore: Math.round(avg * 10) / 10, best: Math.max(...scores), worst: Math.min(...scores), high: scores.filter(s => s >= 4).length, low: scores.filter(s => s <= 1).length, comparison, message };
    },

    // ============ FEATURE L: DRIVING TIPS ============

    TIPS: [
        '🚗 Luôn giữ khoảng cách an toàn với xe phía trước: ít nhất 2 giây.',
        '👀 Quan sát gương chiếu hậu mỗi 5-8 giây khi lái xe.',
        '🚦 Khi đèn vàng bật, hãy giảm tốc dừng lại nếu an toàn.',
        '🌧️ Giảm tốc ít nhất 30% khi trời mưa hoặc đường ướt.',
        '🔄 Luôn bật xi-nhan trước khi chuyển làn ít nhất 3 giây.',
        '🚶 Gần trường học, giảm tốc xuống 30km/h và sẵn sàng phanh.',
        '🌙 Ban đêm, dùng đèn pha chiếu gần khi có xe đi ngược chiều.',
        '⛽ Không nên để xăng dưới 1/4 bình để tránh hư bơm xăng.',
        '🏔️ Xuống dốc dài, dùng số thấp thay vì đạp phanh liên tục.',
        '🅿️ Khi đỗ xe, luôn kiểm tra gương trước khi mở cửa.',
        '📱 Không sử dụng điện thoại khi đang lái xe.',
        '🔊 Hạn chế nghe nhạc quá to để nghe được còi cảnh báo.',
        '👶 Trẻ em dưới 10 tuổi phải ngồi ghế sau và thắt dây an toàn.',
        '🍺 Tuyệt đối không lái xe sau khi uống rượu bia.',
        '💤 Nghỉ ngơi mỗi 2 giờ khi lái đường dài.',
        '🔧 Kiểm tra lốp xe, phanh, đèn trước mỗi chuyến đi xa.',
        '🚙 Giữ cả hai tay trên vô-lăng ở vị trí 9h-3h.',
        '⚠️ Khi thấy xe khẩn cấp, tấp vào lề và nhường đường.',
        '🏍️ Cẩn thận điểm mù khi có xe máy chạy song song.',
        '🚧 Giảm tốc khi đi qua vùng đang thi công.',
        '💡 Bật đèn xe dù ban ngày khi trời sương mù.',
        '🛣️ Trên cao tốc, không dừng xe trên làn đường chính.',
        '🔀 Tại vòng xuyến, xe trong vòng có quyền ưu tiên.',
        '🚐 Giữ khoảng cách xa hơn khi đi sau xe tải lớn.',
        '🎯 Nhìn xa phía trước 12-15 giây để dự đoán nguy hiểm.',
        '🚸 Tại vạch sang đường, PHẢI nhường đường cho người đi bộ.',
        '⬇️ Số thấp giúp kiểm soát tốc độ tốt hơn khi xuống dốc.',
        '🏠 Cẩn thận xe ra từ hẻm, đường nhỏ, bãi đỗ xe.',
        '🐕 Gặp động vật trên đường, giảm tốc, đừng đánh lái gấp.',
        '🌊 Qua vùng ngập nước, đi chậm, không tạt ga mạnh.',
        '🔦 Kiểm tra đèn xi-nhan, đèn phanh định kỳ.',
        '👁️ Luôn quan sát 2 bên trước khi qua giao lộ dù có đèn xanh.',
        '🚛 Không bám sát xe container — tầm nhìn bị che khuất.',
        '🏎️ Tốc độ tối đa trên cao tốc thường là 120km/h.',
        '🔃 Vào cua, giảm tốc TRƯỚC khi vào, không phanh giữa cua.',
        '🅱️ Hệ thống phanh ABS: nhấn giữ chân phanh, không bơm.',
        '🚨 Tam giác cảnh báo đặt cách xe 50m (đường thường), 100m (cao tốc).',
        '💨 Gió mạnh ngang, giữ chặt vô-lăng và giảm tốc.',
        '🏁 Khi vượt xe, bấm còi hoặc nháy đèn để báo hiệu.',
        '🔐 Luôn khóa xe khi rời đi, dù chỉ vài phút.',
        '🪞 Chỉnh gương chiếu hậu sao cho thấy ít thân xe nhất.',
        '🚗 Phanh gấp → nhìn gương → tránh bị xe sau đâm.',
        '⛰️ Lên dốc: tăng ga dần, vào số thấp từ sớm.',
        '🌡️ Trời nóng: kiểm tra áp suất lốp, tránh nổ lốp.',
        '🚘 Giữ ổn định ga khi đi trên đường trơn.',
        '🗺️ Nắm rõ lộ trình trước khi đi, tránh phân tâm xem bản đồ.',
        '🪪 Luôn mang theo giấy phép lái xe và đăng ký xe.',
        '⏰ Không lái xe khi buồn ngủ — nguy hiểm hơn cả say rượu.',
        '🛡️ Thắt dây an toàn giảm 45% nguy cơ tử vong.',
        '📐 Chỉnh ghế đúng: khuỷu tay hơi cong khi nắm vô-lăng.'
    ],

    getDailyTip() {
        const today = new Date().toDateString();
        if (this.data.lastTipDate !== today) {
            this.data.lastTipIndex = (this.data.lastTipIndex + 1) % this.TIPS.length;
            this.data.lastTipDate = today;
            this.save();
        }
        return this.TIPS[this.data.lastTipIndex];
    }
};

// ============================================
//  CRM SYNC MODULE
//  Auth + Outbox Sync Engine
// ============================================

const CRM_BASE_URL = 'https://crm.thayduydaotaolaixe.com';
const CRM_LINK_KEY = 'mophong_crm_link';
const CRM_OUTBOX_KEY = 'mophong_sync_outbox';
const CRM_FLUSH_INTERVAL = 60000; // 1 min

const CRM = {
    // ── JWT helpers ──
    _decodeJwt(token) {
        try {
            const parts = token.split('.');
            if (parts.length < 2) return null;
            const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
            const payload = JSON.parse(atob(padded));
            if (payload.exp && payload.exp * 1000 < Date.now()) return null;
            return payload;
        } catch { return null; }
    },

    // ── Auth ──
    getLink() {
        try {
            const raw = localStorage.getItem(CRM_LINK_KEY);
            if (!raw) return null;
            const link = JSON.parse(raw);
            if (!this._decodeJwt(link.token)) {
                localStorage.removeItem(CRM_LINK_KEY);
                return null;
            }
            return link;
        } catch { return null; }
    },

    isLinked() { return this.getLink() !== null; },

    getStudentId() {
        const link = this.getLink();
        if (!link) return null;
        return this._decodeJwt(link.token)?.studentId || null;
    },

    getToken() {
        const link = this.getLink();
        return link?.token || null;
    },

    async login(phone, password) {
        try {
            const res = await fetch(`${CRM_BASE_URL}/api/student/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: phone, password })
            });
            const data = await res.json().catch(() => null);

            if (!res.ok || !data?.accessToken) {
                return { ok: false, error: data?.error?.message || 'Đăng nhập thất bại' };
            }

            const payload = this._decodeJwt(data.accessToken);
            const link = {
                token: data.accessToken,
                studentName: data.student?.fullName || 'Học viên',
                phone: data.student?.phone || phone,
                studentId: payload?.studentId || '',
                linkedAt: new Date().toISOString()
            };
            localStorage.setItem(CRM_LINK_KEY, JSON.stringify(link));
            return { ok: true, studentName: link.studentName };
        } catch {
            return { ok: false, error: 'Không thể kết nối đến CRM' };
        }
    },

    unlink() {
        localStorage.removeItem(CRM_LINK_KEY);
        localStorage.removeItem(CRM_OUTBOX_KEY);
    },

    // ── Sync Engine (Outbox pattern) ──
    _getOutbox() {
        try {
            const raw = localStorage.getItem(CRM_OUTBOX_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch { return []; }
    },

    _saveOutbox(items) {
        localStorage.setItem(CRM_OUTBOX_KEY, JSON.stringify(items));
    },

    _genId() {
        return Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
    },

    pushToOutbox(type, payload) {
        const studentId = this.getStudentId();
        if (!studentId) return; // Not linked

        const item = {
            id: this._genId(),
            type,
            payload: { ...payload, studentId },
            createdAt: new Date().toISOString(),
            retries: 0
        };

        const outbox = this._getOutbox();
        outbox.push(item);
        this._saveOutbox(outbox);

        if (navigator.onLine) this.flushOutbox();
    },

    _flushing: false,
    async flushOutbox() {
        if (this._flushing) return;
        this._flushing = true;

        try {
            const outbox = this._getOutbox();
            if (!outbox.length) return;

            const token = this.getToken();
            if (!token) return;

            const ENDPOINT_MAP = {
                daily: '/api/student-progress/daily',
                attempt: '/api/student-progress/attempt',
                events: '/api/student-progress/events',
                'ai-summary': '/api/student-progress/ai-summary'
            };

            const remaining = [];
            for (const item of outbox) {
                try {
                    const endpoint = ENDPOINT_MAP[item.type];
                    if (!endpoint) continue;

                    const res = await fetch(`${CRM_BASE_URL}${endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(item.payload)
                    });

                    if (res.ok) continue;
                    if (item.retries < 5) {
                        remaining.push({ ...item, retries: item.retries + 1 });
                    }
                } catch {
                    if (item.retries < 5) {
                        remaining.push({ ...item, retries: item.retries + 1 });
                    }
                }
            }
            this._saveOutbox(remaining);
        } finally {
            this._flushing = false;
        }
    },

    getOutboxCount() {
        return this._getOutbox().length;
    },

    // ── Sync helpers ──
    syncAttempt(scenarioId, score, reactionTime, chapter) {
        const now = new Date();
        const startedAt = new Date(now.getTime() - (reactionTime || 30) * 1000);
        this.pushToOutbox('attempt', {
            attemptId: `sim_${this._genId()}`,
            mode: 'simulation',
            scenarioId,
            score: score || 0,
            total: 5,
            accuracy: score ? Math.round((score / 5) * 100) : 0,
            startedAt: startedAt.toISOString(),
            finishedAt: now.toISOString()
        });
    },

    syncDailySnapshot() {
        const scores = typeof state !== 'undefined' ? state.scores : {};
        const totalDone = Object.keys(scores).length;
        const totalHigh = Object.values(scores).filter(s => s >= 4).length;
        const avg = totalDone > 0 ? (Object.values(scores).reduce((a, b) => a + b, 0) / totalDone).toFixed(1) : 0;

        this.pushToOutbox('daily', {
            dateKey: new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }),
            scenariosDone: totalDone,
            highScoreCount: totalHigh,
            averageScore: parseFloat(avg),
            streakCurrent: AI.data.streak.current,
            streakLongest: AI.data.streak.longest,
            lastActiveAt: new Date().toISOString()
        });
    },

    syncEvent(type, payload = {}) {
        this.pushToOutbox('events', {
            eventId: `evt_${this._genId()}`,
            type,
            occurredAt: new Date().toISOString(),
            payload
        });
    },

    // ── Init ──
    _initialized: false,
    initSync() {
        if (typeof window === 'undefined' || this._initialized) return;
        this._initialized = true;

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && navigator.onLine) {
                this.flushOutbox();
            }
        });

        window.addEventListener('online', () => this.flushOutbox());

        setInterval(() => {
            if (navigator.onLine) this.flushOutbox();
        }, CRM_FLUSH_INTERVAL);

        if (navigator.onLine) {
            setTimeout(() => this.flushOutbox(), 3000);
        }

        console.log('[CRM] Sync engine initialized', this.isLinked() ? '(linked)' : '(not linked)');
    }
};

