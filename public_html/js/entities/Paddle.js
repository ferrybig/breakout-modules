import Entity from './Entity.js';
import Ball from './Ball.js';
import Laser from './Laser.js';
import * as actions from '../actions.js';
import * as powerups from '../powerups.js';
import { lerp, clamp, fraction, clampToArray } from '../mathUtils.js';

const MAX_DEFLECTION_ANGLE = Math.PI * 0.25;
const ATTACHMENT_WIDTHS = 3;
const SIZES = [20, 70, 140, 220, 310, 410, 520];
const INITIAL_PADDLE_SIZE_INDEX = 2;
const STICKY_MARKER_OFFSET = 3;
const STICKY_MARKER_WIDTH = 3;
const LASER_WIDTH = 2;
const LASER_HEIGHT = 4;
const LASER_OFFSET = 3;
const MAIN_SIZE = 10

function calculateBallVelocity(ball, offset, ballSettings) {
	ball.vel.x = Math.sin(lerp(offset, -MAX_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE)) * ballSettings.speed;
	ball.vel.y = -Math.cos(lerp(offset, -MAX_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE)) * ballSettings.speed;
}

export default class Paddle extends Entity {
	constructor(x, y) {
		super(x, y, 'paddle', SIZES[INITIAL_PADDLE_SIZE_INDEX], 20);
		this.ballOffsets = [];
		this.ballRenderStub = new Ball(0, y);
		this.sizeIndex = INITIAL_PADDLE_SIZE_INDEX;
		this.powerups = {
			sticky: false,
			lasers: false,
		}
		this.mouseX = 0;
		this.screenWidth = 0;
		this.updateOnPause = false;
	}

	render(graphics, options, renderTick) {
		graphics.fillStyle = '#aaaaaa'
		graphics.fillRect(
			this.x, this.y + MAIN_SIZE,
			this.width, this.height - MAIN_SIZE
		);
		const isSticky = this.ballOffsets.length > 0 || this.powerups.sticky ;
		const hasLasers = this.powerups.lasers;
		if (isSticky || hasLasers) {
			if (hasLasers) {
				graphics.fillStyle = '#ff5566';
				graphics.fillRect(
					this.x - LASER_WIDTH, this.y + MAIN_SIZE + LASER_OFFSET,
					LASER_WIDTH * 2 + ATTACHMENT_WIDTHS, LASER_HEIGHT,
				);
				graphics.fillRect(
					this.x + this.width - LASER_WIDTH - ATTACHMENT_WIDTHS, this.y + MAIN_SIZE + LASER_OFFSET,
					LASER_WIDTH * 2 + ATTACHMENT_WIDTHS, LASER_HEIGHT,
				);
			}
			graphics.fillStyle = '#777777'
			graphics.fillRect(this.x, this.y, ATTACHMENT_WIDTHS, this.height);
			graphics.fillRect(this.x + this.width - ATTACHMENT_WIDTHS, this.y, ATTACHMENT_WIDTHS, this.height);
			if (isSticky) {
				graphics.fillRect(
					this.x + ATTACHMENT_WIDTHS, this.y + STICKY_MARKER_OFFSET,
					STICKY_MARKER_WIDTH, this.height - MAIN_SIZE - STICKY_MARKER_OFFSET * 2,
				);
				graphics.fillRect(
					this.x + this.width - ATTACHMENT_WIDTHS - STICKY_MARKER_WIDTH, this.y + STICKY_MARKER_OFFSET,
					STICKY_MARKER_WIDTH, this.height - MAIN_SIZE - STICKY_MARKER_OFFSET * 2,
				);
				if (this.ballOffsets.length > 0) {
					graphics.fillStyle = '#5588FF';
					const effectOffset = (renderTick >> 1) & 3;
					graphics.fillRect(this.x + 2, this.y + 0 + effectOffset, this.width - 4, 1);
					graphics.fillRect(this.x + 2, this.y + 2 + effectOffset, this.width - 4, 1);
					for (const offset of this.ballOffsets) {
						this.ballRenderStub.x = lerp(offset, this.x, this.x + this.width);
						this.ballRenderStub.render(graphics, options)
					}
				}
			}
		}
	}

	spawnBall() {
		this.sizeIndex = INITIAL_PADDLE_SIZE_INDEX;
		if (this.ballOffsets.length === 0) {
			this.ballOffsets.push(0.6);
		} else {
			let range = [this.ballOffsets[0], 0];
			for (let i = 1; i <= this.ballOffsets.length; i++) {
				const distance = (i === this.ballOffsets.length ? 1 : this.ballOffsets[i]) - this.ballOffsets[i - 1];
				if (distance > range[0]) {
					range = [distance, this.ballOffsets[i - 1]];
				}
			}
			this.ballOffsets.push(lerp(0.6, range[1], range[1] + range[0]));
			if(this.ballOffsets.length > 1) {
				this.ballOffsets.sort();
			}
		}

	}

	updateSize(size) {
		this.sizeIndex = clampToArray(size, SIZES);
		this.width = SIZES[this.sizeIndex];
		this.mousePositionToEntityPosition();
		this.reComputeBoundingBox();
	}

	init(options) {
		this.screenWidth = options.width;
		this.destroyFunctions = [
			options.mouseTracker.addMouseListener({
				click: (point, event) => {
					this.onMouseClick(point, options);
				},
				move: (point, movement, event) => {
					this.onMouseMove(point, movement, options);
				},
			}),
			options.eventBus.addSubscription(({ payload }) => {
				switch(payload.name) {
					case powerups.paddleGrow.name:
						this.updateSize(this.sizeIndex + 1);
						break;
					case powerups.paddleShrink.name:
						this.updateSize(this.sizeIndex - 1);
						break;
					case powerups.paddleMini.name:
						this.updateSize(0);
						break;
					case powerups.paddleLasers.name:
						this.powerups.lasers = true;
						break;
					case powerups.paddleSticky.name:
						this.powerups.sticky = true;
						break;
				}
			}, actions.powerupActivated),
			options.eventBus.addSubscription(({ source }) => {
				const hitDistance = fraction(source.x, this.x, this.x + this.width);
				if(this.powerups.sticky) {
					source.timeToLive = 0;
					this.ballOffsets.push(hitDistance);
				}
				calculateBallVelocity(source, hitDistance, options.ballSettings);
			}, actions.ballHitPaddle),
			options.eventBus.addSubscription(() => {
				this.ballOffsets = [];
				this.updateSize(INITIAL_PADDLE_SIZE_INDEX);
				this.powerups = {
					sticky: false,
					lasers: false,
				};
			}, actions.reset),
		]
	}

	onMouseMove(point, movement, options) {
		if (movement) {
			this.mouseX = clamp(this.mouseX + movement.x, this.width / 2, options.width - this.width / 2);
		} else {
			this.mouseX = point.x;
		}
		this.mousePositionToEntityPosition();
	}

	mousePositionToEntityPosition() {
		const oldX = this.x;
		this.x = clamp(this.mouseX - this.width / 2, 0, this.screenWidth - this.width);
		this.boundingBox.x1 -= oldX - this.x;
		this.boundingBox.x2 -= oldX - this.x;
	}

	onMouseClick(_, options) {
		if (options.paused) {
			return;
		}
		if (this.ballOffsets.length > 0) {
			for (const offset of this.ballOffsets) {
				const ball = new Ball(lerp(offset, this.x, this.x + this.width), this.y);
				calculateBallVelocity(ball, offset, options.ballSettings);
				options.manager.addEntity(ball);
			}
		}
		this.ballOffsets.length = 0;
		if (this.powerups.lasers) {
			const laser = new Laser(this.x, this.y);
			options.manager.addEntity(laser);
			options.manager.addEntity(new Laser(this.x + this.width - laser.width, this.y));
		}
	}
}
