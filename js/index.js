const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

import UserControls from './userControls.js';
import Physics from './physics.js';
import Paddle from './paddle.js';
import Brick from './brick.js';
import Ball from './ball.js';

const FPS = 30;
const BALL_R = 5;
const PADDLE_R = 60;
const BALL_SPEED = 8;
const PADDLE_HEIGHT = 15;
const SCORE_MULTIPLIER = 5;

const BRICK_WIDTH = canvas.width / 10;
const BRICK_HEIGHT = 25;

import levels from './levels.js';

class BrickBreaker {
	constructor() {
		this.bricks = [];
		this.score = 0;
		this.level = 1;
		this.hasStarted = false;

		this.physics = new Physics();
		this.controls = new UserControls();

		this.paddle = this.createPaddle();
		this.ball = this.createBall();

		this.start();
		this.layoutInitialBricks();
	}

	start() {
		const next = () => this.nextFrame();
		setInterval(next, 1000 / FPS);
	}

	nextFrame() {
		// Pause control
		if (this.controls.paused) return;

		// Refresh frame
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Update movements
		this.ball.update();

		// Draw graphics
		this.paddle.draw();
		this.drawBricks();
		this.ball.draw();

		// Apply basic physics
		this.physics.bounceBallOnCanvas(this.ball);
		this.physics.bounceBallOnPaddle(this.paddle, this.ball);
		this.detectBrickHits();

		// Update game state
		this.gameUpdate();
		this.showScore();
		//this.showDebugBounds();
	}

	gameUpdate() {
		// death
		if (this.physics.ballHasExitedScreen(this.ball)) {
			this.score = 0;
			this.reset();
		}

		// level up
		if (this.score < 0 && this.bricks === 0) {
			this.level++;
			this.layoutInitialBricks();
		}
	}

	drawBricks() {
		for (let brick of this.bricks) {
			brick.draw();
		}
	}

	layoutInitialBricks() {
		const level = levels[this.level];
		for (let [i, row] of level.entries()) {
			const items = row.split('');
			for (let [j, brickCode] of items.entries()) {
				if (brickCode > 0) {
					this.bricks.push(
						new Brick({
							x: BRICK_WIDTH * j,
							y: BRICK_HEIGHT * i,
							w: BRICK_WIDTH,
							h: BRICK_HEIGHT,
							toughness: brickCode,
						})
					);
				}
			}
		}
	}

	createPaddle() {
		return new Paddle({
			x: canvas.width / 2 - PADDLE_R,
			y: canvas.height - PADDLE_HEIGHT - 5,
			r: PADDLE_R,
			h: PADDLE_HEIGHT,
		});
	}

	createBall() {
		return new Ball({
			x: this.paddle.x + PADDLE_R,
			y: this.paddle.y - 10,
			r: BALL_R,
			s: BALL_SPEED,
		});
	}

	detectBrickHits() {
		for (let [idx, brick] of this.bricks.entries()) {
			if (this.physics.ballHasHitBrick(brick, this.ball)) {
				this.bricks[idx]['hits'] += 1;
				if (this.bricks[idx]['hits'] >= this.bricks[idx]['toughness']) {
					this.bricks.splice(idx, 1);
					this.score +=
						SCORE_MULTIPLIER * this.bricks[idx]['toughness'];
				}

				this.bricks[idx].renderImage();
				break;
			}
		}
	}

	showScore() {
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = 'white';
		ctx.font = 'normal 20px Fira Sans';
		ctx.fillText(`Score: ${this.score}`, 800 - 100, 30);
	}

	reset() {
		this.paddle.x = canvas.width / 2 - PADDLE_R;
		this.paddle.y = canvas.height - PADDLE_HEIGHT - 5;

		this.ball.x = this.paddle.x + PADDLE_R;
		this.ball.y = this.paddle.y - 10;
		this.ball.angle = 110;

		this.bricks = [];
		this.layoutInitialBricks();
	}

	showDebugBounds() {
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.arc(this.ball.x, this.ball.y, 3, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.arc(this.paddle.x, this.paddle.y, 3, 0, Math.PI * 2);
		ctx.fill();

		for (let brick of this.bricks) {
			ctx.fillStyle = 'white';
			ctx.beginPath();
			ctx.arc(brick.x, brick.y, 3, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}

new BrickBreaker();
