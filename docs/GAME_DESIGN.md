# 遊戲設計指南 (Game Design Guide)

本文件提供 Daily Kusogames 專案的遊戲設計指導原則和開發流程。

This document provides game design guidelines and development workflow for the Daily Kusogames project.

## 🎯 專案目標 (Project Goals)

### 核心理念 (Core Concept)

每幾天製作一款模仿廣告手遊風格的小遊戲，這些遊戲可以是：

Create one mini-game every few days that mimics the style of mobile game advertisements. These games can be:

- 諷刺性的廣告手遊模仿作品
- 有趣的互動體驗
- 實驗性的遊戲機制
- 簡單但令人上癮的小遊戲

### 時程規劃 (Timeline)

- **每個遊戲開發週期**: 2-4 天
- **快速原型**: 1 天
- **完善與測試**: 1-2 天
- **發布準備**: 0.5-1 天

## 🎮 遊戲類型參考 (Game Type References)

### 常見廣告手遊類型

1. **解謎類 (Puzzle)**
   - 拉針遊戲 (Pin pulling)
   - 配對消除 (Match-3)
   - 物理解謎 (Physics puzzles)

2. **模擬經營類 (Simulation)**
   - 資源管理 (Resource management)
   - 建造遊戲 (Building games)
   - 角色養成 (Character development)

3. **動作反應類 (Action/Reaction)**
   - 一鍵點擊 (One-tap games)
   - 躲避障礙 (Obstacle avoidance)
   - 時機掌握 (Timing games)

4. **RPG/冒險類 (RPG/Adventure)**
   - 簡化 RPG 戰鬥 (Simplified RPG combat)
   - 裝備收集 (Equipment collection)
   - 關卡推進 (Level progression)

## 📐 設計原則 (Design Principles)

### 1. 簡單易懂 (Simple and Intuitive)

- 遊戲規則應該在 30 秒內理解
- UI 設計清晰明瞭
- 操作方式簡單（滑鼠點擊或鍵盤操作）

### 2. 快速開發 (Rapid Development)

- 使用現成的 Svelte 元件庫
- 重用之前遊戲的程式碼和資源
- 避免過度複雜的遊戲機制

### 3. 誇張有趣 (Exaggerated and Fun)

- 模仿廣告手遊的誇張效果
- 加入幽默元素
- 視覺效果豐富但不過度

### 4. 技術可行 (Technically Feasible)

- 所有邏輯在前端實現（TypeScript/Svelte）
- 不需要複雜的後端服務
- 純本地運行或使用簡單的資料存儲

## 🔧 技術實作指南 (Technical Implementation Guide)

### 專案結構

每個遊戲應該遵循以下結構：

```
src/
├── routes/
│   ├── game-001/           # 遊戲 1
│   │   ├── +page.svelte    # 主頁面
│   │   ├── components/     # 遊戲專用元件
│   │   ├── utils/          # 遊戲邏輯工具
│   │   └── assets/         # 遊戲資源
│   ├── game-002/           # 遊戲 2
│   └── +page.svelte        # 首頁（遊戲列表）
└── lib/
    ├── components/         # 共用元件
    └── utils/              # 共用工具
```

### 命名規範 (Naming Conventions)

- **遊戲路徑**: `game-XXX` (XXX 為三位數編號，如 001, 002)
- **元件檔案**: PascalCase (如 `GameButton.svelte`)
- **工具檔案**: camelCase (如 `gameLogic.ts`)
- **常數**: UPPER_SNAKE_CASE (如 `MAX_SCORE`)

### 狀態管理 (State Management)

- 優先使用 Svelte 內建的響應式狀態
- 複雜狀態可使用 Svelte stores
- 遊戲進度使用 localStorage 保存

### 樣式規範 (Styling Guidelines)

```svelte
<style>
  /* 使用 scoped styles */
  .game-container {
    /* 主容器 */
  }
  
  .game-button {
    /* 按鈕樣式 */
  }
</style>
```

## 📋 開發檢查清單 (Development Checklist)

### 遊戲開發階段

- [ ] **概念設計**
  - [ ] 確定遊戲類型和核心玩法
  - [ ] 繪製簡單的遊戲流程圖
  - [ ] 列出所需的功能清單

- [ ] **介面設計**
  - [ ] 設計遊戲主畫面
  - [ ] 設計操作介面
  - [ ] 規劃視覺回饋效果

- [ ] **程式實作**
  - [ ] 建立遊戲路由和頁面
  - [ ] 實作遊戲核心邏輯
  - [ ] 加入音效和視覺效果（可選）
  - [ ] 實作分數/進度系統

- [ ] **測試與除錯**
  - [ ] 功能測試
  - [ ] 邊界條件測試
  - [ ] 使用者體驗測試

- [ ] **完善與發布**
  - [ ] 加入遊戲說明
  - [ ] 優化效能
  - [ ] 建立桌面應用程式
  - [ ] 更新遊戲列表

## 🎨 視覺設計建議 (Visual Design Suggestions)

### 色彩方案 (Color Schemes)

- 使用鮮豔、對比強烈的顏色
- 參考真實廣告手遊的配色
- 每個遊戲可以有獨特的主題色

### 動畫效果 (Animation Effects)

```typescript
// 使用 Svelte transition
import { fade, fly, scale } from 'svelte/transition';

// 範例
<div in:fly="{{ y: 200, duration: 300 }}" out:fade>
  Content
</div>
```

### UI 元件建議 (UI Component Suggestions)

1. **按鈕** - 大型、明顯、有點擊回饋
2. **分數顯示** - 數字放大、有動畫效果
3. **進度條** - 視覺化進度，增加緊迫感
4. **彈出視窗** - 成就、失敗、提示等

## 📊 遊戲數據追蹤 (Game Data Tracking)

### 建議追蹤的數據

- 遊戲開始次數
- 最高分數
- 遊玩時長
- 完成率

### 實作方式

```typescript
// 使用 localStorage
interface GameStats {
  plays: number;
  highScore: number;
  totalTime: number;
}

function saveStats(gameId: string, stats: GameStats) {
  localStorage.setItem(`game-${gameId}-stats`, JSON.stringify(stats));
}

function loadStats(gameId: string): GameStats {
  const data = localStorage.getItem(`game-${gameId}-stats`);
  return data ? JSON.parse(data) : { plays: 0, highScore: 0, totalTime: 0 };
}
```

## 🚀 發布流程 (Release Workflow)

### 1. 開發完成

- 確認所有功能正常運作
- 完成程式碼檢查: `npm run check`
- 測試遊戲完整流程

### 2. 建置應用

```bash
# 建置前端
npm run build

# 建置 Tauri 應用程式
npm run tauri build
```

### 3. 版本管理

- 為每個遊戲建立 Git 標籤
- 遵循語意化版本控制（Semantic Versioning）
- 更新 CHANGELOG

### 4. 文件更新

- 更新首頁的遊戲列表
- 為新遊戲撰寫簡短說明
- 截圖或錄製遊戲畫面

## 💡 創意靈感來源 (Creative Inspiration Sources)

### 觀察來源

1. **社交媒體廣告**
   - Facebook、Instagram 上的遊戲廣告
   - YouTube 前置廣告

2. **實際手遊**
   - App Store / Google Play 熱門遊戲
   - 新興遊戲趨勢

3. **迷因文化**
   - 網路迷因
   - 流行梗圖

### 創意發想方法

- 誇張化常見遊戲機制
- 諷刺性模仿
- 結合多個遊戲類型
- 加入意想不到的元素

## 📚 學習資源 (Learning Resources)

### Svelte 相關

- [Svelte Tutorial](https://svelte.dev/tutorial)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte Examples](https://svelte.dev/examples)

### 遊戲開發

- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [HTML5 Game Development](https://developer.mozilla.org/en-US/docs/Games)

### 視覺設計

- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Svelte Transitions](https://svelte.dev/docs/svelte-transition)

## 🎯 遊戲品質標準 (Quality Standards)

### 必備要素

- ✅ 遊戲可以完整遊玩
- ✅ 有明確的目標和結束條件
- ✅ 視覺回饋流暢
- ✅ 沒有嚴重的 bug

### 加分要素

- 🌟 有音效或背景音樂
- 🌟 有分數或成就系統
- 🌟 有教學或提示
- 🌟 視覺效果豐富

## 🔄 迭代改進 (Iterative Improvement)

### 收集回饋

- 記錄遊玩者的反應
- 觀察哪些機制最受歡迎
- 了解技術實作上的困難點

### 持續優化

- 建立可重用的元件庫
- 改進開發流程
- 提升程式碼品質

---

**記住**: 重點是快速開發和有趣，不要追求完美！

**Remember**: The focus is on rapid development and fun, not perfection!

🎮 開始創作你的第一款遊戲吧！ (Start creating your first game!)
