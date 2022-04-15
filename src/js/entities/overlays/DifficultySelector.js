import Entity from '../Entity.js';
import Background from '../helpers/Background.js';
import LevelLoader from '../helpers/LevelLoader.js';
import simpleMenu from './helpers/simpleMenu.js';
import * as icons from '../../icons.js';
import { INITIAL_LIVES } from '../../settings.js';

const DIFFICULTY_LEVELS = [
	{
		name: 'Snail',
		modifier: 2,
		bonus: 0,
	},
	{
		name: 'Turtle',
		modifier: 3,
		bonus: 4,
	},
	{
		name: 'Easy',
		modifier: 4,
		icons: true,
		bonus: 16,
	},
	{
		name: 'Normal',
		modifier: 6,
		icons: true,
		bonus: 64,
	},
	{
		name: 'Hard',
		modifier: 9,
		icons: true,
		bonus: 256,
	},
	{
		name: 'Insane',
		modifier: 15,
		bonus: 1024,
	},
	{
		name: 'Godlike',
		modifier: 22,
		bonus: 4096,
	},
	{
		name: 'Chuck Norris',
		modifier: 33,
		bonus: 16384,
	},
];

export default simpleMenu('overlays/difficulty-selection', [
	{
		text: 'Select a difficulty',
		font: 'big',
	},
	...DIFFICULTY_LEVELS.map(level => ({
		text: level.name,
		iconLeft: level.icons ? icons.right : undefined,
		iconRight: level.icons ? icons.left : undefined,
		action(options) {
			options.ballSettings.modifier = level.modifier;
			options.score.bonus = level.bonus;
			options.score.continues = 0;
			options.score.score = 0;
			options.score.lives = INITIAL_LIVES;
			options.score.previeusScore = 0;
			options.manager.replaceAll([new LevelLoader()]);
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

