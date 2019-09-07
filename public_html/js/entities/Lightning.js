import Entity from './Entity.js';
import * as actions from '../actions.js';
import * as particles from '../particles.js';
import { checkBoundingBoxOverlapping } from '../mathUtils.js';

const POINTS = [];
{
	const STRIKE_ANGLES = 16;
	let distance = 16;
	let distanceY = 32;
	POINTS.push([0, 0]);
	for (let i = 0; i < STRIKE_ANGLES; i++) {
		POINTS.push([(distance * ((i & 1) || -1)), -distanceY + 24]);
		distance *= 1.2;
		distanceY *= 1.5;
	}
}
function drawStrike(graphics, x, y) {
	const oldWidth = graphics.lineWidth;
	for (let i = 0; i < POINTS.length - 2; i++) {
		graphics.lineWidth = 1 + i * 2;
		graphics.beginPath();
		for (let j = i; j < POINTS.length; j++) {
			const point = POINTS[j];
			if (j === i) {
				graphics.moveTo(x + point[0], y + point[1])
			} else {
				graphics.lineTo(x + point[0], y + point[1])
			}
		}
		graphics.stroke();
	}
	graphics.closePath();
	graphics.lineWidth = oldWidth;
}

export default class Lightning extends Entity {
	constructor(target, timeToStrike) {
		super(target.middleX, target.middleY, 'lightning', 0, 0);
		this.timeToLive = timeToStrike;
		this.target = target;
	}

	render(graphics, options) {
		if (this.timeToLive === 2) {
			graphics.strokeStyle = 'rgb(0,0,0)';
			drawStrike(graphics, this.x, this.y);
		} else if (this.timeToLive === 1) {
			graphics.fillStyle = 'rgba(0,0,0, 0.5)';
			graphics.fillRect(0, 0, options.width, options.height);
			graphics.strokeStyle = 'rgb(255,255,255)';
			drawStrike(graphics, this.x, this.y);
		}
	}

	update(options, updateTick) {
		if (this.timeToLive === 1) {
			options.eventBus.fireAction(actions.particleActivated, {
				type: particles.explosion,
				x: this.x + this.width * 0.5,
				y: this.y + this.height * 0.5,
			}, this, this);
			this.target.onHit(true, this, updateTick)
		}
		if (this.timeToLive > 0) {
			this.timeToLive--;
		}
		if (this.target.timeToLive === 0) {
			this.timeToLive = 0;
		}
	}
}