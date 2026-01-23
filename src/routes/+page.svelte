<script lang="ts">
  let sidebarOpen = $state(true);
  let marqueeText =
    "🎮 新遊戲即將推出！ | ⚡ 系統持續更新中 | 🎉 歡迎來到每日糞Game | 🚀 使用 Tauri + Svelte 打造";

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<div class="app-container">
  <!-- Marquee Announcement Bar -->
  <div
    class="marquee-container"
    role="marquee"
    aria-live="polite"
    aria-label="Scrolling announcements"
  >
    <div class="marquee-content">
      <span class="marquee-text">{marqueeText}</span>
      <span class="marquee-text">{marqueeText}</span>
    </div>
  </div>

  <!-- Sidebar -->
  <aside class="sidebar" class:closed={!sidebarOpen}>
    <div class="sidebar-header">
      <h2>遊戲列表</h2>
      <button class="close-btn" onclick={toggleSidebar} aria-label="關閉側邊欄"> ✕ </button>
    </div>
    <div class="sidebar-content">
      <p class="no-games">目前尚無可玩的遊戲</p>
      <p class="coming-soon">敬請期待...</p>
      <!-- 
      Future games will be displayed here as a list
      Example:
      <ul class="games-list">
        <li>
          <a href="/game-001">
            <span class="game-name">遊戲名稱</span>
            <span class="game-desc">遊戲描述</span>
          </a>
        </li>
      </ul>
      -->
    </div>
  </aside>

  <!-- Toggle Button (when sidebar is closed) -->
  {#if !sidebarOpen}
    <button class="sidebar-toggle" onclick={toggleSidebar} aria-label="開啟側邊欄"> ☰ </button>
  {/if}

  <!-- Main Content -->
  <main class="main-content" class:expanded={!sidebarOpen}>
    <div class="hero-section">
      <h1 class="title">每日糞Game</h1>
      <p class="subtitle">Daily Kusogames</p>
      <div class="hero-description">
        <p>
          歡迎來到每日糞Game！這是一個使用 Tauri + Svelte
          開發的專案，目標是定期製作各種有趣的小遊戲。
        </p>
        <p>每個遊戲都模仿或諷刺常見的廣告手遊元素，帶給你獨特的遊戲體驗。</p>
      </div>
    </div>

    <div class="features-section">
      <div class="feature-card">
        <div class="feature-icon">🎮</div>
        <h3>快速開發</h3>
        <p>每幾天推出一款全新的小遊戲</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">✨</div>
        <h3>創意十足</h3>
        <p>模仿廣告手遊的誇張效果與玩法</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🚀</div>
        <h3>現代技術</h3>
        <p>使用 Svelte 5 + Tauri V2 打造</p>
      </div>
    </div>

    <div class="info-section">
      <h2>關於本專案</h2>
      <p>
        Daily Kusogames 是一個實驗性專案，目標是快速開發和發布各種有趣的小遊戲。
        每個遊戲都可能模仿或諷刺常見的廣告手遊元素，帶來獨特且有趣的遊戲體驗。
      </p>
      <p>專案使用現代 Web 技術棧（Svelte 5、TypeScript、Vite）並通過 Tauri 打包成桌面應用程式。</p>
      <p class="start-hint">👈 使用左側的側邊欄或上方的按鈕即可查看可用的遊戲列表</p>
    </div>
  </main>
</div>

<style>
  :global(:root) {
    /* Color System */
    --color-primary-blue: #171bf9;
    --color-dark-blue: #1015b8;
    --color-light-blue: #4d50ff;
    --color-primary-yellow: #f9fa1f;
    --color-warning-yellow: #e0e11c;
    --color-black: #000000;
    --color-dark: #0a0e1a;
    --color-medium-dark: #1a1f2e;
    --color-charcoal: #2a2f3e;
    --color-white: #ffffff;
    --color-gray: #9ca3af;

    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;

    /* Dimensions */
    --marquee-height: 52px;

    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;

    /* Shadows */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
    --shadow-blue: 0 4px 12px rgba(23, 27, 249, 0.3);
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family:
      "Inter",
      "Noto Sans TC",
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      sans-serif;
    background-color: var(--color-black);
    background-image:
      linear-gradient(rgba(23, 27, 249, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(23, 27, 249, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
    color: var(--color-white);
    overflow-x: hidden;
    position: relative;
  }

  :global(body::before) {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.5) 20%,
      rgba(0, 0, 0, 0.9) 50%,
      #000000 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  :global(body::after) {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='1000' height='1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,500 Q100,400 200,450 T400,500 T600,480 T800,520 T1000,500' stroke='rgba(23,27,249,0.15)' fill='none' stroke-width='2'/%3E%3Cpath d='M0,600 Q100,550 200,580 T400,600 T600,620 T800,580 T1000,600' stroke='rgba(23,27,249,0.12)' fill='none' stroke-width='2'/%3E%3Cpath d='M0,700 Q100,680 200,720 T400,700 T600,690 T800,710 T1000,700' stroke='rgba(23,27,249,0.1)' fill='none' stroke-width='2'/%3E%3C/svg%3E");
    background-size: 1000px 1000px;
    animation: scrollBackground 20s linear infinite;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  @keyframes scrollBackground {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -1000px 0;
    }
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }

  /* Marquee Announcement Bar */
  .marquee-container {
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(10, 14, 26, 0.8) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
    border-top: 2px solid var(--color-primary-blue);
    border-bottom: 2px solid var(--color-primary-blue);
    padding: 12px 0;
    overflow: hidden;
    position: relative;
    z-index: 101;
    box-shadow: var(--shadow-blue);
  }

  .marquee-content {
    display: flex;
    animation: marquee 30s linear infinite;
    white-space: nowrap;
  }

  .marquee-content:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-content {
      animation: none;
    }
  }

  .marquee-text {
    display: inline-block;
    padding: 0 4rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-white);
    letter-spacing: 0.5px;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  /* Sidebar Styles */
  .sidebar {
    width: 280px;
    background: rgba(26, 31, 46, 0.95);
    backdrop-filter: blur(10px);
    border-right: 2px solid rgba(0, 212, 255, 0.3);
    padding: var(--spacing-lg);
    transition: transform 0.3s ease;
    position: fixed;
    left: 0;
    top: var(--marquee-height);
    bottom: 0;
    z-index: 100;
    overflow-y: auto;
    box-shadow: var(--shadow-md);
  }

  .sidebar.closed {
    transform: translateX(-100%);
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid rgba(0, 212, 255, 0.3);
  }

  .sidebar-header h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary-blue);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .close-btn {
    background: transparent;
    border: 2px solid rgba(255, 215, 0, 0.5);
    color: var(--color-primary-yellow);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    transition: all 0.2s;
    border-radius: var(--radius-sm);
    line-height: 1;
  }

  .close-btn:hover {
    background: rgba(255, 215, 0, 0.1);
    border-color: var(--color-primary-yellow);
    transform: rotate(90deg);
  }

  .sidebar-content {
    color: rgba(255, 255, 255, 0.9);
  }

  .no-games {
    text-align: center;
    font-size: 1rem;
    margin: 2rem 0 0.5rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .coming-soon {
    text-align: center;
    font-size: 0.9rem;
    color: var(--color-primary-yellow);
    font-weight: 500;
  }

  /* Sidebar Toggle Button */
  .sidebar-toggle {
    position: fixed;
    left: 1rem;
    top: calc(var(--marquee-height) + 1rem);
    z-index: 99;
    background: linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-dark-blue) 100%);
    border: 2px solid var(--color-primary-blue);
    color: var(--color-black);
    font-size: 1.5rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: all 0.3s ease;
    font-weight: 700;
    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
  }

  .sidebar-toggle:hover {
    background: linear-gradient(135deg, var(--color-light-blue) 0%, var(--color-primary-blue) 100%);
    box-shadow: 0 6px 20px rgba(0, 212, 255, 0.6);
    transform: scale(1.05);
  }

  /* Main Content Styles */
  .main-content {
    flex: 1;
    margin-left: 280px;
    margin-top: var(--marquee-height);
    padding: 3rem;
    transition: margin-left 0.3s ease;
  }

  .main-content.expanded {
    margin-left: 0;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 4rem;
    padding: 2rem 0;
  }

  .title {
    font-size: 4rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: var(--color-white);
    background: linear-gradient(135deg, var(--color-primary-blue) 0%, var(--color-light-blue) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
    filter: drop-shadow(0 4px 8px rgba(0, 212, 255, 0.3));
  }

  /* Fallback for browsers that don't support background-clip: text */
  @supports not (background-clip: text) {
    .title {
      color: var(--color-primary-blue);
      background: none;
    }
  }

  .subtitle {
    font-size: 1.75rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 2rem 0;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  .hero-description {
    max-width: 700px;
    margin: 0 auto;
    font-size: 1.1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
  }

  .hero-description p {
    margin: 1rem 0;
  }

  .features-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .feature-card {
    background: rgba(26, 31, 46, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 212, 255, 0.3);
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #00d4ff 50%, transparent 100%);
    transition: left 0.5s ease;
  }

  .feature-card:hover::before {
    left: 100%;
  }

  .feature-card:hover {
    transform: translateY(-8px);
    border-color: rgba(0, 212, 255, 0.6);
    box-shadow: 0 8px 24px rgba(0, 212, 255, 0.3);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
  }

  .feature-card h3 {
    font-size: 1.5rem;
    margin: 0 0 0.75rem 0;
    color: var(--color-primary-blue);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .feature-card p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    line-height: 1.6;
  }

  .info-section {
    background: rgba(26, 31, 46, 0.8);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(0, 212, 255, 0.3);
    border-radius: var(--radius-md);
    padding: 2.5rem;
    max-width: 900px;
    margin: 0 auto;
    box-shadow: var(--shadow-md);
    position: relative;
  }

  .info-section::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--color-primary-blue) 50%,
      transparent 100%
    );
  }

  .info-section h2 {
    font-size: 2rem;
    margin: 0 0 1.5rem 0;
    color: var(--color-primary-blue);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .info-section p {
    font-size: 1.05rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    margin: 1rem 0;
  }

  .info-section .start-hint {
    margin-top: 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-primary-yellow);
    text-align: center;
    padding: 1rem;
    background: rgba(255, 215, 0, 0.1);
    border-radius: var(--radius-sm);
    border: 1px solid rgba(255, 215, 0, 0.3);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      max-width: 280px;
      top: var(--marquee-height);
    }

    .main-content {
      margin-left: 0;
      padding: 1.5rem 1.5rem 1.5rem 1.5rem;
      margin-top: var(--marquee-height);
    }

    .sidebar-toggle {
      top: calc(var(--marquee-height) + 1rem);
    }

    .title {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.25rem;
    }

    .features-section {
      grid-template-columns: 1fr;
    }

    .hero-description {
      font-size: 1rem;
    }

    .marquee-text {
      font-size: 0.9rem;
      padding: 0 2rem;
    }
  }
</style>
