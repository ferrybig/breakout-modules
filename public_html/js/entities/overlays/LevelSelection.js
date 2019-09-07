import Entity from '../Entity.js';
import Background from '../helpers/Background.js';
import InteractiveMenuItem from './helpers/InteractiveMenuItem.js';
import DifficultySelector from './DifficultySelector.js';
import simpleMenu from './helpers/simpleMenu.js';
import levels from '../../levels/index.js';
import * as icons from '../../icons.js';

export default simpleMenu('overlays/level-selection', [
	{
		text: 'Select a level tree',
		font: 'big',
	},
	...levels.map((level, index) => ({
		text: level.name,
		iconLeft: index === 0 ? icons.right : undefined,
		iconRight: index === 0 ? icons.left : undefined,
		action(options) {
			options.levelTree.tree = level;
			options.levelTree.level = 0;
			options.manager.replaceAll([new DifficultySelector()]);
		}
	})),
	{
		text: 'Back',
		action: 'back',
		iconLeft: icons.left,
	},
], (options) => {
	options.manager.addEntity(new Background(33));
});

