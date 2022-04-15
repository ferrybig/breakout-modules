import Entity from '../Entity.js';
import Paddle from '../Paddle.js';
import Background from './Background.js';
import ParticleRenderer from './ParticleRenderer.js';
import ScoreController from './ScoreController.js';
import PowerupController from './PowerupController.js';
import BallConroller from './BallController.js';
import { subscribe as imageLoaderSubscribe } from '../../imageLoader.js';

export default class LevelLoader extends Entity {
	constructor(newEntities) {
		super(0, 0, 'helpers/loading-screen', 0, 0);
		this.newEntities = newEntities;
	}

	init() {
		this.destroyFunctions = [
			imageLoaderSubscribe((pendingRequests, totalRequests) => {
				this.pendingRequests = pendingRequests;
				this.totalRequests = totalRequests;
			})
		]
	}

	update(options) {
		if(this.pendingRequests === 0) {
			options.manager.replaceAll(this.newEntities);
		}
	}

	render(graphics, options) {
		graphics.fillStyle = 'black';
		graphics.fillRect(0, 0, options.width, options.height);
		graphics.fillStyle = 'white';
		graphics.font = '36px serif'
		graphics.textBaseline = 'middle'
		graphics.textAlign = 'center'
		graphics.fillText('Loading ' + (this.totalRequests - this.pendingRequests) + '/' + this.totalRequests, options.width / 2, options.height / 2);
	}
}
