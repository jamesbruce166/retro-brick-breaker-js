const canvas = document.getElementById('canvas');

export default class Physics {
	constructor() {}

	ballHasHitBrick(brick, ball) {
		const ballLeft = ball.x - ball.r;
		const ballRight = ball.x + ball.r;
		const ballTop = ball.y - ball.r;
		const ballBottom = ball.y + ball.r;

		const brickLeft = brick.x;
		const brickRight = brick.x + brick.w;
		const brickTop = brick.y;
		const brickBottom = brick.y + brick.h;

		const rightEdgeCollision =
			ballLeft <= brickRight &&
			ballLeft > brickLeft &&
			ballTop < brickBottom &&
			ballBottom > brickTop;

		const leftEdgeCollision =
			ballRight >= brickLeft &&
			ballRight < brickRight &&
			ballTop < brickBottom &&
			ballBottom > brickTop;

		const topEdgeCollision =
			ballBottom >= brickTop &&
			ballBottom < brickBottom &&
			ballRight > brickLeft &&
			ballLeft < brickRight;

		const bottomEdgeCollision =
			ballTop <= brickBottom &&
			ballTop > brickTop &&
			ballRight > brickLeft &&
			ballLeft < brickRight;

		if (rightEdgeCollision || leftEdgeCollision) {
			ball.angle = 360 - ball.angle;
			return true;
		} else if (topEdgeCollision || bottomEdgeCollision) {
			ball.angle = 180 - ball.angle;
			return true;
		}
		return false;
	}

	ballHasExitedScreen(ball) {
		return ball.y + ball.r > canvas.height;
	}

	bounceBallOnPaddle(paddle, ball) {
		if (
			ball.y + ball.r >= paddle.y &&
			ball.x + ball.r >= paddle.x &&
			ball.x - ball.r <= paddle.x + paddle.width
		) {
			ball.angle = 360 - ball.angle;
		}
	}

	bounceBallOnCanvas(ball) {
		// bounce all walls except bottom
		if (ball.x - ball.r <= 0 || ball.x + ball.r >= canvas.width) {
			ball.angle = 180 - ball.angle;
		} else if (ball.y - ball.r <= 0) {
			ball.angle = 360 - ball.angle;
		}
	}
}
