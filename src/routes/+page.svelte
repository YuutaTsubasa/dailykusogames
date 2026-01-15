<script lang="ts">
  let sidebarOpen = $state(true);

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<div class="app-container">
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
      <p class="start-hint">👈 點擊左側的側邊欄即可查看可用的遊戲列表</p>
    </div>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    overflow-x: hidden;
  }

  .app-container {
    display: flex;
    min-height: 100vh;
    position: relative;
  }

  /* Sidebar Styles */
  .sidebar {
    width: 280px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    transition: transform 0.3s ease;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    overflow-y: auto;
  }

  .sidebar.closed {
    transform: translateX(-100%);
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .sidebar-header h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #fff;
  }

  .close-btn {
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    transition: opacity 0.2s;
  }

  .close-btn:hover {
    opacity: 0.7;
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
    color: rgba(255, 255, 255, 0.5);
  }

  /* Future styles for games list - will be used when games are added
  .games-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .games-list li {
    margin-bottom: 0.75rem;
  }

  .games-list a {
    display: block;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    text-decoration: none;
    color: #fff;
    transition: all 0.2s;
  }

  .games-list a:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
  }

  .game-name {
    display: block;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  .game-desc {
    display: block;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
  }
  */

  /* Sidebar Toggle Button */
  .sidebar-toggle {
    position: fixed;
    left: 1rem;
    top: 1rem;
    z-index: 99;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 1.5rem;
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .sidebar-toggle:hover {
    background: rgba(0, 0, 0, 0.6);
    transform: scale(1.05);
  }

  /* Main Content Styles */
  .main-content {
    flex: 1;
    margin-left: 280px;
    padding: 3rem;
    transition: margin-left 0.3s ease;
  }

  .main-content.expanded {
    margin-left: 0;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 4rem;
  }

  .title {
    font-size: 4rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: #fff;
    background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Fallback for browsers that don't support background-clip: text */
  @supports not (background-clip: text) {
    .title {
      color: #fff;
      background: none;
    }
  }

  .subtitle {
    font-size: 1.75rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 2rem 0;
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
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .feature-card h3 {
    font-size: 1.5rem;
    margin: 0 0 0.75rem 0;
  }

  .feature-card p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }

  .info-section {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 2.5rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .info-section h2 {
    font-size: 2rem;
    margin: 0 0 1.5rem 0;
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
    font-weight: 500;
    color: #ffd700;
    text-align: center;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      max-width: 280px;
    }

    .main-content {
      margin-left: 0;
      padding: 1.5rem;
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
  }
</style>
