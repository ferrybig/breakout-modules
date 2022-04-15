import Entity from '../Entity.js';
import Powerup from '../Powerup.js';
import GameOver from '../overlays/GameOver.js';
import LevelComplete from '../overlays/LevelComplete.js';
import * as powerups from '../../powerups.js';
import * as actions from '../../actions.js';
import * as particles from '../../particles.js';
import { lerp, clamp } from '../../mathUtils.js';

const INITIAL_LIVE_COUNT = 3;
const INITIAL_SCORE_COUNT = 0;
const INITIAL_BALL_SPEED = 6;
const POWERUP_SCORE = 10;
const SCORE_BRICK = 100;

export default class ScroeController extends Entity {
	constructor(x, y) {
		super(x, y, 'helpers/score-controller', 196, 100);
		this.brickCount = 0;
		this.totalBrickCount = 0;
		this.scoreDisplay = 0;
	}

	render(graphics, options) {
		graphics.fillStyle = 'white'
		graphics.font = '36px serif'
		graphics.textBaseline = 'hanging'
		graphics.textAlign = 'right'
		graphics.fillText( options.score.lives + ' lives' , this.x + this.width, this.y)
		graphics.fillText( this.scoreDisplay + ' score' , this.x + this.width, this.y + 36)
		graphics.fillText( this.brickCount + '/' + this.totalBrickCount, this.x + this.width, this.y + 36 + 36)
	}

	update(options, updateTick) {
		this.scoreDisplay = clamp(options.score.score, this.scoreDisplay - 100, this.scoreDisplay + 100);
		if ((updateTick >> 11) === 0) {
			this.brickCount = options.manager.findAll(e => e.type === 'brick' && !e.definition.consideredDestroyed).length;
			this.checkLevelComplete(options);
		}
	}

	addScore(options, score) {
		options.score.score += score;
	}

	checkLevelComplete(options) {
		if (this.brickCount === 0 && this.timeToLive !== 0) {
			this.timeToLive = 0;
			options.manager.addEntity(new LevelComplete());
		}
	}

	init(options) {
		this.totalBrickCount = this.brickCount = options.manager.findAll(e => e.type === 'brick' && !e.definition.consideredDestroyed).length;
		this.scoreDisplay = options.score.score;
		options.score.brickCount = this.brickCount;
		this.destroyFunctions = [
			options.eventBus.addSubscription(({ payload, target }) => {
				if (!target.definition.consideredDestroyed && payload.consideredDestroyed) {
					this.addScore(options, SCORE_BRICK);
					this.brickCount--;
					this.checkLevelComplete(options);
				}
			}, actions.brickUpdated),
			options.eventBus.addSubscription(({ payload, target }) => {
				if (!target.definition.consideredDestroyed) {
					this.addScore(options, SCORE_BRICK);
					this.brickCount--;
					this.checkLevelComplete(options);
				}
			}, actions.brickRemoved),
			options.eventBus.addSubscription(() => {
				options.score.lives--;
				if (options.score.lives >= 0) {
					options.eventBus.fireAction(actions.reset, undefined, this, this);
				} else {
					if (this.timeToLive !== 0) {
						this.timeToLive = 0;
						options.manager.addEntity(new GameOver());
					}
				}
			}, actions.triggerDeath),
			options.eventBus.addSubscription(({ payload }) => {
				this.addScore(options, POWERUP_SCORE);
				switch(payload.name) {
					case powerups.skipLevel.name:
						if (this.brickCount > 0) {
							this.brickCount = 0;
							this.checkLevelComplete(options);
						}
						break;
					case powerups.extraLive.name:
						options.score.lives++;
						options.eventBus.fireAction(actions.particleActivated, {
							type: particles.explosion,
							x: options.width,
							y: 0,
							velY: 5,
							velX: -5,
						}, this, this);
						break;
				}
			}, actions.powerupActivated),
		]
		// Cheat
		window.skipLevel = () => {
			if (this.brickCount > 0) {
				this.brickCount = 0;
				this.checkLevelComplete(options);
			}
		}
	}

}