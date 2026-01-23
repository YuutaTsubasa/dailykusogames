/**
 * 關卡資料類型定義 (Level Data Type Definitions)
 * 
 * This file defines the data structure for puzzle escape game levels.
 * All levels are stored in JSON format following this schema.
 */

/**
 * 位置座標 (Position Coordinates)
 */
export interface Position {
  x: number; // X 座標 (X coordinate in grid units)
  y: number; // Y 座標 (Y coordinate in grid units)
}

/**
 * 障礙物類型 (Obstacle Types)
 */
export type ObstacleType = 
  | 'wall'      // 牆壁 - 固定障礙物 (Wall - Fixed obstacle)
  | 'block';    // 方塊 - 固定障礙物 (Block - Fixed obstacle)

/**
 * 機關類型 (Mechanism Types)
 */
export type MechanismType = 
  | 'slider'    // 滑動方塊 - 可推動的障礙 (Slider - Pushable obstacle)
  | 'rotator'   // 旋轉線 - 可旋轉的障礙 (Rotator - Rotatable obstacle)
  | 'switch'    // 開關 - 觸發後改變狀態 (Switch - Toggles state when triggered)
  | 'gate';     // 閘門 - 由開關控制 (Gate - Controlled by switches)

/**
 * 方向 (Direction)
 */
export type Direction = 'horizontal' | 'vertical';

/**
 * 障礙物 (Obstacle)
 */
export interface Obstacle {
  type: ObstacleType;          // 類型 (Type)
  x: number;                    // X 座標 (X coordinate)
  y: number;                    // Y 座標 (Y coordinate)
  width?: number;               // 寬度，預設為 1 (Width in grid units, default 1)
  height?: number;              // 高度，預設為 1 (Height in grid units, default 1)
}

/**
 * 機關 (Mechanism)
 */
export interface Mechanism {
  id?: string;                  // 唯一識別碼 (Unique identifier)
  type: MechanismType;          // 類型 (Type)
  x: number;                    // X 座標 (X coordinate)
  y: number;                    // Y 座標 (Y coordinate)
  direction?: Direction;        // 方向，適用於 slider/rotator (Direction for slider/rotator)
  length?: number;              // 長度，適用於 slider (Length for slider)
  angle?: number;               // 角度，適用於 rotator (Angle for rotator, in degrees)
  active?: boolean;             // 是否啟動，適用於 switch/gate (Whether active, for switch/gate)
  linkedTo?: string;            // 連結的機關 ID，適用於 switch (Linked mechanism ID for switch)
}

/**
 * 關卡配置 (Level Configuration)
 */
export interface LevelConfig {
  id: number;                   // 關卡編號 (Level number)
  name: string;                 // 關卡名稱（中文）(Level name in Chinese)
  nameEn: string;               // 關卡名稱（英文）(Level name in English)
  description?: string;         // 關卡描述（中文）(Level description in Chinese)
  descriptionEn?: string;       // 關卡描述（英文）(Level description in English)
  difficulty: number;           // 難度 1-5 (Difficulty level 1-5)
  width: number;                // 關卡寬度（格子數）(Level width in grid units)
  height: number;               // 關卡高度（格子數）(Level height in grid units)
  player: Position;             // 玩家起點 (Player starting position)
  goal: Position;               // 終點 (Goal position)
  obstacles: Obstacle[];        // 障礙物列表 (List of obstacles)
  mechanisms: Mechanism[];      // 機關列表 (List of mechanisms)
  
  // 預留未來擴充欄位 (Reserved for future expansion)
  hints?: string[];             // 提示文字 (Hint texts)
  timeLimit?: number;           // 時間限制（秒）(Time limit in seconds)
  moveLimit?: number;           // 移動步數限制 (Move limit)
  collectibles?: Position[];    // 可收集物品 (Collectible items)
  enemies?: Position[];         // 敵人位置 (Enemy positions)
}

/**
 * 玩家移動歷史記錄 (Player Move History)
 */
export interface MoveHistory {
  from: Position;               // 起始位置 (Starting position)
  to: Position;                 // 目標位置 (Target position)
  timestamp: number;            // 時間戳記 (Timestamp)
  mechanismInteraction?: {      // 機關互動（如有）(Mechanism interaction if any)
    mechanismId: string;        // 機關 ID (Mechanism ID)
    action: string;             // 動作類型 (Action type)
  };
}

/**
 * 遊戲狀態 (Game State)
 */
export interface GameState {
  currentLevel: number;         // 當前關卡 (Current level)
  playerPosition: Position;     // 玩家位置 (Player position)
  moveHistory: MoveHistory[];   // 移動歷史 (Move history)
  mechanismStates: Map<string, any>; // 機關狀態 (Mechanism states)
  completed: boolean;           // 是否完成 (Whether completed)
  moves: number;                // 移動次數 (Number of moves)
  timeElapsed: number;          // 已耗時間（秒）(Time elapsed in seconds)
}
