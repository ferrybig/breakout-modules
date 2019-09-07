import Entity from '../Entity.js';
import Background from '../helpers/Background.js';
import LevelLoader from '../helpers/LevelLoader.js';
import simpleMenu from './helpers/simpleMenu.js';
import * as icons from '../../icons.js';

export default simpleMenu('overlays/difficulty-selection', [
	{
		text: 'Credits',
		font: 'big',
	},
	{
		text: 'Game internals',
	},
	{
		text: 'Ferrybig',
		font: 'small',
	},
	{
		text: 'Level design',
	},
	{
		text: 'Ferrybig',
		font: 'small',
	},
	{
		text: 'Images & sound',
	},
	{
		text: 'Ferrybig',
		font: 'small',
	},
	{
		text: 'Lead developer',
	},
	{
		text: 'Ferrybig',
		font: 'small',
	},
	{
		text: 'Back',
		action: 'back',
		iconLeft: icons.left,
	},
], (options) => {
	options.manager.addEntity(new Background(33));
});

