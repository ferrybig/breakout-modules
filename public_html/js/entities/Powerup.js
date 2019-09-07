import Entity from './Entity.js';
import * as actions from '../actions.js';
import { checkBoundingBoxOverlapping } from '../mathUtils.js';

export default class Powerup extends Entity {
	constructor(x, y, powerup) {
		super(x, y, 'powerup', 48, 48);
		this.powerup = powerup;
		this.vel = {
			x: (Math.random() - 0.5) * 4,
			y: -3,
		};
	}

	render(graphics) {
//		graphics.fillStyle = 'white';
//		graphics.fillRect(this.x, this.y, this.width, this.height);
//		graphics.fillStyle = 'black'
//		graphics.font = '11px serif'
//		graphics.textBaseline = 'hanging'
//		graphics.textAlign = 'left'
//		let offset = 0;
//		for(const line of this.type.name.split('-')) {
//			graphics.fillText(line, this.x, this.y + offset)
//			offset += 11;
//		}
		this.powerup.image.drawToGraphics(graphics, this.x, this.y, this.width, this.height)
	}

	update(options) {
		if(this.y > options.height) {
			this.timeToLive = 0;
		}
		this.vel.y *= 0.99;
		this.vel.x *= 0.99;
		this.vel.y += 0.1;
		this.x += this.vel.x;
		this.y += this.vel.y;
		this.boundingBox.x1 += this.vel.x;
		this.boundingBox.y1 += this.vel.y;
		this.boundingBox.x2 += this.vel.x;
		this.boundingBox.y2 += this.vel.y;
		if (this.x < 0 || this.x + this.wdth > options.width) {
			this.vel.x *= -1;
		}

		const paddle = options.manager.findByType('paddle');
		if (checkBoundingBoxOverlapping(this.boundingBox, paddle.boundingBox)) {
			this.timeToLive = 0;
			options.eventBus.fireAction(actions.powerupActivated, this.powerup, this, paddle);
		}
	}
}