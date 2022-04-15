export default class Entity { // Should probably be split up into a "renderable" class
	constructor(x, y, type, width = 0, height = 0) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.width = width;
		this.height = height;
		this.timeToLive = undefined;
		this.destroyFunctions = undefined;
		this.boundingBox = this.computeBoundingBox();
		this.updateOnPause = true;
		this.renderBlocked = false;
	}
	render() {
	}
	update() {
	}
	init() {
	}
	destroy() {
		if(this.destroyFunctions) {
			for (const destroyFunction of this.destroyFunctions) {
				destroyFunction();
			}
		}
	}
	setRenderBlocked(renderBlocked) {
		this.renderBlocked = renderBlocked;
	}
	computeBoundingBox() {
		return {
			x1: this.x,
			x2: this.x + this.width,
			y1: this.y + this.height,
			y2: this.y,
		}
	}
	reComputeBoundingBox() {
		this.boundingBox = this.computeBoundingBox();
	}
	get middleX() {
		return this.x + this.width * 0.5;
	}
	get middleY() {
		return this.y + this.height * 0.5;
	}
}