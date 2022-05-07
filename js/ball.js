const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export default class Ball {
	constructor({ x, y, r, s }) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.s = s;

		this.angle = 45;
	}

	draw() {
		ctx.fillStyle = '#fff';
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, this.r, this.r, 0, 0, Math.PI * 2);
		ctx.fill();
	}

	update() {
		this.xv = this.s * Math.cos(this.rads());
		this.yv = this.s * Math.sin(this.rads());

		this.x += this.xv;
		this.y -= this.yv;
	}

	rads() {
		return this.angle * (Math.PI / 180);
	}
}
