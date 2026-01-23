/**
 * 遊戲邏輯工具函式 (Game Logic Utilities)
 * 
 * Contains core game logic functions for collision detection,
 * movement validation, and mechanism interactions.
 */

import type { Position, Obstacle, Mechanism, LevelConfig, GameState } from '../types/level';

/**
 * 檢查兩個位置是否相同 (Check if two positions are the same)
 */
export function isSamePosition(pos1: Position, pos2: Position): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

/**
 * 檢查位置是否在範圍內 (Check if position is within bounds)
 */
export function isInBounds(pos: Position, width: number, height: number): boolean {
  return pos.x >= 0 && pos.x < width && pos.y >= 0 && pos.y < height;
}

/**
 * 檢查位置是否與障礙物碰撞 (Check collision with obstacle)
 */
export function isCollidingWithObstacle(pos: Position, obstacle: Obstacle): boolean {
  const obstacleWidth = obstacle.width || 1;
  const obstacleHeight = obstacle.height || 1;
  
  return pos.x >= obstacle.x && 
         pos.x < obstacle.x + obstacleWidth &&
         pos.y >= obstacle.y && 
         pos.y < obstacle.y + obstacleHeight;
}

/**
 * 檢查位置是否與機關碰撞 (Check collision with mechanism)
 */
export function isCollidingWithMechanism(pos: Position, mechanism: Mechanism): boolean {
  if (mechanism.type === 'slider') {
    const length = mechanism.length || 1;
    if (mechanism.direction === 'horizontal') {
      return pos.y === mechanism.y && 
             pos.x >= mechanism.x && 
             pos.x < mechanism.x + length;
    } else {
      return pos.x === mechanism.x && 
             pos.y >= mechanism.y && 
             pos.y < mechanism.y + length;
    }
  } else if (mechanism.type === 'gate' && mechanism.active) {
    // 只有啟動（關閉）的閘門才會碰撞 (Only active (closed) gates cause collision)
    const length = mechanism.length || 1;
    if (mechanism.direction === 'horizontal') {
      return pos.y === mechanism.y && 
             pos.x >= mechanism.x && 
             pos.x < mechanism.x + length;
    } else {
      return pos.x === mechanism.x && 
             pos.y >= mechanism.y && 
             pos.y < mechanism.y + length;
    }
  } else if (mechanism.type === 'switch') {
    return pos.x === mechanism.x && pos.y === mechanism.y;
  }
  
  return false;
}

/**
 * 檢查移動是否有效 (Check if move is valid)
 */
export function isValidMove(
  from: Position, 
  to: Position, 
  level: LevelConfig,
  mechanisms: Mechanism[]
): { valid: boolean; reason?: string } {
  // 檢查是否在範圍內 (Check bounds)
  if (!isInBounds(to, level.width, level.height)) {
    return { valid: false, reason: 'out_of_bounds' };
  }

  // 檢查障礙物碰撞 (Check obstacle collision)
  for (const obstacle of level.obstacles) {
    if (isCollidingWithObstacle(to, obstacle)) {
      return { valid: false, reason: 'obstacle' };
    }
  }

  // 檢查機關碰撞 (Check mechanism collision)
  for (const mechanism of mechanisms) {
    if (mechanism.type === 'gate' && mechanism.active) {
      // 只有關閉的閘門才阻擋 (Only closed gates block)
      if (isCollidingWithMechanism(to, mechanism)) {
        return { valid: false, reason: 'gate_closed' };
      }
    }
  }

  return { valid: true };
}

/**
 * 嘗試推動滑塊 (Try to push slider)
 */
export function tryPushSlider(
  playerPos: Position,
  targetPos: Position,
  slider: Mechanism,
  level: LevelConfig,
  mechanisms: Mechanism[]
): { success: boolean; newSliderPos?: Position } {
  if (slider.type !== 'slider') return { success: false };

  const dx = targetPos.x - playerPos.x;
  const dy = targetPos.y - playerPos.y;

  // 計算滑塊新位置 (Calculate new slider position)
  const newSliderPos: Position = {
    x: slider.x + dx,
    y: slider.y + dy
  };

  // 檢查滑塊是否可以移動到新位置 (Check if slider can move to new position)
  const sliderLength = slider.length || 1;
  
  if (slider.direction === 'horizontal') {
    // 檢查水平滑塊的所有格子 (Check all cells of horizontal slider)
    for (let i = 0; i < sliderLength; i++) {
      const checkPos: Position = { x: newSliderPos.x + i, y: newSliderPos.y };
      
      if (!isInBounds(checkPos, level.width, level.height)) {
        return { success: false };
      }

      // 檢查障礙物 (Check obstacles)
      for (const obstacle of level.obstacles) {
        if (isCollidingWithObstacle(checkPos, obstacle)) {
          return { success: false };
        }
      }

      // 檢查其他機關 (Check other mechanisms)
      for (const mech of mechanisms) {
        if (mech.id !== slider.id && isCollidingWithMechanism(checkPos, mech)) {
          return { success: false };
        }
      }
    }
  } else {
    // 檢查垂直滑塊的所有格子 (Check all cells of vertical slider)
    for (let i = 0; i < sliderLength; i++) {
      const checkPos: Position = { x: newSliderPos.x, y: newSliderPos.y + i };
      
      if (!isInBounds(checkPos, level.width, level.height)) {
        return { success: false };
      }

      // 檢查障礙物 (Check obstacles)
      for (const obstacle of level.obstacles) {
        if (isCollidingWithObstacle(checkPos, obstacle)) {
          return { success: false };
        }
      }

      // 檢查其他機關 (Check other mechanisms)
      for (const mech of mechanisms) {
        if (mech.id !== slider.id && isCollidingWithMechanism(checkPos, mech)) {
          return { success: false };
        }
      }
    }
  }

  return { success: true, newSliderPos };
}

/**
 * 觸發開關 (Trigger switch)
 */
export function triggerSwitch(
  switchMech: Mechanism,
  mechanisms: Mechanism[]
): Mechanism[] {
  if (switchMech.type !== 'switch' || !switchMech.linkedTo) {
    return mechanisms;
  }

  // 切換開關狀態 (Toggle switch state)
  const newSwitchState = !switchMech.active;

  // 更新機關列表 (Update mechanism list)
  return mechanisms.map(mech => {
    if (mech.id === switchMech.id) {
      return { ...mech, active: newSwitchState };
    } else if (mech.id === switchMech.linkedTo) {
      // 切換閘門狀態 (Toggle gate state)
      return { ...mech, active: !mech.active };
    }
    return mech;
  });
}

/**
 * 檢查是否到達終點 (Check if reached goal)
 */
export function hasReachedGoal(playerPos: Position, goal: Position): boolean {
  return isSamePosition(playerPos, goal);
}

/**
 * 初始化遊戲狀態 (Initialize game state)
 */
export function initializeGameState(level: LevelConfig): GameState {
  return {
    currentLevel: level.id,
    playerPosition: { ...level.player },
    moveHistory: [],
    mechanismStates: new Map(),
    completed: false,
    moves: 0,
    timeElapsed: 0
  };
}

/**
 * 計算方向 (Calculate direction)
 */
export function getDirection(from: Position, to: Position): { dx: number; dy: number } {
  return {
    dx: Math.sign(to.x - from.x),
    dy: Math.sign(to.y - from.y)
  };
}
