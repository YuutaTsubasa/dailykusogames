/**
 * 關卡資料 (Level Data)
 * 
 * Contains 10 example levels for the Puzzle Escape game with progressive difficulty:
 * - Levels 1-3: Tutorial levels (basic navigation)
 * - Levels 4-7: Intermediate levels (obstacles + simple mechanisms)
 * - Levels 8-10: Advanced levels (multiple mechanisms and complex interactions)
 */

import type { LevelConfig } from '../types/level';

export const levels: LevelConfig[] = [
  // ===== 教學關卡 (Tutorial Levels) =====
  
  // Level 1: 基礎移動 (Basic Movement)
  {
    id: 1,
    name: "第一步",
    nameEn: "First Steps",
    description: "學習基本移動，從起點到達終點",
    descriptionEn: "Learn basic movement, reach the goal from start",
    difficulty: 1,
    width: 5,
    height: 5,
    player: { x: 0, y: 0 },
    goal: { x: 4, y: 4 },
    obstacles: [],
    mechanisms: [],
    hints: ["使用方向鍵或拖曳方塊移動", "目標是到達黃色的終點"]
  },

  // Level 2: 簡單障礙 (Simple Obstacles)
  {
    id: 2,
    name: "繞過障礙",
    nameEn: "Avoid Obstacles",
    description: "學習繞過牆壁障礙物",
    descriptionEn: "Learn to navigate around wall obstacles",
    difficulty: 1,
    width: 6,
    height: 6,
    player: { x: 0, y: 0 },
    goal: { x: 5, y: 5 },
    obstacles: [
      { type: 'wall', x: 2, y: 0, height: 4 },
      { type: 'wall', x: 3, y: 2, width: 3 }
    ],
    mechanisms: [],
    hints: ["黑色方塊是牆壁，無法穿越", "找到繞過障礙的路徑"]
  },

  // Level 3: 多重障礙迷宮 (Multiple Obstacles Maze)
  {
    id: 3,
    name: "小型迷宮",
    nameEn: "Mini Maze",
    description: "在簡單的迷宮中找到出路",
    descriptionEn: "Find your way through a simple maze",
    difficulty: 2,
    width: 7,
    height: 7,
    player: { x: 0, y: 0 },
    goal: { x: 6, y: 6 },
    obstacles: [
      { type: 'wall', x: 1, y: 0, height: 5 },
      { type: 'wall', x: 2, y: 2, width: 3 },
      { type: 'wall', x: 5, y: 0, height: 4 },
      { type: 'wall', x: 3, y: 4, width: 2 },
      { type: 'block', x: 4, y: 6 }
    ],
    mechanisms: [],
    hints: ["仔細觀察，找到唯一的路徑", "迷宮總有解法"]
  },

  // ===== 中級關卡 (Intermediate Levels) =====

  // Level 4: 推動滑塊 (Push Slider)
  {
    id: 4,
    name: "推開障礙",
    nameEn: "Push Away",
    description: "學習推動滑塊開闢道路",
    descriptionEn: "Learn to push sliders to clear the path",
    difficulty: 2,
    width: 8,
    height: 6,
    player: { x: 0, y: 2 },
    goal: { x: 7, y: 2 },
    obstacles: [
      { type: 'wall', x: 0, y: 0, width: 8 },
      { type: 'wall', x: 0, y: 5, width: 8 },
      { type: 'wall', x: 0, y: 1, height: 4 },
      { type: 'wall', x: 7, y: 1, height: 4 }
    ],
    mechanisms: [
      { 
        id: 'slider1',
        type: 'slider', 
        x: 3, 
        y: 2, 
        direction: 'horizontal',
        length: 2 
      }
    ],
    hints: ["藍色滑塊可以推動", "推動滑塊為自己開路"]
  },

  // Level 5: 滑塊與牆壁 (Slider and Walls)
  {
    id: 5,
    name: "策略推動",
    nameEn: "Strategic Push",
    description: "在有限空間內推動滑塊",
    descriptionEn: "Push sliders in limited space",
    difficulty: 3,
    width: 8,
    height: 8,
    player: { x: 1, y: 1 },
    goal: { x: 6, y: 6 },
    obstacles: [
      { type: 'wall', x: 3, y: 0, height: 4 },
      { type: 'wall', x: 0, y: 4, width: 4 },
      { type: 'wall', x: 4, y: 4, width: 4 },
      { type: 'block', x: 2, y: 5 },
      { type: 'block', x: 5, y: 2 }
    ],
    mechanisms: [
      { 
        id: 'slider2',
        type: 'slider', 
        x: 1, 
        y: 3, 
        direction: 'vertical',
        length: 2 
      },
      { 
        id: 'slider3',
        type: 'slider', 
        x: 5, 
        y: 5, 
        direction: 'horizontal',
        length: 1 
      }
    ],
    hints: ["思考推動順序很重要", "不要把滑塊推到死角"]
  },

  // Level 6: 開關與閘門 (Switch and Gate)
  {
    id: 6,
    name: "觸發機關",
    nameEn: "Trigger Mechanism",
    description: "踩踏開關開啟閘門",
    descriptionEn: "Step on switches to open gates",
    difficulty: 3,
    width: 9,
    height: 7,
    player: { x: 1, y: 3 },
    goal: { x: 7, y: 3 },
    obstacles: [
      { type: 'wall', x: 0, y: 0, width: 9 },
      { type: 'wall', x: 0, y: 6, width: 9 },
      { type: 'wall', x: 0, y: 1, height: 5 },
      { type: 'wall', x: 8, y: 1, height: 5 }
    ],
    mechanisms: [
      { 
        id: 'switch1',
        type: 'switch', 
        x: 2, 
        y: 1,
        active: false,
        linkedTo: 'gate1'
      },
      { 
        id: 'gate1',
        type: 'gate', 
        x: 4, 
        y: 2,
        direction: 'vertical',
        length: 3,
        active: true  // 初始關閉 (Initially closed)
      }
    ],
    hints: ["綠色開關可以踩踏觸發", "觸發開關會開啟紅色閘門"]
  },

  // Level 7: 組合機關 (Combined Mechanisms)
  {
    id: 7,
    name: "組合挑戰",
    nameEn: "Combined Challenge",
    description: "結合推動與開關機制",
    descriptionEn: "Combine pushing and switch mechanisms",
    difficulty: 4,
    width: 10,
    height: 8,
    player: { x: 1, y: 1 },
    goal: { x: 8, y: 6 },
    obstacles: [
      { type: 'wall', x: 3, y: 0, height: 5 },
      { type: 'wall', x: 6, y: 3, height: 5 },
      { type: 'block', x: 5, y: 1 },
      { type: 'block', x: 2, y: 6 }
    ],
    mechanisms: [
      { 
        id: 'slider4',
        type: 'slider', 
        x: 4, 
        y: 2, 
        direction: 'horizontal',
        length: 2 
      },
      { 
        id: 'switch2',
        type: 'switch', 
        x: 1, 
        y: 4,
        active: false,
        linkedTo: 'gate2'
      },
      { 
        id: 'gate2',
        type: 'gate', 
        x: 4, 
        y: 5,
        direction: 'horizontal',
        length: 2,
        active: true
      }
    ],
    hints: ["先推動滑塊", "再踩開關開門", "規劃好移動路線"]
  },

  // ===== 高級關卡 (Advanced Levels) =====

  // Level 8: 多重開關 (Multiple Switches)
  {
    id: 8,
    name: "雙重鎖鏈",
    nameEn: "Double Lock",
    description: "需要觸發兩個開關才能通過",
    descriptionEn: "Need to trigger two switches to pass",
    difficulty: 4,
    width: 11,
    height: 9,
    player: { x: 1, y: 4 },
    goal: { x: 9, y: 4 },
    obstacles: [
      { type: 'wall', x: 3, y: 1, height: 7 },
      { type: 'wall', x: 7, y: 1, height: 7 },
      { type: 'block', x: 5, y: 2 },
      { type: 'block', x: 5, y: 6 }
    ],
    mechanisms: [
      { 
        id: 'switch3',
        type: 'switch', 
        x: 1, 
        y: 1,
        active: false,
        linkedTo: 'gate3'
      },
      { 
        id: 'switch4',
        type: 'switch', 
        x: 1, 
        y: 7,
        active: false,
        linkedTo: 'gate4'
      },
      { 
        id: 'gate3',
        type: 'gate', 
        x: 4, 
        y: 3,
        direction: 'horizontal',
        length: 3,
        active: true
      },
      { 
        id: 'gate4',
        type: 'gate', 
        x: 4, 
        y: 5,
        direction: 'horizontal',
        length: 3,
        active: true
      },
      { 
        id: 'slider5',
        type: 'slider', 
        x: 5, 
        y: 4, 
        direction: 'horizontal',
        length: 1 
      }
    ],
    hints: ["兩個開關都需要觸發", "注意滑塊可能擋路", "記得觸發順序"]
  },

  // Level 9: 複雜路徑 (Complex Path)
  {
    id: 9,
    name: "迷宮機關",
    nameEn: "Maze Mechanism",
    description: "在複雜迷宮中操作多個機關",
    descriptionEn: "Operate multiple mechanisms in complex maze",
    difficulty: 5,
    width: 12,
    height: 10,
    player: { x: 1, y: 1 },
    goal: { x: 10, y: 8 },
    obstacles: [
      { type: 'wall', x: 3, y: 0, height: 6 },
      { type: 'wall', x: 6, y: 4, height: 6 },
      { type: 'wall', x: 9, y: 0, height: 5 },
      { type: 'wall', x: 0, y: 5, width: 3 },
      { type: 'wall', x: 4, y: 2, width: 2 },
      { type: 'block', x: 7, y: 2 },
      { type: 'block', x: 2, y: 8 },
      { type: 'block', x: 8, y: 6 }
    ],
    mechanisms: [
      { 
        id: 'slider6',
        type: 'slider', 
        x: 4, 
        y: 6, 
        direction: 'vertical',
        length: 2 
      },
      { 
        id: 'slider7',
        type: 'slider', 
        x: 7, 
        y: 3, 
        direction: 'horizontal',
        length: 2 
      },
      { 
        id: 'switch5',
        type: 'switch', 
        x: 1, 
        y: 3,
        active: false,
        linkedTo: 'gate5'
      },
      { 
        id: 'gate5',
        type: 'gate', 
        x: 4, 
        y: 8,
        direction: 'horizontal',
        length: 2,
        active: true
      }
    ],
    hints: ["這是個大迷宮", "仔細觀察所有機關的位置", "規劃最短路徑"]
  },

  // Level 10: 終極挑戰 (Ultimate Challenge)
  {
    id: 10,
    name: "終極考驗",
    nameEn: "Ultimate Test",
    description: "所有機制的綜合運用",
    descriptionEn: "Comprehensive use of all mechanisms",
    difficulty: 5,
    width: 13,
    height: 11,
    player: { x: 1, y: 5 },
    goal: { x: 11, y: 5 },
    obstacles: [
      { type: 'wall', x: 3, y: 0, height: 11 },
      { type: 'wall', x: 9, y: 0, height: 11 },
      { type: 'wall', x: 4, y: 3, width: 2 },
      { type: 'wall', x: 4, y: 7, width: 2 },
      { type: 'wall', x: 7, y: 3, width: 2 },
      { type: 'wall', x: 7, y: 7, width: 2 },
      { type: 'block', x: 6, y: 1 },
      { type: 'block', x: 6, y: 9 },
      { type: 'block', x: 5, y: 5 }
    ],
    mechanisms: [
      { 
        id: 'slider8',
        type: 'slider', 
        x: 4, 
        y: 5, 
        direction: 'horizontal',
        length: 1 
      },
      { 
        id: 'slider9',
        type: 'slider', 
        x: 6, 
        y: 3, 
        direction: 'vertical',
        length: 2 
      },
      { 
        id: 'slider10',
        type: 'slider', 
        x: 6, 
        y: 6, 
        direction: 'vertical',
        length: 2 
      },
      { 
        id: 'switch6',
        type: 'switch', 
        x: 1, 
        y: 2,
        active: false,
        linkedTo: 'gate6'
      },
      { 
        id: 'switch7',
        type: 'switch', 
        x: 1, 
        y: 8,
        active: false,
        linkedTo: 'gate7'
      },
      { 
        id: 'gate6',
        type: 'gate', 
        x: 10, 
        y: 3,
        direction: 'vertical',
        length: 2,
        active: true
      },
      { 
        id: 'gate7',
        type: 'gate', 
        x: 10, 
        y: 6,
        direction: 'vertical',
        length: 2,
        active: true
      }
    ],
    hints: ["最終關卡！", "所有技巧都會用到", "耐心思考每一步", "你可以的！"],
    moveLimit: 100  // 移動步數限制 (Move limit for extra challenge)
  }
];
