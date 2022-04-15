import Entity from '../Entity.js';
import Paddle from '../Paddle.js';
import Background from './Background.js';
import ParticleRenderer from './ParticleRenderer.js';
import ScoreController from './ScoreController.js';
import PowerupController from './PowerupController.js';
import RenderHint from './RenderHint.js';
import BallConroller from './BallController.js';

export default class LevelLoader extends Entity {
	constructor() {
		super(0, 0, 'helpers/level-loader', 0, 0);
	}

	init(options, updateTick) {
		this.timeToLive = 0;
		const level = options.levelTree.tree.levels[options.levelTree.level];
		const bricks = level(updateTick);
		options.manager.replaceAll([
			new Background(54 + 2 * options.levelTree.level),
			...bricks,
			// new RenderHint(),
			new ParticleRenderer(),
			new Paddle(600, 750),
			new ScoreController(1000, 0),
			new PowerupController(),
			new BallConroller(),
		]);
	}
}
