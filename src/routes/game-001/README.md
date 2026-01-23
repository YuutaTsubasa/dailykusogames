# 解謎挑戰 Puzzle Escape

一款以純幾何圖形為主的解謎遊戲，作為 Daily Kusogames 專案的首發作品。

A geometric puzzle escape game, the first release of the Daily Kusogames project.

## 遊戲概述 (Game Overview)

玩家操控一個藍色方塊從起點到達黃色終點，過程中需要：
- 避開障礙物
- 推動滑塊
- 觸發開關
- 開啟閘門

Players control a blue square to reach the yellow goal, navigating through:
- Obstacles
- Pushable sliders
- Switches
- Gates

## 遊戲特色 (Features)

- 🎮 **10 個關卡** - 從簡單到困難的漸進式設計
- 🧩 **多種機關** - 滑塊、開關、閘門等互動元素
- ⌨️ **雙重操作** - 支援鍵盤方向鍵或 WASD 操作
- 📊 **進度追蹤** - 記錄移動次數和完成時間
- 🎨 **純幾何視覺** - 簡約的幾何圖形設計

## 關卡結構 (Level Structure)

### 教學關卡 (Tutorial Levels) - 關卡 1-3
1. **第一步** - 基礎移動教學
2. **繞過障礙** - 學習避開牆壁
3. **小型迷宮** - 簡單的迷宮導航

### 中級關卡 (Intermediate Levels) - 關卡 4-7
4. **推開障礙** - 學習推動滑塊
5. **策略推動** - 在有限空間內推動
6. **觸發機關** - 使用開關控制閘門
7. **組合挑戰** - 結合多種機制

### 高級關卡 (Advanced Levels) - 關卡 8-10
8. **雙重鎖鏈** - 多個開關協作
9. **迷宮機關** - 複雜迷宮中的機關操作
10. **終極考驗** - 所有機制的綜合運用（含移動步數限制）

## 操作說明 (Controls)

- **移動** - 方向鍵 ↑↓←→ 或 WASD
- **重新開始** - R 鍵或點擊「重新開始」按鈕
- **選擇關卡** - 點擊「選擇關卡」按鈕

## 遊戲元素 (Game Elements)

### 角色與目標 (Player & Goal)
- 🟦 **玩家** - 藍色方塊（可移動）
- 🟡 **終點** - 黃色圓形（目標位置）

### 障礙物 (Obstacles)
- ⬛ **牆壁** - 黑色方塊（不可穿越）
- ⬛ **方塊** - 深灰色方塊（不可穿越）

### 機關 (Mechanisms)
- 🔲 **滑塊** - 灰色方塊（可推動）
- 🟢 **開關** - 綠色圓形（可踩踏觸發）
- 🟥 **閘門** - 紅色方塊（由開關控制開閉）

## 技術規格 (Technical Specifications)

### 關卡資料格式 (Level Data Format)

關卡資料以 TypeScript/JSON 格式定義，範例如下：

```typescript
{
  id: 1,                        // 關卡編號
  name: "第一步",               // 關卡名稱（中文）
  nameEn: "First Steps",        // 關卡名稱（英文）
  description: "...",           // 關卡描述
  difficulty: 1,                // 難度 1-5
  width: 5,                     // 地圖寬度（格子數）
  height: 5,                    // 地圖高度（格子數）
  player: { x: 0, y: 0 },      // 玩家起點
  goal: { x: 4, y: 4 },        // 終點位置
  obstacles: [                  // 障礙物列表
    { type: 'wall', x: 3, y: 3 }
  ],
  mechanisms: [                 // 機關列表
    { 
      type: 'slider', 
      x: 4, 
      y: 5, 
      direction: 'horizontal',
      length: 2 
    }
  ]
}
```

### 檔案結構 (File Structure)

```
game-001/
├── +page.svelte           # 主遊戲頁面
├── README.md              # 說明文件
├── types/
│   └── level.ts          # 型別定義
├── data/
│   └── levels.ts         # 關卡資料（10 關）
└── utils/
    └── gameLogic.ts      # 遊戲邏輯工具
```

### 核心功能 (Core Features)

1. **碰撞檢測** - 檢查玩家與障礙物、機關的碰撞
2. **滑塊推動** - 計算滑塊可推動的方向和位置
3. **開關機制** - 踩踏開關觸發閘門開閉
4. **移動驗證** - 確保移動的有效性
5. **歷史記錄** - 追蹤玩家的移動歷史

## 未來擴充 (Future Enhancements)

關卡資料結構已預留擴充欄位：

- `hints` - 提示系統
- `timeLimit` - 時間限制
- `moveLimit` - 移動步數限制
- `collectibles` - 可收集物品
- `enemies` - 移動敵人

## 開發資訊 (Development Info)

- **框架** - Svelte 5 + TypeScript
- **視覺** - 純 CSS 幾何圖形
- **無依賴** - 不需要額外的遊戲引擎
- **響應式** - 支援不同螢幕尺寸

## 遊戲目標達成條件 (Win Condition)

玩家方塊到達終點位置即為過關。每關會顯示：
- 移動次數
- 完成時間
- 是否達成完美通關（步數限制內完成）

---

**享受遊戲！Good luck!** 🎮✨
