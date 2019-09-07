import { fraction } from '../../mathUtils.js';
import Entity from '../Entity.js';
import * as actions from '../../actions.js';

class ParticleCluster extends Entity {
	constructor(x, y, definition, velX = 0, velY = 0) {
		super(x, y, 'particle-cluster');
		this.definition = definition;
		this.timeToLive = definition.timeToLive;

		this.particles = [];
		for (let i = 0; i < definition.count; i++) {
			const selected = definition.particles[Math.floor(Math.random() * definition.particles.length)];
			const angle = Math.random() * Math.PI * 2;
			const speed = (Math.random() * 0.5 + 0.5) * selected.speed;

			this.particles.push({
				vel: {
					x: Math.sin(angle) * speed * 2 + velX,
					y: Math.cos(angle) * speed + velY,
				},
				pos: {
					x,
					y,
				},
				size: selected.size,
				sizeGlow: selected.sizeGlow,
				speedDecay: selected.speedDecay,
				sizeDecay: selected.sizeDecay,
				gravity: selected.gravity,
				glowTexture: selected.glowTexture,
				mainTexture: selected.mainTexture,
			});
		}
	}

	update() {
		this.timeToLive--;
		this.size *= this.definition.sizeDecay;
		this.sizeGlow *= this.definition.sizeDecay;
		for(let i = 0; i < this.particles.length; i++) {
			this.particles[i].pos.x += this.particles[i].vel.x;
			this.particles[i].pos.y += this.particles[i].vel.y;
			this.particles[i].vel.x *= this.particles[i].speedDecay;
			this.particles[i].vel.y *= this.particles[i].speedDecay;
			this.particles[i].vel.y += this.particles[i].gravity;
			this.particles[i].size *= this.particles[i].sizeDecay;
			this.particles[i].sizeGlow *= this.particles[i].sizeDecay;
		}
	}

	render(graphics) {
		const part = fraction(this.timeToLive, 0, this.definition.timeToLive);
		for(const particle of this.particles) {
			graphics.beginPath();
			graphics.fillStyle = particle.glowTexture.replace('*', part * 0.5);
			graphics.moveTo(particle.pos.x, particle.pos.y);
			graphics.arc(particle.pos.x, particle.pos.y, particle.sizeGlow, 0, Math.PI * 2, true);
			graphics.closePath();
			graphics.fill();
		}

		for(const particle of this.particles) {
			graphics.beginPath();
			graphics.fillStyle = particle.mainTexture.replace('*', part);
			graphics.moveTo(particle.pos.x, particle.pos.y);
			graphics.arc(particle.pos.x, particle.pos.y, particle.size, 0, Math.PI * 2, true);
			graphics.closePath();
			graphics.fill();
		}
	}
}

export default class ParticleRenderer extends Entity {
	constructor() {
		super(0, 0, 'particle-renderer'); // TODO: Make every particle function just add its own particle cluster to the manager
		this.manager = null;
	}

	addParticle(type, x, y, velX, velY) {
		this.manager.addEntity(new ParticleCluster(x, y, type, velX, velY));
	}

	init(options, updateTick) {
		this.destroyFunctions = [
			options.eventBus.addSubscription(({ payload }) => {
				this.addParticle(payload.type, payload.x, payload.y, payload.velX || 0, payload.velY || 0);
			}, actions.particleActivated),
		];
		this.manager = options.manager;
	}

	update() {
	}

	render() {
	}
}
