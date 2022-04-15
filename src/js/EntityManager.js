export default class EntityManager {
	constructor() {
		this.entities = [];
		this.initIndex = 0;
		this.entityReplacement = null;
	}
	update(options, updateTick) {
		if (this.entityReplacement) {
			for (let i = 0; i < this.initIndex; i++) {
				this.entities[i].timeToLive = 0;
				this.entities[i].destroy();
			}
			this.entities = this.entityReplacement;
			this.initIndex = 0;
			this.entityReplacement = null;
		}
		let length = this.entities.length;
		if (this.initIndex < length) {
			for (let i = this.initIndex; i < length; i++) {
				this.entities[i].init(options, updateTick);
			}
		}
		this.initIndex = length;
		for (let i = 0; i < length; i++) {
			this.entities[i].update(options, updateTick);
			if (this.entities[i].timeToLive === 0) {
				this.entities[i].destroy();
				this.entities.splice(i, 1);
				this.initIndex--;
				i--;
				length--;
			}
		}
	}
	render(graphics, options, renderTick) {
		for (let i = 0; i < this.entities.length; i++) {
			if (this.entities[i].timeToLive !== 0 && !this.entities[i].renderBlocked) {
				this.entities[i].render(graphics, options, renderTick, i);
			}
		}
	}
	clear() {
		this.replaceAll([]);
	}
	addEntity(entity) {
		this.entities.push(entity);
	}
	findByType(type) {
		const res = this.entities.find(e => e.type === type);
		if (!res) {
			throw new Error('Entity ' + type + ' not found');
		}
		return res;
	}
	findAllByType(type) {
		return this.entities.filter(e => e.type === type);
	}
	find(filter) {
		const res = this.entities.find(filter);
		if (!res) {
			throw new Error('Entity by filter not found');
		}
		return res;
	}
	findAll(filter) {
		return this.entities.filter(filter);
	}
	replaceAll(newEntities) {
		this.entityReplacement = newEntities;
	}
}
