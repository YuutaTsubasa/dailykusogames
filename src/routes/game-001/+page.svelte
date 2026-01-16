<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		getLevel,
		getCurrentLevel,
		saveCurrentLevel,
		getUnlockedLevels,
		saveUnlockedLevels,
		type Level
	} from './utils/levels';
	import {
		updateBallPhysics,
		checkBallCollisions,
		isInGoal,
		type GameObject
	} from './utils/gameLogic';

	// Game state
	let currentLevelId = $state(1);
	let currentLevel: Level | undefined = $state(undefined);
	let gameState = $state<'playing' | 'won' | 'lost' | 'menu'>('menu');
	let pins = $state<{ id: number; x: number; y: number; pulled: boolean }[]>([]);
	let balls = $state<GameObject[]>([]);
	let showLevelSelect = $state(false);
	let unlockedLevels = $state(1);

	let animationFrame: number | null = null;

	onMount(() => {
		currentLevelId = getCurrentLevel();
		unlockedLevels = getUnlockedLevels();
		loadLevel(currentLevelId);
	});

	onDestroy(() => {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
	});

	function loadLevel(levelId: number) {
		const level = getLevel(levelId);
		if (!level) return;

		currentLevel = level;
		currentLevelId = levelId;
		gameState = 'playing';

		// Initialize pins
		pins = level.pins.map((pin) => ({ ...pin, pulled: false }));

		// Initialize balls
		balls = level.balls.map((ball, index) => ({
			id: `ball-${index}`,
			x: ball.x,
			y: ball.y,
			vx: 0,
			vy: 0,
			color: ball.color,
			radius: 3,
			isMoving: false
		}));

		startGameLoop();
	}

	function startGameLoop() {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}

		function gameLoop() {
			if (gameState !== 'playing') return;

			// Update all balls
			balls = balls.map((ball) => updateBallPhysics(ball, pins));

			// Check ball-to-ball collisions
			balls = checkBallCollisions(balls);

			// Check win/lose conditions
			if (!currentLevel) return;

			const treasureBalls = balls.filter((b) => b.color === 'treasure');
			const dangerBalls = balls.filter((b) => b.color === 'danger');

			const treasuresInGoal = treasureBalls.filter((b) =>
				isInGoal(b, currentLevel!.goalX, currentLevel!.goalY)
			).length;
			const dangersInGoal = dangerBalls.filter((b) =>
				isInGoal(b, currentLevel!.goalX, currentLevel!.goalY)
			).length;

			const allStopped = balls.every((b) => !b.isMoving);
			const allPinsPulled = pins.every((p) => p.pulled);

			if (allStopped && allPinsPulled) {
				if (treasuresInGoal === treasureBalls.length && dangersInGoal === 0) {
					gameState = 'won';
					// Unlock next level
					if (currentLevelId === unlockedLevels) {
						unlockedLevels = Math.min(100, currentLevelId + 1);
						saveUnlockedLevels(unlockedLevels);
					}
				} else if (dangersInGoal > 0 || treasuresInGoal < treasureBalls.length) {
					gameState = 'lost';
				}
			}

			animationFrame = requestAnimationFrame(gameLoop);
		}

		animationFrame = requestAnimationFrame(gameLoop);
	}

	function pullPin(pinId: number) {
		if (gameState !== 'playing') return;

		const pin = pins.find((p) => p.id === pinId);
		if (!pin || pin.pulled) return;

		// Check if blocked by other pins
		const pinData = currentLevel?.pins.find((p) => p.id === pinId);
		if (pinData?.blockedBy) {
			const blockedBy = pinData.blockedBy.some((id) => !pins.find((p) => p.id === id)?.pulled);
			if (blockedBy) {
				// Pin is blocked, show feedback
				return;
			}
		}

		pin.pulled = true;
	}

	function nextLevel() {
		if (currentLevelId < 100 && currentLevelId < unlockedLevels) {
			currentLevelId++;
			saveCurrentLevel(currentLevelId);
			loadLevel(currentLevelId);
		}
	}

	function retryLevel() {
		loadLevel(currentLevelId);
	}

	function goToMenu() {
		gameState = 'menu';
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
	}

	function selectLevel(levelId: number) {
		if (levelId <= unlockedLevels) {
			currentLevelId = levelId;
			saveCurrentLevel(currentLevelId);
			loadLevel(currentLevelId);
			showLevelSelect = false;
		}
	}

	function toggleLevelSelect() {
		showLevelSelect = !showLevelSelect;
	}
</script>

<div class="game-container">
	<header class="game-header">
		<a href="/" class="back-button">← 返回首頁</a>
		<h1 class="game-title">🎯 拉針遊戲</h1>
		<div class="level-info">關卡 {currentLevelId}/100</div>
	</header>

	{#if gameState === 'menu'}
		<div class="menu-screen">
			<h2>拉針解謎遊戲</h2>
			<p class="menu-desc">拉出針，讓寶物掉進寶箱！</p>
			<p class="menu-desc">小心不要讓危險球掉進去！</p>
			<div class="menu-buttons">
				<button class="menu-btn primary" onclick={() => loadLevel(currentLevelId)}>
					繼續遊戲 (關卡 {currentLevelId})
				</button>
				<button class="menu-btn" onclick={toggleLevelSelect}> 選擇關卡 </button>
			</div>
			<div class="progress-info">
				已解鎖: {unlockedLevels}/100 關
			</div>
		</div>
	{/if}

	{#if showLevelSelect}
		<div
			class="level-select-overlay"
			role="button"
			tabindex="0"
			onclick={toggleLevelSelect}
			onkeydown={(e) => e.key === 'Escape' && toggleLevelSelect()}
		>
			<div
				class="level-select-panel"
				role="dialog"
				tabindex="-1"
				onclick={(e) => e.stopPropagation()}
				onkeydown={(e) => e.key === 'Escape' && toggleLevelSelect()}
			>
				<h3>選擇關卡</h3>
				<div class="levels-grid">
					{#each Array.from({ length: 100 }, (_, i) => i + 1) as levelNum}
						<button
							class="level-btn"
							class:unlocked={levelNum <= unlockedLevels}
							class:current={levelNum === currentLevelId}
							disabled={levelNum > unlockedLevels}
							onclick={() => selectLevel(levelNum)}
						>
							{levelNum}
						</button>
					{/each}
				</div>
				<button class="close-btn" onclick={toggleLevelSelect}>關閉</button>
			</div>
		</div>
	{/if}

	{#if gameState === 'playing'}
		<div class="game-area">
			<svg class="game-svg" viewBox="0 0 100 100">
				<!-- Goal area -->
				<circle
					cx={currentLevel?.goalX}
					cy={currentLevel?.goalY}
					r="8"
					fill="#ffd700"
					stroke="#ffaa00"
					stroke-width="0.5"
					opacity="0.6"
				/>
				<text
					x={currentLevel?.goalX}
					y={currentLevel?.goalY}
					text-anchor="middle"
					dominant-baseline="middle"
					font-size="6"
				>
					🏆
				</text>

				<!-- Pins -->
				{#each pins as pin}
					<g
						class="pin"
						class:pulled={pin.pulled}
						role="button"
						tabindex="0"
						onclick={() => pullPin(pin.id)}
						onkeydown={(e) => e.key === 'Enter' && pullPin(pin.id)}
						style="cursor: pointer;"
					>
						{#if !pin.pulled}
							<line
								x1={pin.x}
								y1={pin.y - 5}
								x2={pin.x}
								y2={pin.y + 5}
								stroke="#888"
								stroke-width="1.5"
								stroke-linecap="round"
							/>
							<circle cx={pin.x} cy={pin.y - 5} r="2" fill="#666" />
							<circle cx={pin.x} cy={pin.y + 5} r="2" fill="#666" />
						{/if}
					</g>
				{/each}

				<!-- Balls -->
				{#each balls as ball}
					<circle
						cx={ball.x}
						cy={ball.y}
						r={ball.radius}
						fill={ball.color === 'treasure' ? '#4CAF50' : '#f44336'}
						stroke={ball.color === 'treasure' ? '#2E7D32' : '#c62828'}
						stroke-width="0.5"
					>
						<animate
							attributeName="r"
							values="{ball.radius};{ball.radius * 1.1};{ball.radius}"
							dur="1s"
							repeatCount="indefinite"
						/>
					</circle>
				{/each}
			</svg>

			{#if currentLevel?.hint}
				<div class="hint">💡 {currentLevel.hint}</div>
			{/if}
		</div>

		<div class="game-controls">
			<button class="control-btn" onclick={retryLevel}>🔄 重試</button>
			<button class="control-btn" onclick={goToMenu}>📋 選單</button>
		</div>
	{/if}

	{#if gameState === 'won'}
		<div class="result-screen win">
			<div class="result-content">
				<div class="result-icon">🎉</div>
				<h2>恭喜過關！</h2>
				<p>關卡 {currentLevelId} 完成！</p>
				<div class="result-buttons">
					{#if currentLevelId < 100}
						<button class="result-btn primary" onclick={nextLevel}>
							下一關 →
						</button>
					{/if}
					<button class="result-btn" onclick={retryLevel}>重玩本關</button>
					<button class="result-btn" onclick={goToMenu}>返回選單</button>
				</div>
			</div>
		</div>
	{/if}

	{#if gameState === 'lost'}
		<div class="result-screen lose">
			<div class="result-content">
				<div class="result-icon">😢</div>
				<h2>再試一次！</h2>
				<p>寶物沒有全部進入寶箱，或危險球進入了</p>
				<div class="result-buttons">
					<button class="result-btn primary" onclick={retryLevel}>🔄 重試</button>
					<button class="result-btn" onclick={goToMenu}>返回選單</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.game-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #fff;
		display: flex;
		flex-direction: column;
	}

	.game-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
	}

	.back-button {
		color: #fff;
		text-decoration: none;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		transition: all 0.2s;
	}

	.back-button:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.game-title {
		margin: 0;
		font-size: 2rem;
	}

	.level-info {
		font-size: 1.2rem;
		font-weight: 600;
		background: rgba(255, 255, 255, 0.2);
		padding: 0.5rem 1rem;
		border-radius: 8px;
	}

	.menu-screen {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		text-align: center;
	}

	.menu-screen h2 {
		font-size: 3rem;
		margin: 0 0 1rem 0;
	}

	.menu-desc {
		font-size: 1.2rem;
		margin: 0.5rem 0;
		color: rgba(255, 255, 255, 0.9);
	}

	.menu-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 2rem;
	}

	.menu-btn {
		padding: 1rem 2rem;
		font-size: 1.2rem;
		border: none;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
		cursor: pointer;
		transition: all 0.3s;
		min-width: 300px;
	}

	.menu-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
	}

	.menu-btn.primary {
		background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
		font-weight: 600;
	}

	.menu-btn.primary:hover {
		background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
	}

	.progress-info {
		margin-top: 2rem;
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.8);
	}

	.level-select-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(5px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.level-select-panel {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		padding: 2rem;
		max-width: 90%;
		max-height: 90vh;
		overflow-y: auto;
	}

	.level-select-panel h3 {
		margin: 0 0 1.5rem 0;
		font-size: 2rem;
		text-align: center;
	}

	.levels-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.level-btn {
		aspect-ratio: 1;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.3);
	}

	.level-btn.unlocked {
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
	}

	.level-btn.unlocked:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.05);
	}

	.level-btn.current {
		background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
	}

	.level-btn:disabled {
		cursor: not-allowed;
	}

	.close-btn {
		width: 100%;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.2);
		border: none;
		border-radius: 8px;
		color: #fff;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.game-area {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}

	.game-svg {
		width: 100%;
		max-width: 600px;
		max-height: 600px;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 16px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
	}

	.pin {
		transition: opacity 0.3s;
	}

	.pin.pulled {
		opacity: 0;
	}

	.pin:hover:not(.pulled) {
		filter: brightness(1.2);
	}

	.hint {
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		font-size: 1.1rem;
	}

	.game-controls {
		display: flex;
		justify-content: center;
		gap: 1rem;
		padding: 1rem 2rem 2rem;
	}

	.control-btn {
		padding: 0.75rem 1.5rem;
		font-size: 1.1rem;
		border: none;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
		cursor: pointer;
		transition: all 0.2s;
	}

	.control-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
	}

	.result-screen {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(10px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.result-content {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 24px;
		padding: 3rem;
		text-align: center;
		max-width: 500px;
	}

	.result-screen.win .result-content {
		border-color: #4caf50;
	}

	.result-screen.lose .result-content {
		border-color: #f44336;
	}

	.result-icon {
		font-size: 5rem;
		margin-bottom: 1rem;
	}

	.result-content h2 {
		font-size: 2.5rem;
		margin: 0 0 1rem 0;
	}

	.result-content p {
		font-size: 1.2rem;
		margin: 0 0 2rem 0;
		color: rgba(255, 255, 255, 0.9);
	}

	.result-buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.result-btn {
		padding: 1rem 2rem;
		font-size: 1.1rem;
		border: none;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
		cursor: pointer;
		transition: all 0.2s;
	}

	.result-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
	}

	.result-btn.primary {
		background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
		font-weight: 600;
	}

	.result-btn.primary:hover {
		background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
	}

	@media (max-width: 768px) {
		.game-header {
			flex-direction: column;
			gap: 0.5rem;
			padding: 1rem;
		}

		.game-title {
			font-size: 1.5rem;
		}

		.menu-screen h2 {
			font-size: 2rem;
		}

		.menu-btn {
			min-width: auto;
			width: 100%;
		}

		.levels-grid {
			grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
		}
	}
</style>
