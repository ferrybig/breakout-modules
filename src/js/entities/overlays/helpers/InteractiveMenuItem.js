import Entity from '../../Entity.js';

export default class InteractiveMenuItem extends Entity {
	constructor(parent, x, y, width, height, text, click, icons = {}) {
		super(x, y, 'overlays/helpers/interactive-menu-item', width, height);
		this.parent = parent;
		this.text = text;
		this.click = click;
		this.hover = false;
		this.icons = icons;
	}

	update() {
		if (this.parent.timeToLive === 0) {
			this.timeToLive = 0;
		}
	}

	init(options) {
		this.destroyFunctions = [
			options.mouseTracker.addRegion(
				this.x, this.y, this.width, this.height,
				this.click, () => this.hover = true, () => this.hover = false
			),
		]
	}

	render(graphics) {
		if (this.hover) {
			graphics.strokeStyle = '#ffffff';
			graphics.fillStyle = '#ffffff';
		} else {
			graphics.strokeStyle = '#dddddd';
			graphics.fillStyle = '#dddddd';
		}
		graphics.strokeRect(this.x, this.y, this.width, this.height);
		graphics.font = this.height / 1.5 - 4 + 'px serif';
		graphics.textBaseline = 'middle';
		graphics.textAlign = 'center';
		graphics.fillText(this.text, this.middleX, this.middleY);
		if (this.icons.left) {
			this.icons.left.drawToGraphics(graphics, this.x, this.middleY - this.icons.left.height / 2)
		}
		if (this.icons.right) {
			this.icons.right.drawToGraphics(graphics, this.x + this.width - this.icons.right.width, this.middleY - this.icons.right.height / 2)
		}
	}
}
