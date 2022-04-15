import Entity from '../Entity.js';
import InteractiveMenuItem from './helpers/InteractiveMenuItem.js';
import LevelLoader from '../helpers/LevelLoader.js';
import GameComplete from './GameComplete.js';
import { fraction } from '../../mathUtils.js';
import { INITIAL_LIVES } from '../../settings.js';

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
		this.width = options.width;
		this.height = options.height;
	}

	update(options) {
		this.animationCounter++;
		if (this.animationCounter === ANIMATION_FADE_TIME) {
			options.manager.addEntity(new InteractiveMenuItem(this,
				this.middleX - 300, this.middleY + BUTTON_OFFSET, 300, 100, "Yes", () => {
					options.score.score = options.score.previeusScore;
					options.score.lives = INITIAL_LIVES;
					options.score.continues++;
					options.manager.replaceAll([new LevelLoader()])
				}
			));
			options.manager.addEntity(new InteractiveMenuItem(this,
				this.middleX - 0, this.middleY + BUTTON_OFFSET, 300, 100, "No", () => {
					options.manager.replaceAll([new GameComplete()]);
				}
			));
		}
	}

	render(graphics, options) {
		const animationFraction = this.animationCounter < ANIMATION_FADE_TIME ? fraction(this.animationCounter, 0, ANIMATION_FADE_TIME) : 1;
		const fade = animationFraction * FADE_AMOUNT;
		const textFade = animationFraction * TEXT_FADE_AMOUNT;
		const textOffset = animationFraction * GAME_OVER_OFFSET;
		graphics.fillStyle = 'rgba(0,0,0,' + fade + ')';
		graphics.fillRect(0, 0, options.width, options.height);
		graphics.fillStyle = 'rgba(255,255,255,' + textFade + ')';
		graphics.font = '144px serif';
		graphics.textBaseline = 'middle';
		graphics.textAlign = 'center';
		graphics.fillText('Game over', this.middleX, this.middleY + textOffset);
		if (this.animationCounter > ANIMATION_FADE_TIME) {
			graphics.font = '36px serif';
			graphics.fillText('Continue?', this.middleX, this.middleY + CONTINUE_OFFSET);
		}

	}
}
