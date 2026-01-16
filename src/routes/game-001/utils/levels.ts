// Pin Pulling Game - 100 Levels
// Each level defines: pins (positions), balls (start positions), goal (target area), obstacles

export interface Pin {
	id: number;
	x: number;
	y: number;
	blockedBy?: number[]; // IDs of pins that must be pulled first
}

export interface Ball {
	x: number;
	y: number;
	color: 'treasure' | 'danger';
}

export interface Level {
	id: number;
	pins: Pin[];
	balls: Ball[];
	goalX: number;
	goalY: number;
	hint?: string;
}

// Generate 100 levels with increasing difficulty
export const levels: Level[] = [
	// Levels 1-10: Tutorial levels (very easy)
	{
		id: 1,
		pins: [{ id: 1, x: 50, y: 40 }],
		balls: [{ x: 50, y: 20, color: 'treasure' }],
		goalX: 50,
		goalY: 80,
		hint: '點擊拉針讓寶物掉落！'
	},
	{
		id: 2,
		pins: [
			{ id: 1, x: 30, y: 40 },
			{ id: 2, x: 70, y: 40 }
		],
		balls: [{ x: 50, y: 20, color: 'treasure' }],
		goalX: 50,
		goalY: 80,
		hint: '先拉左邊或右邊的針'
	},
	{
		id: 3,
		pins: [
			{ id: 1, x: 50, y: 30 },
			{ id: 2, x: 50, y: 50 }
		],
		balls: [{ x: 50, y: 15, color: 'treasure' }],
		goalX: 50,
		goalY: 80
	},
	{
		id: 4,
		pins: [
			{ id: 1, x: 40, y: 35 },
			{ id: 2, x: 60, y: 35 }
		],
		balls: [
			{ x: 50, y: 20, color: 'treasure' },
			{ x: 30, y: 50, color: 'danger' }
		],
		goalX: 50,
		goalY: 80,
		hint: '小心紅色的危險球！'
	},
	{
		id: 5,
		pins: [
			{ id: 1, x: 35, y: 40 },
			{ id: 2, x: 65, y: 40 },
			{ id: 3, x: 50, y: 55 }
		],
		balls: [{ x: 50, y: 25, color: 'treasure' }],
		goalX: 50,
		goalY: 80
	},
	{
		id: 6,
		pins: [
			{ id: 1, x: 30, y: 35 },
			{ id: 2, x: 50, y: 35 },
			{ id: 3, x: 70, y: 35 }
		],
		balls: [
			{ x: 40, y: 20, color: 'treasure' },
			{ x: 60, y: 20, color: 'treasure' }
		],
		goalX: 50,
		goalY: 80
	},
	{
		id: 7,
		pins: [
			{ id: 1, x: 45, y: 30 },
			{ id: 2, x: 55, y: 30 },
			{ id: 3, x: 50, y: 50 }
		],
		balls: [
			{ x: 50, y: 15, color: 'treasure' },
			{ x: 70, y: 40, color: 'danger' }
		],
		goalX: 50,
		goalY: 80
	},
	{
		id: 8,
		pins: [
			{ id: 1, x: 40, y: 25 },
			{ id: 2, x: 60, y: 25 },
			{ id: 3, x: 40, y: 50 },
			{ id: 4, x: 60, y: 50 }
		],
		balls: [{ x: 50, y: 15, color: 'treasure' }],
		goalX: 50,
		goalY: 80
	},
	{
		id: 9,
		pins: [
			{ id: 1, x: 35, y: 35 },
			{ id: 2, x: 65, y: 35 },
			{ id: 3, x: 50, y: 50 }
		],
		balls: [
			{ x: 50, y: 20, color: 'treasure' },
			{ x: 30, y: 55, color: 'danger' },
			{ x: 70, y: 55, color: 'danger' }
		],
		goalX: 50,
		goalY: 80
	},
	{
		id: 10,
		pins: [
			{ id: 1, x: 30, y: 30 },
			{ id: 2, x: 70, y: 30 },
			{ id: 3, x: 50, y: 45 },
			{ id: 4, x: 30, y: 60 },
			{ id: 5, x: 70, y: 60 }
		],
		balls: [
			{ x: 50, y: 15, color: 'treasure' },
			{ x: 50, y: 25, color: 'treasure' }
		],
		goalX: 50,
		goalY: 85
	},

	// Levels 11-30: Easy levels
	...Array.from({ length: 20 }, (_, i) => ({
		id: 11 + i,
		pins: Array.from({ length: 3 + Math.floor(i / 4) }, (_, j) => ({
			id: j + 1,
			x: 25 + (j * 25) % 75,
			y: 25 + (j * 15) % 50
		})),
		balls: [
			{ x: 50, y: 15, color: 'treasure' as const },
			...(i > 5 ? [{ x: 30 + (i % 40), y: 40 + (i % 30), color: 'danger' as const }] : [])
		],
		goalX: 50,
		goalY: 80
	})),

	// Levels 31-50: Medium levels
	...Array.from({ length: 20 }, (_, i) => ({
		id: 31 + i,
		pins: Array.from({ length: 4 + Math.floor(i / 3) }, (_, j) => ({
			id: j + 1,
			x: 20 + (j * 20) % 80,
			y: 25 + (j * 12) % 55,
			blockedBy: j > 0 && i > 10 ? [j] : undefined
		})),
		balls: [
			{ x: 50, y: 15, color: 'treasure' as const },
			{ x: 40 + (i % 20), y: 30, color: 'treasure' as const },
			...(i > 5 ? [{ x: 25 + (i % 50), y: 45 + (i % 25), color: 'danger' as const }] : []),
			...(i > 12 ? [{ x: 65 + (i % 20), y: 50 + (i % 20), color: 'danger' as const }] : [])
		],
		goalX: 50,
		goalY: 82
	})),

	// Levels 51-70: Hard levels
	...Array.from({ length: 20 }, (_, i) => ({
		id: 51 + i,
		pins: Array.from({ length: 5 + Math.floor(i / 2) }, (_, j) => ({
			id: j + 1,
			x: 15 + (j * 18) % 85,
			y: 20 + (j * 10) % 60,
			blockedBy: j > 0 && j < 4 ? [j] : j > 3 ? [1, 2] : undefined
		})),
		balls: [
			{ x: 50, y: 12, color: 'treasure' as const },
			{ x: 45, y: 20, color: 'treasure' as const },
			{ x: 55, y: 20, color: 'treasure' as const },
			{ x: 20 + (i % 30), y: 35 + (i % 30), color: 'danger' as const },
			{ x: 60 + (i % 30), y: 40 + (i % 25), color: 'danger' as const },
			...(i > 10 ? [{ x: 35 + (i % 30), y: 55 + (i % 20), color: 'danger' as const }] : [])
		],
		goalX: 50,
		goalY: 85
	})),

	// Levels 71-90: Very Hard levels
	...Array.from({ length: 20 }, (_, i) => ({
		id: 71 + i,
		pins: Array.from({ length: 6 + Math.floor(i / 2) }, (_, j) => ({
			id: j + 1,
			x: 12 + (j * 15) % 88,
			y: 18 + (j * 9) % 62,
			blockedBy:
				j === 0 ? undefined : j < 3 ? [j] : j < 5 ? [1, j - 1] : [Math.max(1, j - 2), j - 1]
		})),
		balls: [
			{ x: 50, y: 10, color: 'treasure' as const },
			{ x: 40, y: 18, color: 'treasure' as const },
			{ x: 60, y: 18, color: 'treasure' as const },
			{ x: 50, y: 25, color: 'treasure' as const },
			{ x: 18 + (i % 25), y: 32 + (i % 28), color: 'danger' as const },
			{ x: 65 + (i % 25), y: 38 + (i % 24), color: 'danger' as const },
			{ x: 30 + (i % 35), y: 50 + (i % 22), color: 'danger' as const },
			...(i > 10 ? [{ x: 75 + (i % 20), y: 55 + (i % 20), color: 'danger' as const }] : [])
		],
		goalX: 50,
		goalY: 85
	})),

	// Levels 91-100: Expert levels
	...Array.from({ length: 10 }, (_, i) => ({
		id: 91 + i,
		pins: Array.from({ length: 8 + i }, (_, j) => ({
			id: j + 1,
			x: 10 + (j * 12) % 90,
			y: 15 + (j * 8) % 65,
			blockedBy:
				j === 0
					? undefined
					: j < 2
						? [j]
						: j < 4
							? [1, j - 1]
							: j < 6
								? [j - 2, j - 1]
								: [1, j - 3, j - 1]
		})),
		balls: [
			{ x: 50, y: 8, color: 'treasure' as const },
			{ x: 35, y: 15, color: 'treasure' as const },
			{ x: 65, y: 15, color: 'treasure' as const },
			{ x: 45, y: 22, color: 'treasure' as const },
			{ x: 55, y: 22, color: 'treasure' as const },
			{ x: 15 + (i % 20), y: 30 + (i % 25), color: 'danger' as const },
			{ x: 70 + (i % 20), y: 35 + (i % 23), color: 'danger' as const },
			{ x: 25 + (i % 30), y: 48 + (i % 20), color: 'danger' as const },
			{ x: 60 + (i % 30), y: 52 + (i % 18), color: 'danger' as const },
			{ x: 40 + (i % 25), y: 60 + (i % 15), color: 'danger' as const }
		],
		goalX: 50,
		goalY: 88
	}))
];

// Get level by ID
export function getLevel(id: number): Level | undefined {
	return levels.find((level) => level.id === id);
}

// Get current level from localStorage
export function getCurrentLevel(): number {
	if (typeof window === 'undefined') return 1;
	const saved = localStorage.getItem('pin-game-current-level');
	return saved ? parseInt(saved, 10) : 1;
}

// Save current level to localStorage
export function saveCurrentLevel(level: number): void {
	if (typeof window === 'undefined') return;
	localStorage.setItem('pin-game-current-level', level.toString());
}

// Get unlocked levels
export function getUnlockedLevels(): number {
	if (typeof window === 'undefined') return 1;
	const saved = localStorage.getItem('pin-game-unlocked-levels');
	return saved ? parseInt(saved, 10) : 1;
}

// Save unlocked levels
export function saveUnlockedLevels(level: number): void {
	if (typeof window === 'undefined') return;
	const current = getUnlockedLevels();
	if (level > current) {
		localStorage.setItem('pin-game-unlocked-levels', level.toString());
	}
}
