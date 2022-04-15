import Entity from '../Entity.js';
import InteractiveMenuItem from './helpers/InteractiveMenuItem.js';
import { fraction } from '../../mathUtils.js';

const ANIMATION_FADE_TIME = 120;
const FADE_AMOUNT = 0.5;
const TEXT_FADE_AMOUNT = 1;
const GAME_OVER_OFFSET = -100;
const CONTINUE_OFFSET = 0;
const BUTTON_OFFSET = 100;

export default class GameOver extends Entity {
	constructor() {
		super(0, 0, 'overlays/game-over', 0, 0);
		this.animationCounter = 0;
	}

	init(options) {
	}

	update(options) {
	}

	render(graphics, options) {
	}
}