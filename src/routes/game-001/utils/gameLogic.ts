// Game physics and logic for Pin Pulling Game

export interface Position {
	x: number;
	y: number;
}

export interface Velocity {
	vx: number;
	vy: number;
}

export interface GameObject extends Position, Velocity {
	id: string;
	color: 'treasure' | 'danger';
	radius: number;
	isMoving: boolean;
}

const GRAVITY = 0.3;
const BOUNCE_DAMPING = 0.6;
const VELOCITY_THRESHOLD = 0.1;

// Check if ball is in goal area
export function isInGoal(ball: GameObject, goalX: number, goalY: number, goalRadius = 8): boolean {
	const dx = ball.x - goalX;
	const dy = ball.y - goalY;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance < goalRadius + ball.radius;
}

// Update ball physics
export function updateBallPhysics(
	ball: GameObject,
	pins: { x: number; y: number; id: number; pulled: boolean }[],
	bounds = { minX: 5, maxX: 95, minY: 5, maxY: 95 }
): GameObject {
	if (!ball.isMoving) {
		// Check if ball should start falling (no pin below it)
		const hasSupport = pins.some((pin) => {
			if (pin.pulled) return false;
			const dx = Math.abs(pin.x - ball.x);
			const dy = pin.y - ball.y;
			return dx < 10 && dy > 0 && dy < 15;
		});

		if (!hasSupport) {
			ball.isMoving = true;
		}
	}

	if (ball.isMoving) {
		// Apply gravity
		ball.vy += GRAVITY;

		// Update position
		ball.x += ball.vx;
		ball.y += ball.vy;

		// Check collisions with unpulled pins
		pins.forEach((pin) => {
			if (pin.pulled) return;

			const dx = ball.x - pin.x;
			const dy = ball.y - pin.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const minDistance = ball.radius + 2;

			if (distance < minDistance) {
				// Collision detected
				const angle = Math.atan2(dy, dx);
				const overlap = minDistance - distance;

				// Push ball away from pin
				ball.x += Math.cos(angle) * overlap;
				ball.y += Math.sin(angle) * overlap;

				// Bounce effect
				const normalX = Math.cos(angle);
				const normalY = Math.sin(angle);
				const dotProduct = ball.vx * normalX + ball.vy * normalY;

				ball.vx = (ball.vx - 2 * dotProduct * normalX) * BOUNCE_DAMPING;
				ball.vy = (ball.vy - 2 * dotProduct * normalY) * BOUNCE_DAMPING;
			}
		});

		// Bounce off bounds
		if (ball.x - ball.radius < bounds.minX) {
			ball.x = bounds.minX + ball.radius;
			ball.vx = -ball.vx * BOUNCE_DAMPING;
		}
		if (ball.x + ball.radius > bounds.maxX) {
			ball.x = bounds.maxX - ball.radius;
			ball.vx = -ball.vx * BOUNCE_DAMPING;
		}
		if (ball.y - ball.radius < bounds.minY) {
			ball.y = bounds.minY + ball.radius;
			ball.vy = -ball.vy * BOUNCE_DAMPING;
		}
		if (ball.y + ball.radius > bounds.maxY) {
			ball.y = bounds.maxY - ball.radius;
			ball.vy = Math.abs(ball.vy) * -BOUNCE_DAMPING;
		}

		// Stop if velocity is very low and near bottom
		if (
			Math.abs(ball.vx) < VELOCITY_THRESHOLD &&
			Math.abs(ball.vy) < VELOCITY_THRESHOLD &&
			ball.y > bounds.maxY - 10
		) {
			ball.vx = 0;
			ball.vy = 0;
			ball.isMoving = false;
		}
	}

	return ball;
}

// Check if balls collide with each other
export function checkBallCollisions(balls: GameObject[]): GameObject[] {
	for (let i = 0; i < balls.length; i++) {
		for (let j = i + 1; j < balls.length; j++) {
			const ball1 = balls[i];
			const ball2 = balls[j];

			const dx = ball2.x - ball1.x;
			const dy = ball2.y - ball1.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const minDistance = ball1.radius + ball2.radius;

			if (distance < minDistance) {
				// Collision detected
				const angle = Math.atan2(dy, dx);
				const overlap = minDistance - distance;

				// Separate balls
				const separationX = (Math.cos(angle) * overlap) / 2;
				const separationY = (Math.sin(angle) * overlap) / 2;

				ball1.x -= separationX;
				ball1.y -= separationY;
				ball2.x += separationX;
				ball2.y += separationY;

				// Exchange velocities (simplified elastic collision)
				const tempVx = ball1.vx;
				const tempVy = ball1.vy;
				ball1.vx = ball2.vx * BOUNCE_DAMPING;
				ball1.vy = ball2.vy * BOUNCE_DAMPING;
				ball2.vx = tempVx * BOUNCE_DAMPING;
				ball2.vy = tempVy * BOUNCE_DAMPING;

				// Ensure both balls are moving after collision
				ball1.isMoving = true;
				ball2.isMoving = true;
			}
		}
	}

	return balls;
}
