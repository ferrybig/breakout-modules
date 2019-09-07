import Entity from '../Entity.js';
import Ball from '../Ball.js';
import * as actions from '../../actions.js';
import * as particles from '../../particles.js';
import * as powerups from '../../powerups.js';
import * as console from '../../console.js';
import { clampToArray } from '../../mathUtils.js';

const INITIAL_BALL_COUNT = 1;

const SPEEDS = [];
{
	const SPEEDUP_FACTOR = 1.005;
	let speed = 0.9;
	for(let i = 0; i < 200; i++) {
		SPEEDS.push(speed);
		speed *= SPEEDUP_FACTOR;
	}
}

function sign(val) {
	return val > 0 ? 1 : -1;
}

export default class BallController extends Entity {

	constructor(x, y) {
		super(x, y, 'helpers/ball-controler', 196, 100);
		this.respawnTimer = -1;
		this.balls = 0;
		this.speedIndex = 10;
	}

	render() {
	}

	update(options) {
		if (this.respawnTimer >= 0) {
			if (this.respawnTimer-- === 0) {
				this.respawnBall(options, INITIAL_BALL_COUNT)
			}
		}
	}

	respawnBall(options, balls) {
		this.balls += balls;
		this.setBallSpeed(options);
		options.ballSettings.powerups = {
			exploding: false,
			unstopable: false,
		};
		const paddle = options.manager.findByType('paddle');
		for (let i = 0; i < balls; i++) {
			paddle.spawnBall();
		}

		const powerups = options.manager.findAllByType('powerup');
		for (const powerup of powerups) {
			powerup.timeToLive = 0;
		}
	}

	setBallSpeed(options) {
		options.ballSettings.speed = options.ballSettings.modifier * SPEEDS[this.speedIndex];
	}

	updateSpeed(options, speed) {
		this.speedIndex = clampToArray(speed, SPEEDS);
		this.setBallSpeed(options)
	}

	updateExistingBallSpeed(options) {
		for (const ball of options.manager.findAllByType('ball')) {
			const speed = Math.sqrt(ball.vel.x ** 2 + ball.vel.y ** 2);
			const speedUpFactor = options.ballSettings.speed / speed;
			ball.vel.x *= speedUpFactor;
			ball.vel.y *= speedUpFactor;
		}

	}

	init(options) {
		this.respawnBall(options, INITIAL_BALL_COUNT)
		this.destroyFunctions = [
			options.eventBus.addSubscription(({ source }) => {
				options.eventBus.fireAction(actions.particleActivated, {
					type: particles.explosion,
					x: source.x,
					y: source.y,
					velY: -5,
				}, this, this);
				source.timeToLive = 0;
				this.balls--;
				if (this.balls <= 0) {
					options.eventBus.fireAction(actions.triggerDeath, undefined, this, this);
				}
			}, actions.ballHitDeathZone),
			options.eventBus.addSubscription(() => {
				if (this.speedIndex < 100) {
					this.updateSpeed(options, this.speedIndex + 1)
				}
				console.log('New speed: ' + options.ballSettings.speed);
			}, actions.ballHitPaddle),
			options.eventBus.addSubscription(() => {
				this.respawnTimer = 60;
				this.speedIndex = 10;
				options.ballSettings.powerups.exploding = false;
				options.ballSettings.powerups.unstopable = false;
				for (const ball of options.manager.findAllByType('ball')) {
					if (ball.timeToLive !== 0) {
						ball.timeToLive = 0;
						options.eventBus.fireAction(actions.particleActivated, {
							type: particles.explosion,
							x: ball.x,
							y: ball.y,
						}, this, this);
					}
				}
			}, actions.reset),
			options.eventBus.addSubscription(({ payload }) => {
				switch(payload.name) {
					case powerups.ballExtra.name:
						const balls = options.manager.findAllByType('ball');
						for (const ball of balls) {
							const newBall = new Ball(ball.x, ball.y);
							const halfSpeed = Math.sqrt((ball.vel.y ** 2 + ball.vel.x ** 2) / 2);
							newBall.vel.x = -halfSpeed * sign(ball.vel.x);
							newBall.vel.y = -halfSpeed;
							options.manager.addEntity(newBall)
						}
						const paddle = options.manager.findByType('paddle');
						if (paddle.ballOffsets.length > 0) {
							paddle.ballOffsets.sort();
							const newBallCount = paddle.ballOffsets.length;
							for (let i = 0; i < newBallCount; i++) {
								paddle.spawnBall();
							}
						}
						this.balls *= 2;
						break;
					case powerups.ballExploding.name:
						options.ballSettings.powerups.exploding = true;
						break;
					case powerups.ballUnstopable.name:
						options.ballSettings.powerups.unstopable = true;
						break;
					case powerups.ballSpeedUp.name:
						this.updateSpeed(options, this.speedIndex + 70);
						this.updateExistingBallSpeed(options);
						console.log('New speed: ' + options.ballSettings.speed);
						break;
					case powerups.ballSpeedDown.name:
						this.updateSpeed(options, this.speedIndex - 70);
						console.log('New speed: ' + options.ballSettings.speed);
						this.updateExistingBallSpeed(options);
						break;
				}
			}, actions.powerupActivated),
		]
	}

}