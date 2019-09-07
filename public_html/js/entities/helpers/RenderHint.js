import Entity from '../Entity.js';
import Paddle from '../Paddle.js';
import Background from './Background.js';
import ParticleRenderer from './ParticleRenderer.js';
import ScoreController from './ScoreController.js';
import PowerupController from './PowerupController.js';
import BallConroller from './BallController.js';
import { subscribe as imageLoaderSubscribe } from '../../imageLoader.js';

export default class LevelLoader extends Entity {
	constructor() {
		super(0, 0, 'helpers/render-hint', 0, 0);
		this.lastRenderIndex = 0;
		this.pattern = null;
		this.element = document.createElement('canvas');
	}

	init(options) {
		for (const entity of options.manager.entities) {
			if (entity === this) {
				return;
			}
			entity.setRenderBlocked(true);
		}
	}

	rerender(graphics, options, renderTick) {
		this.element.width = options.width;
		this.element.height = options.height;
		const context = this.element.getContext('2d');

		for (const entity of options.manager.entities) {
			if (entity === this) {
				break;
			}
			entity.render(context, options, renderTick);
		}
		this.pattern = graphics.createPattern(this.element, 'no-repeat');
	}

	render(graphics, options, renderTick, renderIndex) {
		if (this.lastRenderIndex !== renderIndex) {
			this.rerender(graphics, options, renderTick);
			this.lastRenderIndex = renderIndex;
		}
		graphics.fillStyle = this.pattern;
		graphics.fillRect(0, 0, options.width, options.height);
	}
}
