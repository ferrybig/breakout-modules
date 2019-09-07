import Entity from '../Entity.js';
import Powerup from '../Powerup.js';
import Lightning from '../Lightning.js';
import * as actions from '../../actions.js';
import * as particles from '../../particles.js';
import * as powerups from '../../powerups.js';

const TICKS_BETWEEN_POWERUPS = 60;

export default class PowerupController extends Entity {
	constructor(x, y) {
		super(x, y, 'helpers/powerup-controller', 0, 0);
		this.lastPowerupActive = 0;
		this.lastUpdateTick = 0;
	}

	render() {
	}

	update(_, updateTick) {
		this.lastUpdateTick = updateTick;
	}

	activatePowerup(options, x, y, powerup) {
		if (this.lastPowerupActive + TICKS_BETWEEN_POWERUPS < this.lastUpdateTick) {
			options.manager.addEntity(new Powerup(x, y, powerup));
			this.lastPowerupActive = this.lastUpdateTick;
		}
	}

	init(options) {
		this.destroyFunctions = [
			options.eventBus.addSubscription(({ target }) => {
				if (target.powerups.length > 0) {
					for (const powerup of target.powerups) {
						this.activatePowerup(options, target.middleX, target.middleY, powerup);
					}
					target.powerups.length = 0;
				}
			}, actions.ballHitBrick),
			options.eventBus.addSubscription(({ target }) => {
				if (target.powerups.length > 0) {
					for (const powerup of target.powerups) {
						this.activatePowerup(options, target.middleX, target.middleY, powerup);
					}
					target.powerups.length = 0;
				}
			}, actions.brickRemoved),
			options.eventBus.addSubscription(() => {
				for(const entity of options.manager.findAllByType('powerup')) {
					entity.timeToLive = 0;
				}
				for(const entity of options.manager.findAllByType('laser')) {
					entity.timeToLive = 0;
				}
				for(const entity of options.manager.findAllByType('lightning')) {
					entity.timeToLive = 0;
				}
			}, actions.reset),
			options.eventBus.addSubscription((event) => {
				switch(event.payload.name) {
					case powerups.instaDeath.name:
						options.eventBus.fireAction(actions.triggerDeath, event, this, this);
						break;
					case powerups.lightning.name:
						const bricks = options.manager.findAll(e => e.type === 'brick' && !e.definition.consideredDestroyed);
						if (bricks.length > 5) {
							bricks.length = 5;
						}
						for (let i = 0; i < bricks.length; i++) {
							options.manager.addEntity(new Lightning(bricks[i], i * 2 + 2))
						}
						break;
				}
			}, actions.powerupActivated),
		];
		window.powerupCheats = {};
		for (const [key, value] of Object.entries(powerups)) {
			window.powerupCheats[key] = () => {
				options.eventBus.fireAction(actions.powerupActivated, value, this, this);
			};
		}
	}

}