export default class UserControls {
	constructor() {
		this.paused = false;

		document.onkeydown = (event) => {
			const callback = {
				p: () => (this.paused = !this.paused),
			}[event.key];

			callback?.();
		};

		document.onkeyup = (event) => {
			const callback = {}[event.key];

			callback?.();
		};
	}
}
