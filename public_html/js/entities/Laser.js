import Entity from './Entity.js';
import * as actions from '../actions.js';
import { checkBoundingBoxOverlapping } from '../mathUtils.js';

const VELOCITY_X = 0;
const VELOCITY_Y = -8;

export default class Powerup extends Entity {
	constructor(x, y, type) {
		super(x, y, 'laser', 2, 16);
		this.type = type;
	}

	render(graphics) {
		graphics.fillStyle = 'red';
		graphics.fillRect(this.x, this.y, this.width, this.height);
	}

	update(options, updateTick) {
		if(this.y + this.height < 0) {
			this.timeToLive = 0;
		}
		this.x += VELOCITY_X;
		this.y += VELOCITY_Y;
		this.boundingBox.x1 += VELOCITY_X;
		this.boundingBox.y1 += VELOCITY_Y;
		this.boundingBox.x2 += VELOCITY_X;
		this.boundingBox.y2 += VELOCITY_Y;

		const bricks = options.manager.findAllByType('brick');
		for(const brick of bricks) {
			if (checkBoundingBoxOverlapping(this.boundingBox, brick.boundingBox)) {
				this.timeToLive = 0;
				brick.onHit(false, this, updateTick);
			}
		}
	}
}