import Entity from '../Entity.js';
import Background from '../helpers/Background.js';
import Text from './helpers/Text.js';
import InteractiveMenuItem from './helpers/InteractiveMenuItem.js';

export default class GameCOmplete extends Entity {
	constructor() {
		super(0, 0, 'overlays/game-complete', 0, 0);
	}

	init(options) {
		this.width = options.width;
		this.height = options.height;

		options.manager.addEntity(new Background(33));
		options.manager.addEntity(new Text(
			this, this.middleX - 150, 0, 300, 100,
			'Game Complete', 'big',
		));
		options.manager.addEntity(new Text(
			this, this.middleX - 150, 100, 300, 100,
			'Score: ' + options.score.score, 'small',
		));
		options.manager.addEntity(new Text(
			this, this.middleX - 150, 150, 300, 100,
			'Levels completed: ' + options.levelTree.level, 'small',
		));
		options.manager.addEntity(new Text(
			this, this.middleX - 150, 200, 300, 100,
			'Difficulty bonus: ' + (options.levelTree.level * options.score.bonus), 'small',
		));
		const livesLeft = options.score.continues > 0 ? 0 : options.score.lives;
		options.manager.addEntity(new Text(
			this, this.middleX - 150, 250, 300, 100,
			'Lives left: ' + livesLeft, 'small',
		));
		options.manager.addEntity(new Text(
			this, this.middleX - 150, 300, 300, 100,
			'Level tree: ' + options.levelTree.tree.name, 'small',
		));
		options.manager.addEntity(new InteractiveMenuItem(this,
			this.middleX - 150, this.height - 100, 300, 100, "Continue", () => {
				const menuObject = options.menuObjects[0];
				menuObject.ressurect();
				options.manager.replaceAll([menuObject]);
			}
		));
	}

	update() {
	}

	render() {
	}
};
