import Entity from './Entity.js';
import * as actions from '../actions.js';
import { lerp, fraction, checkBoundingBoxOverlapping, lineInterSectionDistance, assertUnreachable } from '../mathUtils.js';

function linesForEntity(entity) {
	switch (entity.type) {
		case 'brick':
			return [
				{x1: entity.x, y1: entity.y, x2: entity.x + entity.width, y2: entity.y, name: 'top'},
				{x1: entity.x + entity.width, y1: entity.y, x2: entity.x + entity.width, y2: entity.y + entity.height, name: 'right'},
				{x1: entity.x + entity.width, y1: entity.y + entity.height, x2: entity.x, y2: entity.y + entity.height, name: 'bottom'},
				{x1: entity.x, y1: entity.y + entity.height, x2: entity.x, y2: entity.y, name: 'left'},
			];
		case 'screen':
			return [
				{x2: entity.x, y2: entity.y, x1: entity.x + entity.width, y1: entity.y, name: 'top'},
				{x2: entity.x + entity.width, y2: entity.y, x1: entity.x + entity.width, y1: entity.y + entity.height, name: 'right'},
				{x2: entity.x + entity.width, y2: entity.y + entity.height, x1: entity.x, y1: entity.y + entity.height, name: 'bottom'},
				{x2: entity.x, y2: entity.y + entity.height, x1: entity.x, y1: entity.y, name: 'left'},
			];
		case 'paddle':
			return [
				{x1: entity.x, y1: entity.y, x2: entity.x + entity.width, y2: entity.y, name: 'top'},
			];
		default:
			return assertUnreachable(entity);
	}
}

function getIntersectedLine(lines, movement) {
	let pendingLine = undefined;
	let intersectionDistance = Number.POSITIVE_INFINITY;
	for (const line of lines) {
		const g = lineInterSectionDistance(movement, line);
		const h = lineInterSectionDistance(line, movement);
		if (h > 0 && h <= 1 && g > 0 && g <= 1) {
			if (h < intersectionDistance) {
				pendingLine = line;
				intersectionDistance = h;
			}
		}
	}
	if (pendingLine) {
		return {
			line: pendingLine,
			intersectionDistance,
		}
	}
	return null;
}

export default class Ball extends Entity {
	constructor(x, y) {
		super(x, y, 'ball', 0, 0);
		this.vel = {
			x: 0,
			y: 0,
		};
		this.size = 6;
		this.updateOnPause = false;
	}

	render(graphics, options, renderTick) {
		if (options.ballSettings.powerups.exploding) {
			graphics.fillStyle = ['#ffa500', '#ff7a00'][(renderTick >> 2) & 1]
			graphics.beginPath();
			graphics.moveTo(this.x, this.y);
			graphics.arc(this.x, this.y, (this.size + this.size) / 1.5, 0, Math.PI * 2, true);
			graphics.closePath();
			graphics.fill();
		}
		if (options.ballSettings.powerups.unstopable) {
			graphics.fillStyle = 'lightblue'
		} else {
			graphics.fillStyle = 'white'
		}
		graphics.beginPath();
		graphics.moveTo(this.x, this.y);
		graphics.arc(this.x, this.y, (this.size + this.size) / 2.5, 0, Math.PI * 2, true);
		graphics.closePath();
		graphics.fill();
	}

	update(options, updateTick) {
		if(this.x < 0 || this.x > options.width || this.y < 0 || this.y > options.height) {
			throw new Error('ball has invalid position!'); // dev only
		}

		let pendingX = this.vel.x;
		let pendingY = this.vel.y;
		const initialPendingX = this.vel.x;
		const initialpendingY = this.vel.y;
		do {
			const oldX = this.x;
			const oldY = this.y;
			this.x += pendingX;
			this.y += pendingY;
			const oldPendingX = pendingX;
			const oldPendingY = pendingY;
			pendingX = 0;
			pendingY = 0;
			const movementRectangle = {
				x1: Math.min(oldX, this.x),
				x2: Math.max(oldX, this.x),
				y1: Math.max(oldY, this.y),
				y2: Math.min(oldY, this.y),
			}
			const movementWithDirection = {
				x1: oldX,
				x2: this.x,
				y1: oldY,
				y2: this.y,
			}
			let brickCollision = null;
			for (const entity of options.manager.entities) {
				if ((entity.type === 'brick' || entity.type === 'paddle') && entity.timeToLive !== 0) {
//					const dX = Math.abs(entity.x + entity.width / 2) - entity.width / 2 - this.size;
//					const dY = Math.abs(entity.y + entity.height / 2) - entity.height / 2 - this.size;
//					const box = {
//						x1: entity.x,
//						x2: entity.x + entity.width,
//						y1: entity.y + entity.height,
//						y2: entity.y,
//					}
					if (checkBoundingBoxOverlapping(movementRectangle, entity.boundingBox)) {
						//entity.timeToLive = 0;
						const lines = linesForEntity(entity);
						const intersectionResult = getIntersectedLine(lines, movementWithDirection);
						if (intersectionResult && (!brickCollision || intersectionResult.intersectionDistance < brickCollision.intersectionDistance)) {
							brickCollision = {
								...intersectionResult,
								entity
							};
						}
					}
				}
			}
			if (!brickCollision) {
				const screenEntity = {
					x: 0,
					y: 0,
					width: options.width,
					height: options.height,
					type: 'screen',
				}
				const intersectionResult = getIntersectedLine(linesForEntity(screenEntity), movementWithDirection);
				if (intersectionResult) {
					brickCollision = {
						entity: screenEntity,
						...intersectionResult,
					};
				}
			}
			if (brickCollision) {
				const horizontalIntersection = brickCollision.line.x1 === brickCollision.line.x2;
				const verticalIntersection = brickCollision.line.y1 === brickCollision.line.y2;
				const e = {
					x: oldPendingX,
					y: oldPendingY
				};
				const h = brickCollision.intersectionDistance;
				const intersection = {
					x: horizontalIntersection ? brickCollision.line.x1 : e.x * h + oldX,
					y: verticalIntersection ? brickCollision.line.y1 : e.y * h + oldY,

				}
				// console.log({intersection, h, e, oldX, oldY });
				this.x = intersection.x;
				this.y = intersection.y;
				if((!options.ballSettings.powerups.unstopable) || (brickCollision.entity.type !== 'brick')) {
					this.vel = {
						x: verticalIntersection ? initialPendingX : -initialPendingX,
						y: horizontalIntersection ? initialpendingY : -initialpendingY,
					}
					if (brickCollision.entity.type !== 'paddle') { // todo ball unstopable powerup
						pendingX = lerp(1 - h, 0, brickCollision.line.y1 === brickCollision.line.y2 ? oldPendingX : -oldPendingX);
						pendingY = lerp(1 - h, 0, brickCollision.line.x1 === brickCollision.line.x2 ? oldPendingY : -oldPendingY);
						// todo use this.vel here?
					}
				}

				const event = {
					collision: brickCollision,
					pendingX,
					pendingY,
					velocity: this.vel,
					intersection,
					oldX,
					oldY,
				}

				switch (brickCollision.entity.type) {
					case 'brick':
						//unstopableBallPowerupActive, source, updateTick
						brickCollision.entity.onHit(options.ballSettings.powerups.unstopable, this, updateTick);
						if(options.ballSettings.powerups.exploding) {
							brickCollision.entity.explode(updateTick);
						}
						options.eventBus.fireAction(actions.ballHitBrick, event, this, brickCollision.entity);
						break;
					case 'screen':
						if (brickCollision.line.name === 'bottom') {
							options.eventBus.fireAction(actions.ballHitDeathZone, event, this, this);
						}
						break;
					case 'paddle':
						options.eventBus.fireAction(actions.ballHitPaddle, event, this, brickCollision.entity);
						break;
					default:
						return assertUnreachable(brickCollision.entity);
				}
			}
		} while (pendingX !== 0 || pendingY !== 0);
	}
}