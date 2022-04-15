import Entity from '../Entity.js';

export default class Background extends Entity {
	constructor(hue = 54) {
		super(0, 0, 'helpers/background', 0, 0);
		this.hue = hue;
	}

	render(graphics, options) {
		const gradient = graphics.createLinearGradient(0, 0, 0, options.height);

		graphics.fillStyle = 'hsl(' + this.hue + ',30%,30%)';
		graphics.fillRect(0, 0, options.width, options.height);
	}

}
