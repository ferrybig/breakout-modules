import Entity from '../Entity.js';
import Background from '../helpers/Background.js';
import InteractiveMenuItem from './helpers/InteractiveMenuItem.js';
import LevelSelection from './LevelSelection.js';
import CreditsOverview from './CreditsOverview.js';
import simpleMenu from './helpers/simpleMenu.js';
import * as icons from '../../icons.js';

export default simpleMenu('overlays/main-menu', [
	{
		text: 'Breakout',
		font: 'big',
	},
	{
		text: 'Play',
		iconLeft: icons.right,
		iconRight: icons.left,
		action(options) {
			options.manager.replaceAll([new LevelSelection()]);
		}
	},
	{
		text: 'Leader boards',
		action(options) {
		}
	},
	{
		text: 'Level builder',
		action(options) {
		}
	},
	{
		text: 'Credits',
		action(options) {
			options.manager.replaceAll([new CreditsOverview()]);
		}
	},
], (options) => {
	options.manager.addEntity(new Background(33));
});
