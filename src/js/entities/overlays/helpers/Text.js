import Entity from '../../Entity.js';

export default class InteractiveMenuItem extends Entity {
	constructor(parent, x, y, width, height, text, font) {
		super(x, y, 'overlays/helpers/text', width, height);
		this.parent = parent;
		this.text = text;
		this.font = font;
	}

	update() {
		if (this.parent.timeToLive === 0) {
			this.timeToLive = 0;
		}
	}

	getFontSize() {
		switch(this.font) {
			case 'big':
				return this.height - 4;
			case 'normal':
				return this.height / 1.5 - 4;
			case 'small':
				return this.height / 2 - 4;
		}
	}

	render(graphics) {
		graphics.strokeStyle = '#ffffff';
		graphics.fillStyle = '#ffffff';
		graphics.font = this.getFontSize() + 'px serif';
		graphics.textBaseline = 'middle';
		graphics.textAlign = 'center';
		graphics.fillText(this.text, this.middleX, this.middleY);
	}
}
