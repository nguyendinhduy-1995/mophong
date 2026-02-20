/* ============================================
   MÔ PHỎNG GPLX - Main Application v2
   With Real Video Playback
   ============================================ */

// ============ DATA: 120 Scenarios in 6 Chapters ============

const VIDEO_BASE_URL = 'https://120mophong.com/video';

// Real timing data scraped from 120mophong.com
// start = db_start_point (seconds), total = db_total_point (seconds)
const SCENARIO_TIMING = {
  1: { start: 10.10, total: 2.78 }, 2: { start: 17.94, total: 1.63 }, 3: { start: 15.0, total: 1.98 },
  4: { start: 10.90, total: 4.21 }, 5: { start: 13.05, total: 2.04 }, 6: { start: 13.33, total: 2.74 },
  7: { start: 10.55, total: 3.78 }, 8: { start: 10.85, total: 2.67 }, 9: { start: 8.90, total: 2.40 },
  10: { start: 11.0, total: 3.84 }, 11: { start: 10.90, total: 6.88 }, 12: { start: 14.40, total: 3.60 },
  13: { start: 11.90, total: 2.07 }, 14: { start: 14.82, total: 3.19 }, 15: { start: 13.92, total: 2.09 },
  16: { start: 12.00, total: 2.50 }, 17: { start: 9.14, total: 2.62 }, 18: { start: 11.96, total: 3.18 },
  19: { start: 12.93, total: 2.55 }, 20: { start: 18.95, total: 1.88 }, 21: { start: 13.95, total: 2.95 },
  22: { start: 13.80, total: 2.5 }, 23: { start: 15.95, total: 2.17 }, 24: { start: 13.90, total: 2.2 },
  25: { start: 12.95, total: 7.65 }, 26: { start: 13.10, total: 3.88 }, 27: { start: 14.80, total: 1.83 },
  28: { start: 12.90, total: 3.12 }, 29: { start: 12.80, total: 3.21 }, 30: { start: 11.20, total: 3.81 },
  31: { start: 11.10, total: 3.03 }, 32: { start: 12.05, total: 2.72 }, 33: { start: 12.95, total: 3 },
  34: { start: 9.25, total: 2.21 }, 35: { start: 6.90, total: 3 }, 36: { start: 17.10, total: 2.76 },
  37: { start: 18.10, total: 2.82 }, 38: { start: 11.90, total: 2.52 }, 39: { start: 15.95, total: 1.55 },
  40: { start: 10.0, total: 2.54 }, 41: { start: 13.10, total: 1.22 }, 42: { start: 10.90, total: 2.48 },
  43: { start: 10.0, total: 3.39 }, 44: { start: 9.10, total: 1.85 }, 45: { start: 14.10, total: 1.98 },
  46: { start: 20.95, total: 3.92 }, 47: { start: 19.08, total: 11.7 }, 48: { start: 8.95, total: 2.12 },
  49: { start: 10.95, total: 4.79 }, 50: { start: 12.99, total: 3.50 }, 51: { start: 13.0, total: 4.18 },
  52: { start: 17.80, total: 3.46 }, 53: { start: 16.90, total: 2.87 }, 54: { start: 12.90, total: 4.10 },
  55: { start: 12.00, total: 2.02 }, 56: { start: 10.95, total: 2.67 }, 57: { start: 25.0, total: 4.91 },
  58: { start: 17.97, total: 3.74 }, 59: { start: 20.99, total: 2.59 }, 60: { start: 10.90, total: 2.43 },
  61: { start: 21.10, total: 3.18 }, 62: { start: 19.90, total: 3.98 }, 63: { start: 8.0, total: 3.08 },
  64: { start: 13.90, total: 3.8 }, 65: { start: 20.90, total: 3.97 }, 66: { start: 13.90, total: 5.90 },
  67: { start: 16.85, total: 3.34 }, 68: { start: 14.90, total: 5.22 }, 69: { start: 19.80, total: 5.42 },
  70: { start: 31.95, total: 2.48 }, 71: { start: 15.90, total: 3.96 }, 72: { start: 19.05, total: 2.35 },
  73: { start: 19.0, total: 1.2 }, 74: { start: 14.90, total: 3.35 }, 75: { start: 9.10, total: 2.81 },
  76: { start: 9.90, total: 2.21 }, 77: { start: 10.11, total: 3.31 }, 78: { start: 15.0, total: 2.26 },
  79: { start: 12.90, total: 2.28 }, 80: { start: 9.95, total: 1.40 }, 81: { start: 19.05, total: 2.25 },
  82: { start: 10.80, total: 3.04 }, 83: { start: 10.95, total: 2.443 }, 84: { start: 12.90, total: 3.15 },
  85: { start: 19.95, total: 1.78 }, 86: { start: 7.95, total: 3.57 }, 87: { start: 7.05, total: 3.67 },
  88: { start: 14.90, total: 1.79 }, 89: { start: 12.96, total: 2.97 }, 90: { start: 10.90, total: 3.57 },
  91: { start: 9.92, total: 2.2 }, 92: { start: 9.15, total: 2 }, 93: { start: 16.95, total: 2.81 },
  94: { start: 21.10, total: 2.63 }, 95: { start: 9.85, total: 3.99 }, 96: { start: 20.97, total: 2.79 },
  97: { start: 22.95, total: 1.35 }, 98: { start: 18.10, total: 2.04 }, 99: { start: 19.90, total: 2.92 },
  100: { start: 12.05, total: 1.82 }, 101: { start: 15.95, total: 1.84 }, 102: { start: 15.90, total: 3.12 },
  103: { start: 19.95, total: 2.33 }, 104: { start: 22.98, total: 1.74 }, 105: { start: 19.90, total: 2.21 },
  106: { start: 20.10, total: 1.46 }, 107: { start: 15.97, total: 1.38 }, 108: { start: 23.95, total: 1.27 },
  109: { start: 12.90, total: 2.78 }, 110: { start: 12.90, total: 2.62 }, 111: { start: 11.90, total: 2.36 },
  112: { start: 8.10, total: 4.83 }, 113: { start: 17.90, total: 1.43 }, 114: { start: 12.95, total: 3.69 },
  115: { start: 13.15, total: 1.37 }, 116: { start: 11.0, total: 4.10 }, 117: { start: 11.90, total: 2.36 },
  118: { start: 11.04, total: 2.56 }, 119: { start: 13.10, total: 1.83 }, 120: { start: 13.90, total: 1.72 }
};

const CHAPTERS = [
  { id: 1, name: 'Đường đô thị', desc: 'Tình huống trong khu vực đô thị, khu dân cư đông đúc', icon: '🏙️', range: [1, 29] },
  { id: 2, name: 'Đường nông thôn', desc: 'Tình huống trên đường nông thôn, đường gấp khúc', icon: '🌾', range: [30, 43] },
  { id: 3, name: 'Đường cao tốc', desc: 'Tình huống trên đường cao tốc, tốc độ cao', icon: '🛣️', range: [44, 63] },
  { id: 4, name: 'Đường đồi núi', desc: 'Tình huống trên đường đèo núi, quanh co', icon: '⛰️', range: [64, 73] },
  { id: 5, name: 'Đường quốc lộ', desc: 'Tình huống trên đường quốc lộ, ngoại thành', icon: '🚗', range: [74, 90] },
  { id: 6, name: 'Tình huống hỗn hợp', desc: 'Tình huống giao thông hỗn hợp và tai nạn thực tế', icon: '⚠️', range: [91, 120] }
];

const SCENARIO_TITLES = {
  1: 'Vượt xe tải trong đô thị', 2: 'Người đi bộ sang đường', 3: 'Mở cửa xe bất ngờ',
  4: 'Xe buýt dừng đón khách', 5: 'Chuyển làn tại ngã tư', 6: 'Xe máy chạy ngược chiều',
  7: 'Trẻ em chạy qua đường', 8: 'Xe tải quay đầu', 9: 'Xe cứu thương ưu tiên',
  10: 'Đỗ xe song song', 11: 'Rẽ phải gặp xe đạp', 12: 'Ngã tư có đèn tín hiệu',
  13: 'Xe phía trước phanh gấp', 14: 'Người già qua đường', 15: 'Xe máy lách giữa 2 ô tô',
  16: 'Vào đường một chiều', 17: 'Qua cầu hẹp', 18: 'Đường ướt trơn trượt',
  19: 'Xe công trình chắn đường', 20: 'Lùi xe trong hẻm', 21: 'Xe ba gác chở hàng',
  22: 'Chó chạy qua đường', 23: 'Xe máy vượt phải', 24: 'Giao lộ không đèn',
  25: 'Xe buýt chuyển làn', 26: 'Người bán hàng rong', 27: 'Xe đạp điện sai làn',
  28: 'Đường đang thi công', 29: 'Xe container rẽ phải',
  30: 'Đường cong gấp khúc', 31: 'Gia súc trên đường', 32: 'Lái xe buổi tối nông thôn',
  33: 'Xe máy cày trên đường', 34: 'Đường ngập nước', 35: 'Người gánh hàng qua đường',
  36: 'Xe bò kéo chắn đường', 37: 'Đường đất sạt lở', 38: 'Gặp xe đi ngược chiều cua',
  39: 'Trẻ em đá bóng ven đường', 40: 'Xe máy chở cồng kềnh', 41: 'Đường mấp mô ổ gà',
  42: 'Cầu nhỏ một chiều', 43: 'Sương mù trên đường thôn',
  44: 'Nhập làn cao tốc', 45: 'Vượt xe trên cao tốc', 46: 'Phanh gấp trên cao tốc',
  47: 'Xe phía trước giảm tốc', 48: 'Lái xe khi trời mưa', 49: 'Xe tải chuyển làn đột ngột',
  50: 'Khoảng cách an toàn', 51: 'Ra khỏi cao tốc', 52: 'Xe bị hỏng trên cao tốc',
  53: 'Nhiều xe cùng nhập làn', 54: 'Vượt đoàn xe tải', 55: 'Đường cao tốc ướt mưa',
  56: 'Xe phía trước rơi hàng', 57: 'Tránh vật cản bất ngờ', 58: 'Lái xe đêm cao tốc',
  59: 'Sương mù trên cao tốc', 60: 'Lùi xe trên cao tốc', 61: 'Xe cứu hỏa trên cao tốc',
  62: 'Tai nạn phía trước', 63: 'Chuyển làn liên tục',
  64: 'Đường đèo quanh co', 65: 'Vượt xe trên đèo', 66: 'Sương mù dày đặc',
  67: 'Xe ngược chiều trên đèo', 68: 'Đá rơi trên đường', 69: 'Dốc xuống liên tục',
  70: 'Cua tay áo', 71: 'Vách đá bên đường', 72: 'Xe tải lên dốc chậm', 73: 'Đường trơn trượt đèo',
  74: 'Vượt xe trên quốc lộ', 75: 'Giao cắt đường sắt', 76: 'Xe máy cắt ngang',
  77: 'Người đi bộ vùng ngoại ô', 78: 'Xe khách dừng đón khách', 79: 'Đường quốc lộ hẹp',
  80: 'Xe ngược chiều lấn làn', 81: 'Qua cầu vượt', 82: 'Vào làng từ quốc lộ',
  83: 'Xe nông nghiệp trên QL', 84: 'Mưa to giảm tầm nhìn', 85: 'Đường ven biển gió lớn',
  86: 'Xe chở gỗ phía trước', 87: 'Ngã ba không đèn', 88: 'Đoàn xe tang',
  89: 'Xe ben ra khỏi công trường', 90: 'Xe máy vượt ẩu',
  91: 'Va chạm tại ngã tư', 92: 'Xe máy tông xe đạp', 93: 'Ô tô lùi không quan sát',
  94: 'Xe tải cố vượt đèn đỏ', 95: 'Xe máy phóng nhanh', 96: 'Va chạm liên hoàn',
  97: 'Người say rượu lái xe', 98: 'Mở cửa xe gây tai nạn', 99: 'Xe container mất lái',
  100: 'Xe cứu thương bị chặn', 101: 'Lái xe nghe điện thoại', 102: 'Vượt đèn vàng',
  103: 'Đua xe trái phép', 104: 'Xe tải quá tải', 105: 'Trôi xe trên dốc',
  106: 'Lạng lách đánh võng', 107: 'Không bật đèn ban đêm', 108: 'Chuyển hướng không xi-nhan',
  109: 'Xe khách dừng giữa đường', 110: 'Chạy quá tốc độ khu dân cư', 111: 'Xe máy chở 3 người',
  112: 'Ô tô đi vào đường cấm', 113: 'Xe buýt ép xe máy', 114: 'Tai nạn do mù sương',
  115: 'Va chạm do mệt mỏi', 116: 'Xe đầu kéo gãy khớp', 117: 'Ô tô trượt bánh mưa',
  118: 'Xe máy chở hàng cồng kềnh', 119: 'Tai nạn tại vòng xuyến', 120: 'Phanh gấp tránh xe ngã'
};

const SCENARIOS = [];
for (let i = 1; i <= 120; i++) {
  const chapter = CHAPTERS.find(ch => i >= ch.range[0] && i <= ch.range[1]);
  const timing = SCENARIO_TIMING[i] || { start: 12, total: 3 };
  SCENARIOS.push({
    id: i,
    chapter: chapter.id,
    title: SCENARIO_TITLES[i] || `Tình huống ${i}`,
    tipImage: `/public/images/tips/${i}.jpg`,
    videoUrl: `${VIDEO_BASE_URL}/${i}.mp4`,
    startPoint: timing.start,
    totalPoint: timing.total
  });
}

// ============ SCORING SYSTEM ============

function calculateScore(currentTime, scenario) {
  const { startPoint, totalPoint } = scenario;
  const endPoint = startPoint + totalPoint;

  if (currentTime < startPoint || currentTime > endPoint) return 0;

  const interval = totalPoint / 5;
  const elapsed = currentTime - startPoint;

  if (elapsed <= interval) return 5;
  if (elapsed <= interval * 2) return 4;
  if (elapsed <= interval * 3) return 3;
  if (elapsed <= interval * 4) return 2;
  return 1;
}

// ============ STATE MANAGEMENT ============

const STATE_KEY = 'mophong_state';

let state = {
  currentPage: 'home',
  previousPage: null,
  selectedChapter: null,
  selectedScenario: null,
  bookmarks: [],
  scores: {},
  examState: null,
  history: [],
  showTip: false,
  hasAnswered: false,     // Whether user has answered current scenario
  lastScore: null,        // Last scored value for display
  lastScoreTime: null,    // Time when user pressed brake
  isExamMode: false,      // Whether in exam mode (hide hints)
  countdownActive: false  // Countdown before video play
};

function loadState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state.bookmarks = parsed.bookmarks || [];
      state.scores = parsed.scores || {};
    }
  } catch (e) { console.error('loadState error', e); }
}

function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify({
      bookmarks: state.bookmarks,
      scores: state.scores
    }));
  } catch (e) { console.error('saveState error', e); }
}

// ============ NAVIGATION ============

function navigateTo(page, data) {
  if (state.currentPage !== page) {
    state.history.push(state.currentPage);
  }
  state.previousPage = state.currentPage;
  state.currentPage = page;
  state.showTip = false;

  if (data) {
    if (data.chapter !== undefined) state.selectedChapter = data.chapter;
    if (data.scenario !== undefined) state.selectedScenario = data.scenario;
  }

  // Stop any exam timer
  if (page !== 'exam-active' && examTimerInterval) {
    clearInterval(examTimerInterval);
  }

  updateNav();
  renderPage();
}

function goBack() {
  if (state.history.length > 0) {
    const prev = state.history.pop();
    state.currentPage = prev;
    updateNav();
    renderPage();
  } else {
    navigateTo('home');
  }
}

function updateNav() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === state.currentPage);
  });

  const backBtn = document.getElementById('btn-back');
  const showBack = ['chapter', 'scenario', 'exam-active', 'exam-results'].includes(state.currentPage);
  backBtn.classList.toggle('hidden', !showBack);

  const headerScore = document.getElementById('header-score');
  headerScore.classList.add('hidden');

  // Show/hide bottom nav during exam and scenario video
  const bottomNav = document.getElementById('bottom-nav');
  if (state.currentPage === 'exam-active') {
    bottomNav.style.display = 'none';
  } else {
    bottomNav.style.display = '';
  }
}

function renderPage() {
  const main = document.getElementById('main-content');
  main.scrollTop = 0;

  switch (state.currentPage) {
    case 'home': renderHome(main); break;
    case 'practice': renderPractice(main); break;
    case 'chapter': renderChapter(main); break;
    case 'scenario': renderScenario(main); break;
    case 'exam': renderExamStart(main); break;
    case 'exam-active': renderExamActive(main); break;
    case 'exam-results': renderExamResults(main); break;
    case 'bookmarks': renderBookmarks(main); break;
    case 'settings': renderSettings(main); break;
    case 'ai-insights': renderAIInsights(main); break;
    case 'study-plan': renderStudyPlan(main); break;
    default: renderHome(main); requestAnimationFrame(() => startTypewriter());
  }
}

// ============ PAGE: HOME ============

function renderHome(container) {
  const totalDone = Object.keys(state.scores).length;
  const totalHigh = Object.values(state.scores).filter(s => s >= 4).length;
  const totalLow = Object.values(state.scores).filter(s => s <= 1).length;
  const avgScore = totalDone > 0 ? (Object.values(state.scores).reduce((a, b) => a + b, 0) / totalDone).toFixed(1) : '—';

  // AI Data
  const prediction = AI.predictExamResult();
  const streak = AI.data.streak;
  const achievements = AI.getAchievements();
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const dailyChallenge = AI.getDailyChallenge();
  const dailyDone = AI.getDailyChallengeCompleted();
  const weakScenarios = AI.getWeakScenarios(3);
  const weakness = AI.getWeaknessProfile();
  const reflexProfile = AI.getReflexProfile();

  container.innerHTML = `
    <div class="page">
      <div class="hero-greeting">
        <div class="hero-time">${getGreeting()}</div>
        <div class="hero-typewriter" id="typewriter-text">${MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]}</div>
      </div>

      <div class="stats-bar">
        <div class="stat-card">
          <div class="stat-value">${totalDone}</div>
          <div class="stat-label">Đã làm</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="background:linear-gradient(135deg,#34d399,#059669);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${totalHigh}</div>
          <div class="stat-label">≥ 4đ</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="background:linear-gradient(135deg,#f87171,#dc2626);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${totalLow}</div>
          <div class="stat-label">≤ 1đ</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" style="background:linear-gradient(135deg,#60a5fa,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${avgScore}</div>
          <div class="stat-label">TB điểm</div>
        </div>
      </div>

      <!-- AI Dashboard -->
      <div class="ai-dashboard">
        <!-- Row 1: Streak + Prediction + Achievements -->
        <div class="ai-cards-row">
          <div class="ai-card ai-card-streak" onclick="navigateTo('ai-insights')">
            <div class="ai-card-icon">🔥</div>
            <div class="ai-card-value">${streak.current}</div>
            <div class="ai-card-label">ngày liên tục</div>
          </div>
          <div class="ai-card ai-card-predict" onclick="navigateTo('ai-insights')">
            <div class="ai-card-icon">📊</div>
            <div class="ai-card-value">${prediction.passRate}<small>%</small></div>
            <div class="ai-card-label">khả năng đậu</div>
          </div>
          <div class="ai-card ai-card-achieve" onclick="navigateTo('ai-insights')">
            <div class="ai-card-icon">🏆</div>
            <div class="ai-card-value">${unlockedCount}<small>/${achievements.length}</small></div>
            <div class="ai-card-label">thành tích</div>
          </div>
        </div>

        <!-- CTA Button -->
        <button class="cta-study-btn" onclick="navigateTo('practice')">
          🚀 Vào Học Ngay
        </button>

        <!-- Daily Challenge -->
        <div class="ai-section" onclick="navigateTo('ai-insights')">
          <div class="ai-section-header">
            <span>🎯 Thử thách hôm nay</span>
            <span class="ai-section-badge">${dailyDone}/${dailyChallenge.length}</span>
          </div>
          <div class="ai-challenge-list">
            ${dailyChallenge.map(s => {
    const done = state.scores[s.id] !== undefined;
    return `<div class="ai-challenge-item ${done ? 'done' : ''}" onclick="event.stopPropagation();navigateTo('scenario',{scenario:${s.id}})">
                <span class="ai-challenge-num">TH ${s.id}</span>
                <span class="ai-challenge-title">${s.title}</span>
                ${done ? '<span class="ai-challenge-check">✅</span>' : '<span class="ai-challenge-go">→</span>'}
              </div>`;
  }).join('')}
          </div>
        </div>

        ${weakScenarios.length > 0 ? `
        <!-- Weak Scenarios -->
        <div class="ai-section" onclick="navigateTo('ai-insights')">
          <div class="ai-section-header">
            <span>⚡ Cần ôn lại</span>
            <span class="ai-section-link">Xem chi tiết →</span>
          </div>
          <div class="ai-weak-list">
            ${weakScenarios.map(s => `
              <div class="ai-weak-item" onclick="event.stopPropagation();navigateTo('scenario',{scenario:${s.id}})">
                <span class="ai-weak-num">TH ${s.id}</span>
                <span class="ai-weak-score">${s.score !== undefined ? s.score + 'đ' : 'Chưa làm'}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>

      <!-- Analysis on Home -->
      ${weakness.length > 0 ? `
      <div class="ai-section" onclick="navigateTo('ai-insights')">
        <div class="ai-section-header">
          <span>🎯 Phân tích</span>
          <span class="ai-section-link">Chi tiết →</span>
        </div>
        <div class="ai-weakness-list">
          ${weakness.slice(0, 4).map(w => `
            <div class="ai-weakness-item">
              <span class="ai-weakness-icon">${w.icon}</span>
              <span class="ai-weakness-name">${w.name}</span>
              <div class="ai-weakness-bar-wrap">
                <div class="ai-weakness-bar" style="width:${(w.avgScore / 5) * 100}%;background:${w.avgScore >= 4 ? '#22c55e' : w.avgScore >= 3 ? '#eab308' : '#ef4444'}"></div>
              </div>
              <span class="ai-weakness-score">${w.avgScore}đ</span>
            </div>
          `).join('')}
        </div>
        ${reflexProfile ? `<div style="font-size:12px;color:var(--text-secondary);margin-top:8px">TB: ${reflexProfile.avgScore}đ • Phản xạ: ${reflexProfile.avgTime}s • ${reflexProfile.trend === 'improving' ? '📈 Tiến bộ' : reflexProfile.trend === 'declining' ? '📉 Giảm' : '➡️ Ổn định'}</div>` : ''}
      </div>
      ` : ''}

      <!-- Driving Tip -->
      <div class="ai-tip-card">
        <div class="ai-tip-icon">💡</div>
        <div class="ai-tip-text">${AI.getDailyTip()}</div>
      </div>

      <!-- Action Buttons -->
      <div class="ai-action-row">
        <button class="ai-action-btn" onclick="showDailySummary()">📊 Tóm tắt ngày</button>
        <button class="ai-action-btn" onclick="navigateTo('study-plan')">📅 Kế hoạch học</button>
      </div>

      <div class="chapter-grid">
        ${CHAPTERS.map(ch => {
    const scenarios = SCENARIOS.filter(s => s.chapter === ch.id);
    const done = scenarios.filter(s => state.scores[s.id] !== undefined).length;
    const progress = Math.round((done / scenarios.length) * 100);
    return `
            <div class="chapter-card" data-chapter="${ch.id}" onclick="navigateTo('chapter', {chapter: ${ch.id}})">
              <div class="chapter-header">
                <span class="chapter-number">${ch.icon} Chương ${ch.id}</span>
                <span class="chapter-count">${scenarios.length} tình huống</span>
              </div>
              <div class="chapter-name">${ch.name}</div>
              <div class="chapter-desc">${ch.desc}</div>
              <div class="chapter-progress">
                <div class="chapter-progress-bar" style="width:${progress}%"></div>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;
}

// ============ PAGE: PRACTICE ============

function renderPractice(container) {
  container.innerHTML = `
    <div class="page">
      <h1 class="page-title">Ôn Tập</h1>
      <p class="page-subtitle">Luyện tập theo từng chương</p>

      <div class="filter-tabs" id="practice-tabs">
        <button class="filter-tab active" data-filter="all" onclick="filterPractice('all')">Tất cả</button>
        ${CHAPTERS.map(ch => `
          <button class="filter-tab" data-filter="${ch.id}" onclick="filterPractice(${ch.id})">${ch.icon} Ch.${ch.id}</button>
        `).join('')}
        <button class="filter-tab" data-filter="wrong" onclick="filterPractice('wrong')">❌ Sai</button>
        <button class="filter-tab" data-filter="undone" onclick="filterPractice('undone')">🆕 Chưa làm</button>
      </div>

      <div class="scenario-list" id="practice-list"></div>
    </div>
  `;
  filterPractice('all');
}

function filterPractice(filter) {
  document.querySelectorAll('#practice-tabs .filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.filter == filter);
  });

  let filtered;
  if (filter === 'all') filtered = SCENARIOS;
  else if (filter === 'wrong') filtered = SCENARIOS.filter(s => state.scores[s.id] === 0);
  else if (filter === 'undone') filtered = SCENARIOS.filter(s => state.scores[s.id] === undefined);
  else filtered = SCENARIOS.filter(s => s.chapter === filter);

  const list = document.getElementById('practice-list');
  if (filtered.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <div class="empty-title">Không có tình huống</div>
        <div class="empty-desc">Không tìm thấy tình huống nào</div>
      </div>
    `;
    return;
  }
  list.innerHTML = filtered.map(s => renderScenarioItem(s)).join('');
}

function renderScenarioItem(s) {
  const isBookmarked = state.bookmarks.includes(s.id);
  const score = state.scores[s.id];
  let scoreBadge = '<span class="scenario-score-badge score-na">—</span>';
  if (score !== undefined) {
    const scoreClass = score >= 4 ? 'score-high' : score >= 2 ? 'score-mid' : 'score-low';
    scoreBadge = `<span class="scenario-score-badge ${scoreClass}">${score}đ</span>`;
  }

  return `
    <div class="scenario-item" onclick="navigateTo('scenario', {scenario: ${s.id}})">
      <img class="scenario-thumb" src="${s.tipImage}" alt="TH ${s.id}" loading="lazy">
      <div class="scenario-info">
        <div class="scenario-id">Tình huống ${s.id}</div>
        <div class="scenario-title">${s.title}</div>
      </div>
      <div class="scenario-actions">
        ${scoreBadge}
        <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="event.stopPropagation(); toggleBookmark(${s.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
        </button>
      </div>
    </div>
  `;
}

// ============ PAGE: CHAPTER DETAIL ============

function renderChapter(container) {
  const ch = CHAPTERS.find(c => c.id === state.selectedChapter);
  if (!ch) return navigateTo('home');
  const scenarios = SCENARIOS.filter(s => s.chapter === ch.id);
  const done = scenarios.filter(s => state.scores[s.id] !== undefined).length;

  container.innerHTML = `
    <div class="page">
      <h1 class="page-title">${ch.icon} ${ch.name}</h1>
      <p class="page-subtitle">${ch.desc} • ${done}/${scenarios.length} đã làm</p>
      <div class="scenario-list">
        ${scenarios.map(s => renderScenarioItem(s)).join('')}
      </div>
    </div>
  `;
}

// ============ PAGE: SCENARIO DETAIL (WITH VIDEO) ============

function renderScenario(container) {
  const s = SCENARIOS.find(sc => sc.id === state.selectedScenario);
  if (!s) return navigateTo('home');
  const ch = CHAPTERS.find(c => c.id === s.chapter);
  const isBookmarked = state.bookmarks.includes(s.id);
  const score = state.scores[s.id];

  // Reset interactive scoring state
  state.hasAnswered = false;
  state.lastScore = null;
  state.lastScoreTime = null;
  state.isExamMode = false;

  const scoreDisplay = score !== undefined ? `
    <div class="score-result-display">
      <span class="score-result-badge score-${score}">Lần trước: ${score}đ</span>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="page scenario-detail">
      <!-- Video Player -->
      <div class="video-container" id="video-container">
        <video id="scenario-video" 
               preload="metadata"
               playsinline
               webkit-playsinline
               poster="${s.tipImage}">
          <source src="${s.videoUrl}" type="video/mp4">
        </video>

        <!-- Video Overlay Controls -->
        <div class="video-overlay" id="video-overlay" onclick="toggleVideoPlay()">
          <div class="video-play-btn" id="video-play-btn">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>

        <!-- Countdown Overlay -->
        <div class="countdown-overlay hidden" id="countdown-overlay">
          <div class="countdown-number" id="countdown-number">3</div>
          <div class="countdown-text">Chuẩn bị...</div>
        </div>

        <!-- Score Result Popup -->
        <div class="score-popup hidden" id="score-popup">
          <div class="score-popup-value" id="score-popup-value"></div>
          <div class="score-popup-label" id="score-popup-label"></div>
        </div>

        <!-- Tip Image Overlay -->
        <div class="tip-overlay ${state.showTip ? 'visible' : ''}" id="tip-overlay">
          <img src="${s.tipImage}" alt="Mẹo" style="width:100%;height:100%;object-fit:contain">
        </div>



        <!-- Video Progress Bar -->
        <div class="video-progress-wrap" id="video-progress-wrap">
          <div class="video-progress-bar" id="video-progress-bar"></div>
          <div class="video-progress-handle" id="video-progress-handle"></div>
        </div>

        <!-- Score Timeline (practice mode only) -->
        <div class="score-timeline" id="score-timeline" data-scenario-id="${s.id}"></div>

        <!-- Score Flag Marker -->
        <div class="score-flag hidden" id="score-flag">🚩</div>

        <!-- Video Controls Bar -->
        <div class="video-controls">
          <button class="video-ctrl-btn" onclick="toggleVideoPlay()">
            <svg id="ctrl-play-icon" width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </button>
          <span class="video-time" id="video-time">0:00 / 0:00</span>
          <div style="flex:1"></div>
          <button class="video-ctrl-btn tip-toggle ${state.showTip ? 'active' : ''}" onclick="toggleTip()" title="Hiện mẹo">
            💡
          </button>
          <button class="video-ctrl-btn" onclick="toggleFullscreen()" title="Toàn màn hình">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
          </button>
        </div>
      </div>

      <!-- Brake Button (below video) -->
      <button class="brake-btn-main" id="brake-btn" onclick="pressBrake()">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="rgba(255,50,50,0.3)"/>
          <line x1="12" y1="8" x2="12" y2="13"/>
          <circle cx="12" cy="16" r="1" fill="currentColor"/>
        </svg>
        <span>🛑 NHẤN PHANH KHI THẤY NGUY HIỂM</span>
      </button>

      <div style="padding:0 16px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:16px;margin-bottom:16px">
          <div>
            <div class="scenario-id">Tình huống ${s.id} • ${ch.icon} ${ch.name}</div>
            <h2 style="font-size:20px;font-weight:700;margin-top:4px">${s.title}</h2>
          </div>
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark(${s.id})" style="padding:10px">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
          </button>
        </div>

        ${scoreDisplay}

        <!-- Interactive Scoring Info -->
        <div class="scoring-info-card">
          <div class="scoring-info-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <strong>Hướng dẫn học</strong>
          </div>
          <div class="scoring-info-body">
            <p>🎬 Phát video → khi phát hiện <strong>nguy hiểm</strong>, nhấn <strong>🛑 PHANH</strong> hoặc phím <strong>Space</strong></p>
            <p>⏱️ Điểm từ <span class="score-5-text">5đ</span> → <span class="score-1-text">1đ</span> tùy phản xạ nhanh/chậm</p>
          </div>
        </div>

        <div class="scenario-nav-row">
          ${s.id > 1 ? `<button class="nav-btn nav-prev" onclick="navigateTo('scenario', {scenario: ${s.id - 1}})">← TH ${s.id - 1}</button>` : '<div></div>'}
          <button class="nav-btn nav-retry" onclick="retryScenario(${s.id})">🔄 Làm lại</button>
          ${s.id < 120 ? `<button class="nav-btn nav-next" onclick="navigateTo('scenario', {scenario: ${s.id + 1}})">TH ${s.id + 1} →</button>` : '<div></div>'}
        </div>
      </div>
    </div>
  `;

  // Set up video event listeners
  requestAnimationFrame(() => setupVideoPlayer());
}

function retryScenario(id) {
  state.hasAnswered = false;
  state.lastScore = null;
  state.lastScoreTime = null;
  navigateTo('scenario', { scenario: id });
}

function setupVideoPlayer() {
  const video = document.getElementById('scenario-video');
  if (!video) return;

  video.addEventListener('loadedmetadata', () => {
    updateVideoTime();
    buildScoreTimeline();
  });

  video.addEventListener('timeupdate', () => {
    updateVideoTime();
    updateVideoProgress();
    updateScoreHighlight();
  });

  video.addEventListener('play', () => {
    document.getElementById('video-play-btn').style.display = 'none';
    document.getElementById('ctrl-play-icon').innerHTML = '<rect x="6" y="4" width="4" height="16" fill="white"/><rect x="14" y="4" width="4" height="16" fill="white"/>';
  });

  video.addEventListener('pause', () => {
    document.getElementById('video-play-btn').style.display = '';
    document.getElementById('ctrl-play-icon').innerHTML = '<polygon points="5,3 19,12 5,21" fill="white"/>';
  });

  video.addEventListener('ended', () => {
    document.getElementById('video-play-btn').style.display = '';
    document.getElementById('ctrl-play-icon').innerHTML = '<polygon points="5,3 19,12 5,21" fill="white"/>';
    // Auto-score 0 if didn't press brake
    if (!state.hasAnswered && !state.isExamMode) {
      handleBrakeScore(0, video.duration);
    }
  });

  // Progress bar seeking
  const progressWrap = document.getElementById('video-progress-wrap');
  if (progressWrap) {
    let seeking = false;

    const seekTo = (e) => {
      const rect = progressWrap.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      video.currentTime = pct * video.duration;
    };

    progressWrap.addEventListener('mousedown', (e) => { seeking = true; seekTo(e); });
    progressWrap.addEventListener('touchstart', (e) => { seeking = true; seekTo(e); }, { passive: true });
    document.addEventListener('mousemove', (e) => { if (seeking) seekTo(e); });
    document.addEventListener('touchmove', (e) => { if (seeking) seekTo(e); }, { passive: true });
    document.addEventListener('mouseup', () => { seeking = false; });
    document.addEventListener('touchend', () => { seeking = false; });
  }
}

// Build the score timeline visualization
function buildScoreTimeline() {
  const video = document.getElementById('scenario-video');
  const timeline = document.getElementById('score-timeline');
  if (!video || !timeline || !video.duration) return;

  const scenarioId = parseInt(timeline.dataset.scenarioId);
  const s = SCENARIOS.find(sc => sc.id === scenarioId);
  if (!s) return;

  const duration = video.duration;
  const startPct = (s.startPoint / duration) * 100;
  const interval = s.totalPoint / 5;

  const zones = [
    { score: 5, color: '#22c55e', label: '5đ' },
    { score: 4, color: '#84cc16', label: '4đ' },
    { score: 3, color: '#eab308', label: '3đ' },
    { score: 2, color: '#f97316', label: '2đ' },
    { score: 1, color: '#ef4444', label: '1đ' }
  ];

  let html = '';
  zones.forEach((zone, i) => {
    const left = startPct + (i * interval / duration) * 100;
    const width = (interval / duration) * 100;
    html += `<div class="timeline-zone" style="left:${left}%;width:${width}%;background:${zone.color}" title="${zone.label}"></div>`;
  });

  timeline.innerHTML = html;
}

// Highlight the active score zone as video plays
function updateScoreHighlight() {
  const video = document.getElementById('scenario-video');
  const brakeBtn = document.getElementById('brake-btn');
  if (!video || !brakeBtn) return;

  const scenarioId = state.selectedScenario;
  const s = SCENARIOS.find(sc => sc.id === scenarioId);
  if (!s) return;

  const t = video.currentTime;
  const inZone = t >= s.startPoint && t <= (s.startPoint + s.totalPoint);

  if (inZone && !state.hasAnswered && !video.paused) {
    brakeBtn.classList.add('pulse');
  } else {
    brakeBtn.classList.remove('pulse');
  }
}

function pressBrake() {
  const video = document.getElementById('scenario-video');
  if (!video || state.hasAnswered) return;

  if (video.paused || video.ended) {
    // If video hasn't started, start it
    video.play().catch(err => console.error('Play failed:', err));
    return;
  }

  const currentTime = video.currentTime;
  const scenarioId = state.isExamMode ?
    state.examState.scenarios[state.examState.currentIndex].id :
    state.selectedScenario;
  const s = SCENARIOS.find(sc => sc.id === scenarioId);
  if (!s) return;

  const score = calculateScore(currentTime, s);
  handleBrakeScore(score, currentTime);

  if (state.isExamMode) {
    state.examState.answers[scenarioId] = score;
  }
}

function handleBrakeScore(score, time) {
  state.hasAnswered = true;
  state.lastScore = score;
  state.lastScoreTime = time;

  const scenario = state.isExamMode ?
    state.examState.scenarios[state.examState.currentIndex] :
    SCENARIOS.find(s => s.id === state.selectedScenario);

  const scenarioId = scenario.id;

  // Save score
  state.scores[scenarioId] = score;
  saveState();

  // AI: Record reaction & voice feedback
  const reactionTime = time - (scenario.startPoint || 0);
  AI.recordReaction(scenarioId, score, reactionTime, scenario.chapter);
  AI.announceScore(score);

  // CRM: sync attempt
  CRM.syncAttempt(scenarioId, score, reactionTime, scenario.chapter);

  // Show score popup
  showScorePopup(score);

  // Place flag on timeline
  const video = document.getElementById('scenario-video');
  const flag = document.getElementById('score-flag');
  if (video && flag && video.duration) {
    const pct = (time / video.duration) * 100;
    flag.style.left = `${pct}%`;
    flag.classList.remove('hidden');
  }

  // Disable brake button
  const brakeBtn = document.getElementById('brake-btn');
  if (brakeBtn) {
    brakeBtn.classList.add('disabled');
    brakeBtn.classList.remove('pulse');
  }

  // AI: Show quiz after 2s, add replay button
  if (!state.isExamMode) {
    setTimeout(() => showQuizPopup(scenarioId), 2000);

    // Add replay button below brake
    if (brakeBtn && brakeBtn.parentNode) {
      const replayBtn = document.createElement('button');
      replayBtn.className = 'replay-btn';
      replayBtn.innerHTML = '🔄 Xem lại chậm';
      replayBtn.onclick = () => startReplayCoach(scenario, time);
      brakeBtn.parentNode.insertBefore(replayBtn, brakeBtn.nextSibling);
    }
  }
}

function showScorePopup(score) {
  const popup = document.getElementById('score-popup');
  const popupValue = document.getElementById('score-popup-value');
  const popupLabel = document.getElementById('score-popup-label');
  if (!popup || !popupValue || !popupLabel) return;

  const labels = {
    5: { text: '🎯 XUẤT SẮC!', class: 'score-5' },
    4: { text: '👍 TỐT LẮMM!', class: 'score-4' },
    3: { text: '👌 KHÁ!', class: 'score-3' },
    2: { text: '😬 CHẬM!', class: 'score-2' },
    1: { text: '⚠️ RẤT CHẬM!', class: 'score-1' },
    0: { text: '❌ TRƯỢT!', class: 'score-0' }
  };

  const info = labels[score] || labels[0];
  popupValue.textContent = `${score} ĐIỂM`;
  popupValue.className = `score-popup-value ${info.class}`;
  popupLabel.textContent = info.text;
  popup.classList.remove('hidden');
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hidden');
  }, 2500);
}

function toggleVideoPlay() {
  const video = document.getElementById('scenario-video');
  if (!video) return;
  if (video.paused || video.ended) {
    video.play().catch(err => console.error('Play failed:', err));
  } else {
    video.pause();
  }
}

function updateVideoTime() {
  const video = document.getElementById('scenario-video');
  const timeEl = document.getElementById('video-time');
  if (!video || !timeEl) return;
  const cur = formatTime(video.currentTime);
  const dur = formatTime(video.duration || 0);
  timeEl.textContent = `${cur} / ${dur}`;
}

function updateVideoProgress() {
  const video = document.getElementById('scenario-video');
  const bar = document.getElementById('video-progress-bar');
  const handle = document.getElementById('video-progress-handle');
  if (!video || !bar) return;
  const pct = (video.currentTime / (video.duration || 1)) * 100;
  bar.style.width = pct + '%';
  if (handle) handle.style.left = pct + '%';
}

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function toggleTip() {
  state.showTip = !state.showTip;
  const overlay = document.getElementById('tip-overlay');
  const btn = document.querySelector('.tip-toggle');
  if (overlay) overlay.classList.toggle('visible', state.showTip);
  if (btn) btn.classList.toggle('active', state.showTip);
}

function toggleFullscreen() {
  const container = document.getElementById('video-container');
  if (!container) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    container.requestFullscreen().catch(err => {
      const video = document.getElementById('scenario-video');
      if (video && video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    });
  }
}

// Keyboard shortcut: Space to brake
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && (state.currentPage === 'scenario' || state.currentPage === 'exam-active')) {
    e.preventDefault();
    pressBrake();
  }
});

// ============ PAGE: EXAM START ============

function renderExamStart(container) {
  container.innerHTML = `
    <div class="page exam-start">
      <div class="exam-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
      </div>
      <h1 class="exam-title">Thi Thử Mô Phỏng</h1>
      <p class="exam-subtitle">Kiểm tra kiến thức với đề thi mô phỏng giống bài thi thật</p>

      <div class="exam-rules">
        <h3>📋 Quy tắc thi</h3>
        <ul>
          <li>10 tình huống ngẫu nhiên từ 6 chương</li>
          <li>Mỗi tình huống có video mô phỏng</li>
          <li>Mỗi tình huống: 5 điểm hoặc 0 điểm</li>
          <li>Tổng điểm tối đa: 50 điểm</li>
          <li>Đạt yêu cầu: ≥ 35/50 điểm</li>
          <li>Thời gian: 5 phút cho 10 tình huống</li>
        </ul>
      </div>

      <button class="btn-primary" onclick="startExam()">🚀 Bắt Đầu Thi</button>
    </div>
  `;
}

function startExam() {
  const selected = [];
  const usedIds = new Set();

  // Pick 1 from each chapter
  for (const ch of CHAPTERS) {
    const chScenarios = SCENARIOS.filter(s => s.chapter === ch.id);
    const pick = chScenarios[Math.floor(Math.random() * chScenarios.length)];
    selected.push(pick);
    usedIds.add(pick.id);
  }

  // Fill remaining 4
  const remaining = SCENARIOS.filter(s => !usedIds.has(s.id));
  for (let i = 0; i < 4; i++) {
    const idx = Math.floor(Math.random() * remaining.length);
    selected.push(remaining.splice(idx, 1)[0]);
  }

  // Shuffle
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }

  state.examState = {
    scenarios: selected,
    currentIndex: 0,
    answers: {},
    startTime: Date.now(),
    timeLimit: 5 * 60 * 1000
  };

  navigateTo('exam-active');
}

// ============ PAGE: EXAM ACTIVE (WITH VIDEO) ============

let examTimerInterval = null;

function renderExamActive(container) {
  if (!state.examState) return navigateTo('exam');

  const { scenarios, currentIndex, answers } = state.examState;
  const scenario = scenarios[currentIndex];
  const answer = answers[scenario.id];

  // Reset interactive scoring for each question
  state.hasAnswered = answer !== undefined;
  state.isExamMode = true;

  if (examTimerInterval) clearInterval(examTimerInterval);
  examTimerInterval = setInterval(updateExamTimer, 1000);

  container.innerHTML = `
    <div class="exam-progress-container">
      <div class="exam-top-bar">
        <div class="exam-counter">Câu <strong>${currentIndex + 1}</strong> / ${scenarios.length}</div>
        <div class="exam-timer" id="exam-timer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
          <span id="timer-display">--:--</span>
        </div>
      </div>

      <!-- Progress dots -->
      <div style="display:flex;gap:4px;margin-bottom:12px">
        ${scenarios.map((s, i) => {
    let dotColor = 'var(--bg-glass)';
    if (answers[s.id] !== undefined) {
      dotColor = answers[s.id] >= 4 ? 'var(--success)' : answers[s.id] >= 2 ? 'var(--warning, #eab308)' : 'var(--danger)';
    } else if (i === currentIndex) dotColor = 'var(--accent)';
    return `<div style="flex:1;height:4px;border-radius:2px;background:${dotColor};transition:background 0.3s"></div>`;
  }).join('')}
      </div>

      <!-- Exam Video -->
      <div class="video-container exam-video-container" id="video-container">
        <video id="scenario-video" 
               preload="metadata"
               playsinline
               webkit-playsinline
               poster="${scenario.tipImage}"
               autoplay>
          <source src="${scenario.videoUrl}" type="video/mp4">
        </video>
        <div class="video-overlay" id="video-overlay" onclick="toggleVideoPlay()">
          <div class="video-play-btn" id="video-play-btn" style="display:none">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>

        <!-- Score Result Popup -->
        <div class="score-popup hidden" id="score-popup">
          <div class="score-popup-value" id="score-popup-value"></div>
          <div class="score-popup-label" id="score-popup-label"></div>
        </div>

        <!-- Score Flag Marker -->
        <div class="score-flag hidden" id="score-flag">🚩</div>

        <div class="video-progress-wrap" id="video-progress-wrap">
          <div class="video-progress-bar" id="video-progress-bar"></div>
        </div>
        <div class="video-controls">
          <button class="video-ctrl-btn" onclick="toggleVideoPlay()">
            <svg id="ctrl-play-icon" width="20" height="20" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          </button>
          <span class="video-time" id="video-time">0:00 / 0:00</span>
          <div style="flex:1"></div>
          <div class="exam-scenario-label">${scenario.title}</div>
        </div>
      </div>

      <!-- Brake Button (below video, exam mode) -->
      <button class="brake-btn-main ${answer !== undefined ? 'disabled' : ''}" id="brake-btn" onclick="pressBrake()">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="rgba(255,50,50,0.3)"/>
          <line x1="12" y1="8" x2="12" y2="13"/>
          <circle cx="12" cy="16" r="1" fill="currentColor"/>
        </svg>
        <span>🛑 NHẤN PHANH KHI THẤY NGUY HIỂM</span>
      </button>

      <div style="padding:0 16px;margin-top:12px">
        ${answer !== undefined ? `
          <div class="exam-score-feedback">
            <span class="score-result-badge score-${answer}">Bạn đạt: ${answer}đ</span>
          </div>
        ` : `
          <p style="text-align:center;font-size:14px;color:var(--text-secondary);margin-bottom:12px">
            🎬 Xem video và nhấn <strong>🛑 PHANH</strong> hoặc <strong>Space</strong> khi phát hiện nguy hiểm
          </p>
        `}

        <div style="display:flex;gap:12px;margin-top:16px;padding-bottom:20px">
          ${currentIndex > 0 ? `<button class="btn-secondary" style="flex:1" onclick="examPrev()">← Trước</button>` : '<div style="flex:1"></div>'}
          ${currentIndex < scenarios.length - 1 ?
      `<button class="btn-primary" style="flex:1" onclick="examNext()">Tiếp →</button>` :
      `<button class="btn-primary" style="flex:1;background:linear-gradient(135deg,#34d399,#059669)" onclick="finishExam()">🏁 Nộp bài</button>`
    }
        </div>
      </div>
    </div>
  `;

  updateExamTimer();
  requestAnimationFrame(() => setupVideoPlayer());
}

function updateExamTimer() {
  if (!state.examState) return;
  const elapsed = Date.now() - state.examState.startTime;
  const remaining = Math.max(0, state.examState.timeLimit - elapsed);
  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);

  const display = document.getElementById('timer-display');
  const timerEl = document.getElementById('exam-timer');
  if (display) {
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (remaining < 60000 && timerEl) timerEl.classList.add('danger');
  }
  if (remaining === 0) { clearInterval(examTimerInterval); finishExam(); }
}



function examNext() {
  if (state.examState.currentIndex < state.examState.scenarios.length - 1) {
    state.examState.currentIndex++;
    state.hasAnswered = false;
    state.lastScore = null;
    renderPage();
  }
}

function examPrev() {
  if (state.examState.currentIndex > 0) {
    state.examState.currentIndex--;
    state.hasAnswered = false;
    state.lastScore = null;
    renderPage();
  }
}

function finishExam() {
  if (examTimerInterval) clearInterval(examTimerInterval);
  const { answers } = state.examState;
  for (const [id, score] of Object.entries(answers)) {
    state.scores[id] = score;
  }
  saveState();
  navigateTo('exam-results');
}

// ============ PAGE: EXAM RESULTS ============

function renderExamResults(container) {
  if (!state.examState) return navigateTo('exam');
  const { scenarios, answers, startTime } = state.examState;
  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);
  const maxScore = scenarios.length * 5;
  const passed = totalScore >= 35;
  const elapsed = Date.now() - startTime;
  const mins = Math.floor(elapsed / 60000);
  const secs = Math.floor((elapsed % 60000) / 1000);

  container.innerHTML = `
    <div class="results-container">
      <div class="results-score-circle ${passed ? 'pass' : 'fail'}">
        <div class="results-score-value">${totalScore}</div>
        <div class="results-score-total">/ ${maxScore}</div>
      </div>

      <div class="results-label" style="color:${passed ? 'var(--success)' : 'var(--danger)'}">
        ${passed ? '🎉 ĐẠT' : '😔 KHÔNG ĐẠT'}
      </div>
      <p class="results-message">
        ${passed ? 'Chúc mừng! Bạn đã vượt qua bài thi mô phỏng.' : 'Bạn cần đạt ít nhất 35/50 điểm. Hãy luyện tập thêm!'}
        <br>Thời gian: ${mins}:${String(secs).padStart(2, '0')}
      </p>

      <div class="results-breakdown">
        <h3>📊 Chi tiết kết quả</h3>
        ${scenarios.map(s => {
    const sc = answers[s.id] ?? 0;
    return `
            <div class="result-item">
              <span class="result-item-name">TH ${s.id}: ${s.title}</span>
              <span class="result-item-score" style="color:${sc === 5 ? 'var(--success)' : 'var(--danger)'}">${sc}đ</span>
            </div>
          `;
  }).join('')}
      </div>

      <div class="results-actions">
        <button class="btn-primary" onclick="navigateTo('exam'); state.examState = null;">🔄 Thi lại</button>
        <button class="btn-secondary" onclick="navigateTo('home'); state.examState = null;">🏠 Về trang chủ</button>
      </div>
    </div>
  `;
}

// ============ PAGE: BOOKMARKS ============

function renderBookmarks(container) {
  const bookmarked = SCENARIOS.filter(s => state.bookmarks.includes(s.id));
  container.innerHTML = `
    <div class="page">
      <h1 class="page-title">Đánh Dấu</h1>
      <p class="page-subtitle">${bookmarked.length} tình huống đã lưu</p>
      ${bookmarked.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon">🔖</div>
          <div class="empty-title">Chưa có đánh dấu</div>
          <div class="empty-desc">Nhấn biểu tượng 🔖 để đánh dấu ôn tập</div>
        </div>
      ` : `
        <div class="scenario-list">
          ${bookmarked.map(s => renderScenarioItem(s)).join('')}
        </div>
      `}
    </div>
  `;
}

// ============ PAGE: SETTINGS ============

function renderSettings(container) {
  const totalDone = Object.keys(state.scores).length;
  const totalCorrect = Object.values(state.scores).filter(s => s === 5).length;

  container.innerHTML = `
    <div class="page">
      <h1 class="page-title">Cài Đặt</h1>
      <p class="page-subtitle">Quản lý ứng dụng</p>

      <div class="settings-section">
        <div class="settings-section-title">Thống kê</div>
        <div class="settings-list">
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-icon blue"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
              <span class="settings-item-label">Đã làm</span>
            </div>
            <span class="settings-item-value">${totalDone} / 120</span>
          </div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-icon green"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg></div>
              <span class="settings-item-label">Đạt 5 điểm</span>
            </div>
            <span class="settings-item-value">${totalCorrect} câu</span>
          </div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-icon yellow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg></div>
              <span class="settings-item-label">Đã đánh dấu</span>
            </div>
            <span class="settings-item-value">${state.bookmarks.length} câu</span>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">Dữ liệu</div>
        <div class="settings-list">
          <div class="settings-item" onclick="resetProgress()">
            <div class="settings-item-left">
              <div class="settings-icon red"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></div>
              <span class="settings-item-label">Xóa tiến trình</span>
            </div>
            <span class="settings-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg></span>
          </div>
          <div class="settings-item" onclick="resetBookmarks()">
            <div class="settings-item-left">
              <div class="settings-icon red"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/><line x1="4" y1="4" x2="20" y2="20"/></svg></div>
              <span class="settings-item-label">Xóa đánh dấu</span>
            </div>
            <span class="settings-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg></span>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">AI Coach</div>
        <div class="settings-list">
          <div class="settings-item" onclick="toggleVoiceCoach()">
            <div class="settings-item-left">
              <div class="settings-icon ${AI.data.voiceEnabled ? 'green' : 'red'}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg></div>
              <span class="settings-item-label">Voice Coach</span>
            </div>
            <span class="settings-item-value" id="voice-status">${AI.data.voiceEnabled ? '🟢 Bật' : '🔴 Tắt'}</span>
          </div>
          <div class="settings-item" onclick="navigateTo('ai-insights')">
            <div class="settings-item-left">
              <div class="settings-icon blue"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></div>
              <span class="settings-item-label">Phân tích</span>
            </div>
            <span class="settings-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg></span>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">Liên kết CRM</div>
        <div class="settings-list">
          ${CRM.isLinked() ? `
            <div class="settings-item">
              <div class="settings-item-left">
                <div class="settings-icon green"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17,11 19,13 23,9"/></svg></div>
                <div>
                  <span class="settings-item-label">${CRM.getLink().studentName}</span>
                  <div style="font-size:11px;color:var(--text-muted)">${CRM.getLink().phone}</div>
                </div>
              </div>
              <span class="settings-item-value" style="color:var(--success)">✓ Đã liên kết</span>
            </div>
            ${CRM.getOutboxCount() > 0 ? `
            <div class="settings-item">
              <div class="settings-item-left">
                <div class="settings-icon yellow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></div>
                <span class="settings-item-label">Đang chờ đồng bộ</span>
              </div>
              <span class="settings-item-value">${CRM.getOutboxCount()} mục</span>
            </div>
            ` : ''}
            <div class="settings-item" onclick="handleCrmUnlink()">
              <div class="settings-item-left">
                <div class="settings-icon red"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></div>
                <span class="settings-item-label">Hủy liên kết</span>
              </div>
              <span class="settings-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg></span>
            </div>
          ` : `
            <div class="crm-login-form">
              <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px">Liên kết tài khoản CRM để đồng bộ kết quả học</p>
              <input type="tel" id="crm-phone" class="crm-input" placeholder="Số điện thoại" />
              <input type="password" id="crm-password" class="crm-input" placeholder="Mật khẩu" />
              <button class="crm-login-btn" onclick="handleCrmLogin()" id="crm-login-btn">
                🔗 Liên kết CRM
              </button>
              <div id="crm-error" class="crm-error" style="display:none"></div>
            </div>
          `}
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">Thông tin</div>
        <div class="settings-list">
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-icon blue"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>
              <span class="settings-item-label">Phiên bản</span>
            </div>
            <span class="settings-item-value">2.0.0</span>
          </div>
          <div class="settings-item">
            <div class="settings-item-left">
              <div class="settings-icon green"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <span class="settings-item-label">Dữ liệu</span>
            </div>
            <span class="settings-item-value">120 video mô phỏng</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function resetProgress() {
  if (confirm('Xóa toàn bộ tiến trình?')) { state.scores = {}; saveState(); showToast('🗑️ Đã xóa'); renderPage(); }
}

function resetBookmarks() {
  if (confirm('Xóa toàn bộ đánh dấu?')) { state.bookmarks = []; saveState(); showToast('🗑️ Đã xóa'); renderPage(); }
}

// ============ CRM HANDLERS ============

async function handleCrmLogin() {
  const phone = document.getElementById('crm-phone')?.value.trim();
  const pwd = document.getElementById('crm-password')?.value;
  const errEl = document.getElementById('crm-error');
  const btn = document.getElementById('crm-login-btn');

  if (!phone || !pwd) {
    if (errEl) { errEl.style.display = 'block'; errEl.textContent = 'Vui lòng nhập SĐT và mật khẩu'; }
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang kết nối...'; }

  const result = await CRM.login(phone, pwd);

  if (result.ok) {
    showToast(`✅ Đã liên kết: ${result.studentName}`);
    CRM.syncEvent('CRM_LINKED', { app: 'mophong' });
    CRM.syncDailySnapshot();
    renderPage();
  } else {
    if (errEl) { errEl.style.display = 'block'; errEl.textContent = result.error; }
    if (btn) { btn.disabled = false; btn.textContent = '🔗 Liên kết CRM'; }
  }
}

function handleCrmUnlink() {
  if (!confirm('Hủy liên kết CRM? Dữ liệu chưa đồng bộ sẽ bị xóa.')) return;
  CRM.unlink();
  showToast('🔓 Đã hủy liên kết CRM');
  renderPage();
}

// Init CRM sync
CRM.initSync();

function toggleVoiceCoach() {
  const isOn = AI.toggleVoice();
  const el = document.getElementById('voice-status');
  if (el) el.textContent = isOn ? '🟢 Bật' : '🔴 Tắt';
  showToast(isOn ? '🔊 Voice Coach đã bật' : '🔇 Voice Coach đã tắt');
  renderPage();
}

// ============ PAGE: AI INSIGHTS ============

function renderAIInsights(container) {
  const profile = AI.getReflexProfile();
  const prediction = AI.predictExamResult();
  const achievements = AI.getAchievements();
  const progress = AI.getLearningProgress();
  const streak = AI.data.streak;
  const weakList = AI.getWeakScenarios(5);
  const weakness = AI.getWeaknessProfile();
  const quizStats = AI.getQuizStats();

  // Prediction gauge color
  const gaugeColor = prediction.passRate >= 85 ? '#22c55e' :
    prediction.passRate >= 70 ? '#84cc16' :
      prediction.passRate >= 50 ? '#eab308' : '#ef4444';

  container.innerHTML = `
    <div class="page">
      <h1 class="page-title">🧠 Phân tích</h1>
      <p class="page-subtitle">Phân tích thông minh dành riêng cho bạn</p>

      <!-- Prediction Gauge -->
      <div class="ai-predict-section">
        <div class="ai-gauge">
          <svg viewBox="0 0 120 70" class="ai-gauge-svg">
            <path d="M10 65 A50 50 0 0 1 110 65" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="10" stroke-linecap="round"/>
            <path d="M10 65 A50 50 0 0 1 110 65" fill="none" stroke="${gaugeColor}" stroke-width="10" stroke-linecap="round"
              stroke-dasharray="${prediction.passRate * 1.57} 157" />
          </svg>
          <div class="ai-gauge-value" style="color:${gaugeColor}">${prediction.passRate}%</div>
          <div class="ai-gauge-label">Khả năng đậu</div>
        </div>
        <p class="ai-predict-msg">${prediction.recommendation}</p>
        <div class="ai-predict-details">
          <span>📊 TB: ${prediction.avgScore || '—'}đ</span>
          <span>📈 Phủ: ${prediction.coverage || 0}%</span>
          <span>🎯 Ổn định: ${prediction.consistency || 0}%</span>
        </div>
      </div>

      <!-- Streak -->
      <div class="ai-section-card">
        <div class="ai-section-title">🔥 Streak</div>
        <div style="display:flex;gap:20px;justify-content:center;text-align:center">
          <div><div style="font-size:32px;font-weight:800;color:#f59e0b">${streak.current}</div><div style="font-size:12px;color:var(--text-secondary)">Hiện tại</div></div>
          <div><div style="font-size:32px;font-weight:800;color:#ef4444">${streak.longest}</div><div style="font-size:12px;color:var(--text-secondary)">Kỷ lục</div></div>
        </div>
      </div>

      ${profile ? `
      <!-- Reflex Profile -->
      <div class="ai-section-card">
        <div class="ai-section-title">⚡ Hồ sơ phản xạ</div>
        <div class="ai-reflex-stats">
          <div class="ai-reflex-stat">
            <span class="ai-reflex-stat-val">${profile.avgScore}</span>
            <span class="ai-reflex-stat-lbl">Điểm TB</span>
          </div>
          <div class="ai-reflex-stat">
            <span class="ai-reflex-stat-val">${profile.avgTime}s</span>
            <span class="ai-reflex-stat-lbl">Phản xạ TB</span>
          </div>
          <div class="ai-reflex-stat">
            <span class="ai-reflex-stat-val">${profile.trend === 'improving' ? '📈' : profile.trend === 'declining' ? '📉' : '➡️'}</span>
            <span class="ai-reflex-stat-lbl">${profile.trend === 'improving' ? 'Tiến bộ' : profile.trend === 'declining' ? 'Giảm' : 'Ổn định'}</span>
          </div>
        </div>

        <!-- Chapter bar chart -->
        <div class="ai-chart">
          ${Object.entries(profile.chapterStats).map(([id, s]) => `
            <div class="ai-chart-row">
              <span class="ai-chart-label">${s.icon} Ch.${id}</span>
              <div class="ai-chart-bar-wrap">
                <div class="ai-chart-bar" style="width:${(s.avgScore / 5) * 100}%;background:${s.avgScore >= 4 ? '#22c55e' : s.avgScore >= 3 ? '#eab308' : '#ef4444'}"></div>
              </div>
              <span class="ai-chart-val">${s.avgScore}</span>
            </div>
          `).join('')}
        </div>

        ${profile.weakestChapter ? `
          <div class="ai-weak-badge">⚠️ Chương yếu nhất: ${profile.weakestChapter.icon} ${profile.weakestChapter.name} (${profile.weakestChapter.avgScore}đ)</div>
        ` : ''}
      </div>
      ` : `
      <div class="ai-section-card" style="text-align:center;padding:24px">
        <div style="font-size:32px;margin-bottom:8px">📊</div>
        <p style="color:var(--text-secondary)">Hãy làm thêm tình huống để xem phân tích phản xạ</p>
      </div>
      `}

      <!-- Weak Scenarios -->
      ${weakList.length > 0 ? `
      <div class="ai-section-card">
        <div class="ai-section-title">📋 Cần ôn lại</div>
        <div class="ai-weak-full-list">
          ${weakList.map(s => `
            <div class="ai-weak-full-item" onclick="navigateTo('scenario',{scenario:${s.id}})">
              <span class="ai-weak-full-num">TH ${s.id}</span>
              <span class="ai-weak-full-title">${s.title}</span>
              <span class="ai-weak-full-score ${s.score !== undefined ? (s.score <= 2 ? 'low' : 'mid') : 'na'}">${s.score !== undefined ? s.score + 'đ' : '—'}</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Weakness Profile -->
      ${weakness.length > 0 ? `
      <div class="ai-section-card">
        <div class="ai-section-title">🎯 Điểm yếu chi tiết</div>
        <div class="ai-weakness-list">
          ${weakness.map(w => `
            <div class="ai-weakness-item">
              <span class="ai-weakness-icon">${w.icon}</span>
              <span class="ai-weakness-name">${w.name}</span>
              <div class="ai-weakness-bar-wrap">
                <div class="ai-weakness-bar" style="width:${(w.avgScore / 5) * 100}%;background:${w.avgScore >= 4 ? '#22c55e' : w.avgScore >= 3 ? '#eab308' : '#ef4444'}"></div>
              </div>
              <span class="ai-weakness-score">${w.avgScore}đ</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Quiz Stats -->
      ${quizStats.total > 0 ? `
      <div class="ai-section-card">
        <div class="ai-section-title">❓ Quiz</div>
        <div style="display:flex;gap:20px;justify-content:center;text-align:center">
          <div><div style="font-size:28px;font-weight:800;color:var(--accent)">${quizStats.correct}/${quizStats.total}</div><div style="font-size:12px;color:var(--text-secondary)">Đúng</div></div>
          <div><div style="font-size:28px;font-weight:800;color:${quizStats.pct >= 70 ? '#22c55e' : '#eab308'}">${quizStats.pct}%</div><div style="font-size:12px;color:var(--text-secondary)">Tỉ lệ</div></div>
        </div>
      </div>
      ` : ''}

      <!-- Achievements -->
      <div class="ai-section-card">
        <div class="ai-section-title">🏆 Thành tích (${achievements.filter(a => a.unlocked).length}/${achievements.length})</div>
        <div class="ai-achievements-grid">
          ${achievements.map(a => `
            <div class="ai-achievement ${a.unlocked ? 'unlocked' : 'locked'}">
              <div class="ai-achievement-icon">${a.icon}</div>
              <div class="ai-achievement-name">${a.name}</div>
              <div class="ai-achievement-desc">${a.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Learning Progress -->
      <div class="ai-section-card">
        <div class="ai-section-title">📈 Tiến trình học</div>
        <div style="text-align:center;margin-bottom:16px">
          <div style="font-size:36px;font-weight:800;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${progress.pct}%</div>
          <div style="font-size:13px;color:var(--text-secondary)">${progress.done}/${progress.total} tình huống • ${progress.mastered} thành thạo</div>
        </div>
        <div class="ai-progress-chapters">
          ${progress.chapterProgress.map(ch => `
            <div class="ai-progress-ch">
              <div class="ai-progress-ch-header">
                <span>${ch.icon} Ch.${ch.id}: ${ch.name}</span>
                <span>${ch.done}/${ch.total}</span>
              </div>
              <div class="ai-progress-ch-bar"><div style="width:${ch.pct}%"></div></div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

// ============ DAILY SUMMARY ============

function showDailySummary() {
  const s = AI.getDailySummary();
  const modal = document.getElementById('scenario-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  if (!modal || !title || !body) { showToast(s.message); return; }

  title.textContent = '📊 Tóm tắt ngày';
  if (s.count === 0) {
    body.innerHTML = `<div style="text-align:center;padding:20px"><div style="font-size:48px;margin-bottom:12px">📚</div><p>${s.message}</p></div>`;
  } else {
    body.innerHTML = `
      <div class="daily-summary">
        <div class="daily-summary-stat"><span class="ds-val">${s.count}</span><span class="ds-lbl">Tình huống</span></div>
        <div class="daily-summary-stat"><span class="ds-val">${s.avgScore}đ</span><span class="ds-lbl">Điểm TB</span></div>
        <div class="daily-summary-stat"><span class="ds-val">${s.best}đ</span><span class="ds-lbl">Cao nhất</span></div>
        <div class="daily-summary-stat"><span class="ds-val">${s.worst}đ</span><span class="ds-lbl">Thấp nhất</span></div>
      </div>
      <p style="text-align:center;margin-top:12px;font-weight:600">${s.comparison === 'better' ? '📈 Tốt hơn hôm qua!' : s.comparison === 'worse' ? '📉 Cần cố gắng hơn!' : '✨ Tiếp tục cố gắng!'}</p>
    `;
  }
  modal.classList.remove('hidden');
}

// ============ STUDY PLAN ============

function renderStudyPlan(container) {
  const plan = AI.getStudyPlan();
  const scenarios = typeof SCENARIOS !== 'undefined' ? SCENARIOS : [];
  const scores = typeof state !== 'undefined' ? state.scores : {};

  if (!plan) {
    container.innerHTML = `
      <div class="page">
        <h1 class="page-title">📅 Kế hoạch học</h1>
        <p class="page-subtitle">Tạo lộ trình ôn tập cá nhân hóa</p>
        <div class="study-plan-create">
          <div style="font-size:64px;margin-bottom:16px">🎯</div>
          <p style="margin-bottom:24px;color:var(--text-secondary)">Chọn số ngày để chia 120 tình huống thành bài học hằng ngày</p>
          <div class="study-plan-options">
            <button class="study-plan-btn" onclick="createPlan(7)">7 ngày<br><small>17 TH/ngày</small></button>
            <button class="study-plan-btn" onclick="createPlan(14)">14 ngày<br><small>9 TH/ngày</small></button>
            <button class="study-plan-btn" onclick="createPlan(30)">30 ngày<br><small>4 TH/ngày</small></button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Has plan — show schedule
  const today = AI.getStudyPlanToday();
  const completedDays = plan.schedule.filter(d => d.completed).length;

  container.innerHTML = `
    <div class="page">
      <h1 class="page-title">📅 Kế hoạch ${plan.days} ngày</h1>
      <p class="page-subtitle">Bắt đầu: ${plan.startDate} • ${completedDays}/${plan.days} ngày xong</p>

      <div class="study-progress-bar">
        <div style="width:${(completedDays / plan.days) * 100}%"></div>
      </div>

      ${today ? `
      <div class="ai-section-card" style="border-color:rgba(79,142,247,0.4)">
        <div class="ai-section-title">📌 Hôm nay — Ngày ${today.day}</div>
        <div class="study-day-scenarios">
          ${today.scenarioIds.map(id => {
    const s = scenarios.find(x => x.id === id);
    const done = scores[id] !== undefined;
    return s ? `<div class="ai-challenge-item ${done ? 'done' : ''}" onclick="navigateTo('scenario',{scenario:${id}})">
              <span class="ai-challenge-num">TH ${id}</span>
              <span class="ai-challenge-title">${s.title}</span>
              ${done ? '<span class="ai-challenge-check">✅</span>' : '<span class="ai-challenge-go">→</span>'}
            </div>` : '';
  }).join('')}
        </div>
      </div>
      ` : '<div class="ai-section-card" style="text-align:center;padding:20px">✅ Kế hoạch học đã hoàn thành!</div>'}

      <div class="study-schedule">
        ${plan.schedule.map((day, i) => {
    const isToday = today && today.dayIndex === i;
    const doneCount = day.scenarioIds.filter(id => scores[id] !== undefined).length;
    return `
            <div class="study-day ${day.completed ? 'completed' : ''} ${isToday ? 'today' : ''}">
              <span class="study-day-num">Ngày ${day.day}</span>
              <span class="study-day-count">${doneCount}/${day.scenarioIds.length}</span>
              ${day.completed ? '✅' : isToday ? '👉' : ''}
            </div>
          `;
  }).join('')}
      </div>

      <button class="study-delete-btn" onclick="deletePlan()">Xóa kế hoạch</button>
    </div>
  `;
}

function createPlan(days) {
  AI.createStudyPlan(days);
  showToast(`✅ Đã tạo kế hoạch ${days} ngày!`);
  renderPage();
}

function deletePlan() {
  if (confirm('Xóa kế hoạch học?')) { AI.deleteStudyPlan(); renderPage(); }
}

// ============ QUIZ POPUP ============

function showQuizPopup(scenarioId) {
  const quiz = AI.getQuizForScenario(scenarioId);
  if (!quiz) return;

  const overlay = document.createElement('div');
  overlay.className = 'quiz-overlay';
  overlay.innerHTML = `
    <div class="quiz-popup">
      <div class="quiz-question">❓ ${quiz.q}</div>
      <div class="quiz-answers">
        ${quiz.a.map((a, i) => `<button class="quiz-answer" data-idx="${i}">${a}</button>`).join('')}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelectorAll('.quiz-answer').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const correct = AI.answerQuiz(scenarioId, idx);
      // Highlight correct/wrong
      overlay.querySelectorAll('.quiz-answer').forEach((b, i) => {
        if (i === quiz.c) b.classList.add('correct');
        else if (i === idx && !correct) b.classList.add('wrong');
        b.disabled = true;
      });
      setTimeout(() => overlay.remove(), 1500);
    });
  });

  // Auto-dismiss after 15s
  setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 15000);
}

// ============ REPLAY COACH ============

function startReplayCoach(scenario, brakeTime) {
  const segment = AI.getReplaySegment(scenario, brakeTime);
  if (!segment) return;
  const video = document.getElementById('scenario-video');
  if (!video) return;

  video.playbackRate = segment.speed;
  video.currentTime = segment.startTime;
  video.play();

  AI.speak('Xem lại chậm. Chú ý điểm nguy hiểm.');

  const checkEnd = () => {
    if (video.currentTime >= segment.endTime) {
      video.pause();
      video.playbackRate = 1;
    } else {
      requestAnimationFrame(checkEnd);
    }
  };
  requestAnimationFrame(checkEnd);
}

// ============ TYPEWRITER ============

const MOTIVATIONAL_MESSAGES = [
  'Chào bạn! Hôm nay hãy chinh phục thêm vài tình huống nhé! 💪',
  'Mỗi ngày luyện tập là một bước gần hơn đến tấm bằng lái! 🎯',
  'Phản xạ tốt = an toàn trên đường. Bắt đầu ôn nào! 🛡️',
  'Bạn đang làm rất tốt! Tiếp tục cố gắng nhé! ✨',
  'Thầy Duy tin bạn sẽ đậu! Ôn thêm chút nữa thôi! 🏆',
  'Luyện tập đều đặn là chìa khóa thành công! 🔑',
  'Hãy nhớ: quan sát kỹ, phản xạ nhanh, lái xe an toàn! 👀',
  'Chúc bạn buổi học hiệu quả và vui vẻ! 🎓',
  'An toàn giao thông bắt đầu từ sự chuẩn bị! 🚗',
  'Tự tin vào bản thân — bạn hoàn toàn có thể làm được! 🌟'
];

let _twInterval = null;

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return '🌅 Chào buổi sáng!';
  if (h < 17) return '☀️ Chào buổi chiều!';
  return '🌙 Chào buổi tối!';
}

function startTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const msg = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
  let i = 0;
  el.textContent = '';
  el.classList.add('typing');

  if (_twInterval) clearInterval(_twInterval);
  _twInterval = setInterval(() => {
    if (i < msg.length) {
      el.textContent = msg.substring(0, i + 1);
      i++;
    } else {
      clearInterval(_twInterval);
      el.classList.remove('typing');
    }
  }, 45);
}

// ============ HELPERS ============

function toggleBookmark(id) {
  const idx = state.bookmarks.indexOf(id);
  if (idx >= 0) { state.bookmarks.splice(idx, 1); showToast('Đã bỏ đánh dấu'); }
  else { state.bookmarks.push(id); showToast('✅ Đã đánh dấu'); }
  saveState();
  renderPage();
}

let toastTimeout = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add('hidden'), 2000);
}

function closeModal() {
  document.getElementById('scenario-modal').classList.add('hidden');
}

// ============ INIT ============

function init() {
  loadState();
  AI.init();
  renderPage();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW failed', err));
  }
}

document.addEventListener('DOMContentLoaded', init);
