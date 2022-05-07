const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const TOUGHNESS = {
	WEAK: 1,
	HARD: 2,
	REINFORCED: 3,
};

export default class Brick {
	constructor({ x, y, w, h, toughness }) {
		this.x = x;
		this.y = y;

		this.w = w;
		this.h = h;
		this.toughness = toughness;

		this.hits = 0;

		const { WEAK, HARD, REINFORCED } = TOUGHNESS;
		if (![WEAK, HARD, REINFORCED].includes(Number(toughness))) {
			this.toughness = 1;
		}

		this.renderImage();
	}

	draw() {
		if (!this.image) return;
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
	}

	renderImage() {
		const image = new Image();
		image.src = `../assets/bricks/${this.toughness}-${this.hits}.png`;
		image.onload = () => {
			this.image = image;
		};
	}
}
