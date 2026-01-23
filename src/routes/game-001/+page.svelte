<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { LevelConfig, Position, Mechanism } from './types/level';
  import { levels } from './data/levels';
  import { 
    isValidMove, 
    tryPushSlider, 
    triggerSwitch, 
    hasReachedGoal,
    isCollidingWithMechanism,
    isSamePosition
  } from './utils/gameLogic';
  
  // Game state
  let currentLevelIndex = $state(0);
  let currentLevel: LevelConfig = $state(levels[0]);
  let playerPosition: Position = $state({ ...currentLevel.player });
  let mechanisms: Mechanism[] = $state([...currentLevel.mechanisms]);
  let moves = $state(0);
  let timeElapsed = $state(0);
  let gameCompleted = $state(false);
  let showLevelSelect = $state(false);
  let showInstructions = $state(true);
  
  // Grid size in pixels
  const CELL_SIZE = 50;
  
  let timer: NodeJS.Timeout | null = null;
  
  // Initialize timer
  onMount(() => {
    timer = setInterval(() => {
      if (!gameCompleted) {
        timeElapsed++;
      }
    }, 1000);
  });
  
  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
  
  // Load level
  function loadLevel(index: number) {
    if (index < 0 || index >= levels.length) return;
    
    currentLevelIndex = index;
    currentLevel = levels[index];
    playerPosition = { ...currentLevel.player };
    mechanisms = [...currentLevel.mechanisms];
    moves = 0;
    timeElapsed = 0;
    gameCompleted = false;
    showLevelSelect = false;
    
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      if (!gameCompleted) {
        timeElapsed++;
      }
    }, 1000);
  }
  
  // Handle keyboard input
  function handleKeyDown(event: KeyboardEvent) {
    if (gameCompleted || showLevelSelect) return;
    
    let newPos: Position = { ...playerPosition };
    
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        newPos.y--;
        event.preventDefault();
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        newPos.y++;
        event.preventDefault();
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        newPos.x--;
        event.preventDefault();
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        newPos.x++;
        event.preventDefault();
        break;
      case 'r':
      case 'R':
        loadLevel(currentLevelIndex);
        event.preventDefault();
        return;
      default:
        return;
    }
    
    tryMove(newPos);
  }
  
  // Try to move player
  function tryMove(newPos: Position) {
    // Check for slider collision and try to push
    let sliderToPush: Mechanism | null = null;
    for (const mech of mechanisms) {
      if (mech.type === 'slider' && isCollidingWithMechanism(newPos, mech)) {
        sliderToPush = mech;
        break;
      }
    }
    
    if (sliderToPush) {
      // Try to push the slider
      const pushResult = tryPushSlider(playerPosition, newPos, sliderToPush, currentLevel, mechanisms);
      if (pushResult.success && pushResult.newSliderPos) {
        // Update slider position
        mechanisms = mechanisms.map(mech => 
          mech.id === sliderToPush!.id 
            ? { ...mech, ...pushResult.newSliderPos }
            : mech
        );
        // Move player
        playerPosition = newPos;
        moves++;
      }
      return;
    }
    
    // Check for switch
    for (const mech of mechanisms) {
      if (mech.type === 'switch' && isSamePosition(newPos, { x: mech.x, y: mech.y })) {
        mechanisms = triggerSwitch(mech, mechanisms);
        playerPosition = newPos;
        moves++;
        return;
      }
    }
    
    // Normal move
    const moveResult = isValidMove(playerPosition, newPos, currentLevel, mechanisms);
    if (moveResult.valid) {
      playerPosition = newPos;
      moves++;
      
      // Check if reached goal
      if (hasReachedGoal(playerPosition, currentLevel.goal)) {
        gameCompleted = true;
        if (timer) clearInterval(timer);
      }
    }
  }
  
  // Next level
  function nextLevel() {
    if (currentLevelIndex < levels.length - 1) {
      loadLevel(currentLevelIndex + 1);
    }
  }
  
  // Previous level
  function prevLevel() {
    if (currentLevelIndex > 0) {
      loadLevel(currentLevelIndex - 1);
    }
  }
  
  // Format time
  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="game-container">
  <!-- Header -->
  <header class="game-header">
    <h1>解謎挑戰 Puzzle Escape</h1>
    <div class="level-info">
      <span class="level-number">關卡 {currentLevel.id}</span>
      <span class="level-name">{currentLevel.name}</span>
      <span class="difficulty">難度: {'★'.repeat(currentLevel.difficulty)}</span>
    </div>
  </header>

  <!-- Instructions overlay -->
  {#if showInstructions}
    <div class="instructions-overlay" onclick={() => showInstructions = false}>
      <div class="instructions-content" onclick={(e) => e.stopPropagation()}>
        <h2>遊戲說明</h2>
        <div class="instructions-grid">
          <div class="instruction-item">
            <div class="player-icon"></div>
            <p>藍色方塊：你的角色</p>
          </div>
          <div class="instruction-item">
            <div class="goal-icon"></div>
            <p>黃色方塊：終點目標</p>
          </div>
          <div class="instruction-item">
            <div class="wall-icon"></div>
            <p>黑色方塊：牆壁障礙</p>
          </div>
          <div class="instruction-item">
            <div class="slider-icon"></div>
            <p>灰色方塊：可推動滑塊</p>
          </div>
          <div class="instruction-item">
            <div class="switch-icon"></div>
            <p>綠色圓形：可踩踏開關</p>
          </div>
          <div class="instruction-item">
            <div class="gate-icon"></div>
            <p>紅色方塊：閘門（可開關）</p>
          </div>
        </div>
        <div class="controls-info">
          <h3>操作方式</h3>
          <p>🎮 方向鍵或 WASD：移動角色</p>
          <p>🔄 R 鍵：重新開始關卡</p>
        </div>
        <button class="btn-primary" onclick={() => showInstructions = false}>開始遊戲</button>
      </div>
    </div>
  {/if}

  <!-- Level Select overlay -->
  {#if showLevelSelect}
    <div class="level-select-overlay" onclick={() => showLevelSelect = false}>
      <div class="level-select-content" onclick={(e) => e.stopPropagation()}>
        <h2>選擇關卡</h2>
        <div class="levels-grid">
          {#each levels as level, index}
            <button 
              class="level-card" 
              class:current={index === currentLevelIndex}
              onclick={() => loadLevel(index)}
            >
              <div class="level-card-number">{level.id}</div>
              <div class="level-card-name">{level.name}</div>
              <div class="level-card-difficulty">{'★'.repeat(level.difficulty)}</div>
            </button>
          {/each}
        </div>
        <button class="btn-secondary" onclick={() => showLevelSelect = false}>關閉</button>
      </div>
    </div>
  {/if}

  <!-- Game Board -->
  <div class="game-board-container">
    <div 
      class="game-board" 
      style="width: {currentLevel.width * CELL_SIZE}px; height: {currentLevel.height * CELL_SIZE}px;"
    >
      <!-- Grid background -->
      <div class="grid-background">
        {#each Array(currentLevel.height) as _, y}
          {#each Array(currentLevel.width) as _, x}
            <div 
              class="grid-cell" 
              style="left: {x * CELL_SIZE}px; top: {y * CELL_SIZE}px; width: {CELL_SIZE}px; height: {CELL_SIZE}px;"
            ></div>
          {/each}
        {/each}
      </div>

      <!-- Obstacles -->
      {#each currentLevel.obstacles as obstacle}
        <div 
          class="obstacle obstacle-{obstacle.type}" 
          style="
            left: {obstacle.x * CELL_SIZE}px; 
            top: {obstacle.y * CELL_SIZE}px; 
            width: {(obstacle.width || 1) * CELL_SIZE}px; 
            height: {(obstacle.height || 1) * CELL_SIZE}px;
          "
        ></div>
      {/each}

      <!-- Mechanisms -->
      {#each mechanisms as mechanism}
        {#if mechanism.type === 'slider'}
          <div 
            class="mechanism slider" 
            style="
              left: {mechanism.x * CELL_SIZE}px; 
              top: {mechanism.y * CELL_SIZE}px; 
              width: {(mechanism.direction === 'horizontal' ? (mechanism.length || 1) : 1) * CELL_SIZE}px; 
              height: {(mechanism.direction === 'vertical' ? (mechanism.length || 1) : 1) * CELL_SIZE}px;
            "
          ></div>
        {:else if mechanism.type === 'switch'}
          <div 
            class="mechanism switch" 
            class:active={mechanism.active}
            style="left: {mechanism.x * CELL_SIZE}px; top: {mechanism.y * CELL_SIZE}px; width: {CELL_SIZE}px; height: {CELL_SIZE}px;"
          ></div>
        {:else if mechanism.type === 'gate'}
          <div 
            class="mechanism gate" 
            class:closed={mechanism.active}
            style="
              left: {mechanism.x * CELL_SIZE}px; 
              top: {mechanism.y * CELL_SIZE}px; 
              width: {(mechanism.direction === 'horizontal' ? (mechanism.length || 1) : 1) * CELL_SIZE}px; 
              height: {(mechanism.direction === 'vertical' ? (mechanism.length || 1) : 1) * CELL_SIZE}px;
            "
          ></div>
        {/if}
      {/each}

      <!-- Goal -->
      <div 
        class="goal" 
        style="left: {currentLevel.goal.x * CELL_SIZE}px; top: {currentLevel.goal.y * CELL_SIZE}px; width: {CELL_SIZE}px; height: {CELL_SIZE}px;"
      ></div>

      <!-- Player -->
      <div 
        class="player" 
        style="left: {playerPosition.x * CELL_SIZE}px; top: {playerPosition.y * CELL_SIZE}px; width: {CELL_SIZE}px; height: {CELL_SIZE}px;"
      ></div>
    </div>
  </div>

  <!-- Stats -->
  <div class="stats">
    <div class="stat-item">
      <span class="stat-label">移動次數</span>
      <span class="stat-value">{moves}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">時間</span>
      <span class="stat-value">{formatTime(timeElapsed)}</span>
    </div>
    {#if currentLevel.moveLimit}
      <div class="stat-item">
        <span class="stat-label">步數限制</span>
        <span class="stat-value" class:warning={moves > currentLevel.moveLimit * 0.8}>
          {moves} / {currentLevel.moveLimit}
        </span>
      </div>
    {/if}
  </div>

  <!-- Controls -->
  <div class="controls">
    <button class="btn-control" onclick={() => prevLevel()} disabled={currentLevelIndex === 0}>
      ← 上一關
    </button>
    <button class="btn-control" onclick={() => loadLevel(currentLevelIndex)}>
      🔄 重新開始
    </button>
    <button class="btn-control" onclick={() => showLevelSelect = true}>
      📋 選擇關卡
    </button>
    <button class="btn-control" onclick={() => showInstructions = true}>
      ❓ 說明
    </button>
    <button class="btn-control" onclick={() => nextLevel()} disabled={currentLevelIndex === levels.length - 1}>
      下一關 →
    </button>
  </div>

  <!-- Victory Screen -->
  {#if gameCompleted}
    <div class="victory-overlay">
      <div class="victory-content">
        <h2>🎉 恭喜過關！</h2>
        <div class="victory-stats">
          <p>移動次數: <strong>{moves}</strong></p>
          <p>完成時間: <strong>{formatTime(timeElapsed)}</strong></p>
          {#if currentLevel.moveLimit && moves <= currentLevel.moveLimit}
            <p class="perfect">⭐ 完美通關！</p>
          {/if}
        </div>
        <div class="victory-buttons">
          <button class="btn-primary" onclick={() => loadLevel(currentLevelIndex)}>
            🔄 再玩一次
          </button>
          {#if currentLevelIndex < levels.length - 1}
            <button class="btn-primary" onclick={() => nextLevel()}>
              ➡️ 下一關
            </button>
          {:else}
            <p class="all-complete">🏆 你已完成所有關卡！</p>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .game-container {
    min-height: 100vh;
    background: linear-gradient(to bottom, #0a0e1a, #000000);
    color: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .game-header {
    text-align: center;
  }

  .game-header h1 {
    font-size: 2.5rem;
    margin: 0 0 1rem 0;
    color: #4d50ff;
    text-shadow: 0 0 20px rgba(77, 80, 255, 0.5);
  }

  .level-info {
    display: flex;
    gap: 2rem;
    justify-content: center;
    font-size: 1.1rem;
  }

  .level-number {
    color: #f9fa1f;
    font-weight: bold;
  }

  .level-name {
    color: #ffffff;
  }

  .difficulty {
    color: #ff6b6b;
  }

  .game-board-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }

  .game-board {
    position: relative;
    background: rgba(26, 31, 46, 0.8);
    border: 3px solid #4d50ff;
    box-shadow: 0 0 30px rgba(77, 80, 255, 0.3);
    border-radius: 8px;
  }

  .grid-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .grid-cell {
    position: absolute;
    border: 1px solid rgba(77, 80, 255, 0.1);
  }

  .player {
    position: absolute;
    background: linear-gradient(135deg, #4d50ff, #171bf9);
    border: 2px solid #ffffff;
    border-radius: 4px;
    transition: all 0.2s ease;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(77, 80, 255, 0.5);
  }

  .goal {
    position: absolute;
    background: linear-gradient(135deg, #f9fa1f, #e0e11c);
    border: 2px solid #ffffff;
    border-radius: 50%;
    z-index: 1;
    box-shadow: 0 0 20px rgba(249, 250, 31, 0.6);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .obstacle {
    position: absolute;
    background: #1a1f2e;
    border: 2px solid #000000;
    border-radius: 4px;
    z-index: 2;
  }

  .obstacle-wall {
    background: linear-gradient(135deg, #2a2f3e, #1a1f2e);
  }

  .obstacle-block {
    background: linear-gradient(135deg, #3a3f4e, #2a2f3e);
  }

  .mechanism {
    position: absolute;
    z-index: 3;
    transition: all 0.3s ease;
  }

  .slider {
    background: linear-gradient(135deg, #666, #888);
    border: 2px solid #aaa;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .switch {
    background: linear-gradient(135deg, #4caf50, #45a049);
    border: 2px solid #ffffff;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(76, 175, 80, 0.5);
  }

  .switch.active {
    background: linear-gradient(135deg, #8bc34a, #7cb342);
    box-shadow: 0 0 20px rgba(139, 195, 74, 0.8);
  }

  .gate {
    background: linear-gradient(135deg, #ff4444, #cc0000);
    border: 2px solid #ffffff;
    border-radius: 4px;
    opacity: 0.3;
    transition: opacity 0.3s ease;
  }

  .gate.closed {
    opacity: 1;
    box-shadow: 0 0 15px rgba(255, 68, 68, 0.5);
  }

  .stats {
    display: flex;
    gap: 2rem;
    padding: 1rem 2rem;
    background: rgba(26, 31, 46, 0.8);
    border: 2px solid rgba(77, 80, 255, 0.3);
    border-radius: 8px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #9ca3af;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #4d50ff;
  }

  .stat-value.warning {
    color: #ff6b6b;
  }

  .controls {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-control {
    padding: 0.75rem 1.5rem;
    background: rgba(77, 80, 255, 0.2);
    border: 2px solid #4d50ff;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .btn-control:hover:not(:disabled) {
    background: rgba(77, 80, 255, 0.4);
    box-shadow: 0 0 15px rgba(77, 80, 255, 0.5);
  }

  .btn-control:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .btn-primary {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #4d50ff, #171bf9);
    border: 2px solid #ffffff;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: bold;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(77, 80, 255, 0.6);
  }

  .btn-secondary {
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid #ffffff;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
  }

  .instructions-overlay,
  .level-select-overlay,
  .victory-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .instructions-content,
  .level-select-content,
  .victory-content {
    background: linear-gradient(135deg, #1a1f2e, #0a0e1a);
    padding: 2rem;
    border-radius: 16px;
    border: 3px solid #4d50ff;
    box-shadow: 0 0 40px rgba(77, 80, 255, 0.5);
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .instructions-content h2,
  .level-select-content h2,
  .victory-content h2 {
    text-align: center;
    color: #4d50ff;
    margin-bottom: 1.5rem;
  }

  .instructions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .instruction-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    background: rgba(77, 80, 255, 0.1);
    border-radius: 8px;
  }

  .player-icon {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #4d50ff, #171bf9);
    border: 2px solid #ffffff;
    border-radius: 4px;
  }

  .goal-icon {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #f9fa1f, #e0e11c);
    border: 2px solid #ffffff;
    border-radius: 50%;
  }

  .wall-icon {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #2a2f3e, #1a1f2e);
    border: 2px solid #000000;
    border-radius: 4px;
  }

  .slider-icon {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #666, #888);
    border: 2px solid #aaa;
    border-radius: 4px;
  }

  .switch-icon {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #4caf50, #45a049);
    border: 2px solid #ffffff;
    border-radius: 50%;
  }

  .gate-icon {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #ff4444, #cc0000);
    border: 2px solid #ffffff;
    border-radius: 4px;
  }

  .controls-info {
    background: rgba(77, 80, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  .controls-info h3 {
    margin-top: 0;
    color: #f9fa1f;
  }

  .controls-info p {
    margin: 0.5rem 0;
  }

  .levels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .level-card {
    padding: 1rem;
    background: rgba(77, 80, 255, 0.1);
    border: 2px solid #4d50ff;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: white;
  }

  .level-card:hover {
    background: rgba(77, 80, 255, 0.3);
    transform: scale(1.05);
  }

  .level-card.current {
    background: rgba(249, 250, 31, 0.2);
    border-color: #f9fa1f;
  }

  .level-card-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #4d50ff;
  }

  .level-card.current .level-card-number {
    color: #f9fa1f;
  }

  .level-card-name {
    font-size: 0.9rem;
  }

  .level-card-difficulty {
    font-size: 0.8rem;
    color: #ff6b6b;
  }

  .victory-stats {
    text-align: center;
    margin: 1.5rem 0;
    font-size: 1.1rem;
  }

  .victory-stats p {
    margin: 0.5rem 0;
  }

  .victory-stats .perfect {
    color: #f9fa1f;
    font-size: 1.3rem;
    margin-top: 1rem;
  }

  .victory-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .all-complete {
    text-align: center;
    color: #f9fa1f;
    font-size: 1.2rem;
    margin: 1rem 0;
  }

  @media (max-width: 768px) {
    .game-container {
      padding: 1rem;
    }

    .game-header h1 {
      font-size: 1.8rem;
    }

    .level-info {
      flex-direction: column;
      gap: 0.5rem;
    }

    .stats {
      flex-direction: column;
      gap: 1rem;
    }

    .controls {
      width: 100%;
    }

    .btn-control {
      flex: 1;
      min-width: 120px;
    }

    .instructions-grid {
      grid-template-columns: 1fr;
    }

    .levels-grid {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }
  }
</style>
