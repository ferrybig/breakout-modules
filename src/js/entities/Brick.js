import Entity from './Entity.js';
import * as actions from '../actions.js';
import * as particles from '../particles.js';

export default class Brick extends Entity {
	constructor(x, y, definition, powerups = [], width = 60, height = 30) {
		super(x, y, 'brick', width, height);
		if(!definition) {
			throw new Error('definition is falsy');
		}
		this.definition = definition;
		this.powerups = powerups;
		this.eventBus = undefined; // lateinit
		this.manager = undefined; // lateinit
		this.explodeAt = undefined
	}

	render(graphics, _, renderTick) {
		const size = 6;
		if (typeof this.definition.texture === 'string') {
			graphics.fillStyle = this.definition.texture;
			graphics.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2)
		} else {
			this.definition.texture.drawToGraphics(graphics, this.x, this.y, this.width, this.height, renderTick)
		}
	}

	update(options, updateTick) {
		if(this.explodeAt <= updateTick && this.timeToLive !== 0) {
			this.timeToLive = 0;
			this.eventBus.fireAction(actions.brickRemoved, { explode: true }, this, this);
			if(this.definition.explode) {
				this.explode(updateTick);
			}
		}
	}

	init(options) {
		this.eventBus = options.eventBus;
		this.manager = options.manager;
	}

	onHit(unstopableBallPowerupActive, source, updateTick) {
		const next = unstopableBallPowerupActive ? null : this.definition.nextState;
		if (this.definition.explode) {
			if (this.timeToLive !== 0) {
				this.explode(updateTick);
				this.timeToLive = 0;
				this.eventBus.fireAction(actions.brickRemoved, { explode: true }, source, this);
			}
		} else if (!next) {
			if (this.timeToLive !== 0) {
				this.timeToLive = 0;
				this.eventBus.fireAction(actions.brickRemoved, {}, source, this);
			}
		} else if (this.definition !== next) {
			this.eventBus.fireAction(actions.brickUpdated, {old: this.definition, next }, source, this);
			this.definition = next;
		}
	}

	explode(updateTick) {
		this.timeToLive = 0;
		this.eventBus.fireAction(actions.particleActivated, {
			type: particles.explosion,
			x: this.x + this.width * 0.5,
			y: this.y + this.height * 0.5,
		}, this, this);
		const neighbours = this.manager.findAll(e => e.type === 'brick' &&
			e !== this &&
			Math.abs(e.x - this.x) <= this.width &&
			Math.abs(e.y - this.y) <= this.height
		)
		for(const brick of neighbours) {
			brick.explodeBrick(updateTick);
		}
	}

	explodeBrick(updateTick) {
		const newExplodeAt = updateTick + 2;
		this.explodeAt = this.explodeAt < newExplodeAt ? this.explodeAt : newExplodeAt; // consider that this.explodeAt is undefined here
	}
}