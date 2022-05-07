const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const rect = canvas.getBoundingClientRect();
const { left, right } = rect;

export default class Paddle {
	constructor({ x, y, r, h }) {
		this.x = x;
		this.y = y;
		this.height = h;

		this.width = r * 2;
		this.colour = '#fff';

		window.addEventListener(
			'mousemove',
			(e) => {
				this.x =
					((e.clientX - left) / (right - left)) * canvas.width -
					this.width / 2;
			},
			false
		);
	}

	draw() {
		ctx.fillStyle = this.colour;

		if (this.x <= 0) {
			this.x = 0;
		} else if (this.x >= canvas.width - this.width) {
			this.x = canvas.width - this.width;
		}

		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
