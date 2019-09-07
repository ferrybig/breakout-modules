import Entity from '../Entity.js';
import InteractiveMenuItem from './helpers/InteractiveMenuItem.js';
import LevelLoader from '../helpers/LevelLoader.js';
import GameComplete from './GameComplete.js';
import { fraction } from '../../mathUtils.js';
import * as console from '../../console.js';

const ANIMATION_FADE_TIME = 120;
const FADE_AMOUNT = 0.5;
const TEXT_FADE_AMOUNT = 1;
const TEXT_OFFSET = -100;
const CONTINUE_OFFSET = 0;
const BUTTON_OFFSET = 100;
const BUTTON_WIDTH = 300;

export default class LevelComplete extends Entity {
	constructor() {
		super(0, 0, 'overlays/level-complete', 0, 0);
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
				this.middleX - BUTTON_WIDTH / 2, this.middleY + BUTTON_OFFSET, BUTTON_WIDTH, 100, "Continue", () => {
					options.score.previeusScore = options.score.score + options.score.bonus;
					options.score.score = options.score.previeusScore;
					options.levelTree.level++;
					if (!options.levelTree.tree.levels[options.levelTree.level]) {
						console.log('Game complete', options.levelTree.tree, options.levelTree.level);
						// Load end score screen
						options.manager.replaceAll([new GameComplete()]);
					} else {
						console.log('Loading next level');
						options.manager.replaceAll([new LevelLoader()]);
					}
				}
			));
		}
	}

	render(graphics, options) {
		const animationFraction = this.animationCounter < ANIMATION_FADE_TIME ? fraction(this.animationCounter, 0, ANIMATION_FADE_TIME) : 1;
		const fade = animationFraction * FADE_AMOUNT;
		const textFade = animationFraction * TEXT_FADE_AMOUNT;
		const textOffset = animationFraction * TEXT_OFFSET;
		graphics.fillStyle = 'rgba(0,0,0,' + fade + ')';
		graphics.fillRect(0, 0, options.width, options.height);
		graphics.fillStyle = 'rgba(255,255,255,' + textFade + ')';
		graphics.font = '144px serif';
		graphics.textBaseline = 'middle';
		graphics.textAlign = 'center';
		graphics.fillText('Level complete', this.middleX, this.middleY + textOffset);
		if (this.animationCounter > ANIMATION_FADE_TIME) {
			graphics.font = '36px serif';
			graphics.fillText('Score: ' + options.score.score + ' (+' + options.score.bonus + ')', this.middleX, this.middleY + CONTINUE_OFFSET);
		}

	}
}
