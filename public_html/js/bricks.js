import loadImage from './imageLoader.js';

const STAY_THE_SAME = Symbol();

function makeBrick(name, texture, consideredDestroyed, nextState, extra) {
	const brick = {
		name,
		texture,
		consideredDestroyed,
		nextState,
		...extra
	};
	if (nextState === STAY_THE_SAME) {
		brick.nextState = brick;
	}
	return brick;
};

//export const basic = makeBrick('basic', '#808080', false, null);
//export const basicRed = makeBrick('basic', '#ff8080', false, null);
//export const basicBlue = makeBrick('basic', '#8080ff', false, null);
//export const basicGreen = makeBrick('basic', '#80ff80', false, null);
//export const basicYellow = makeBrick('basic', '#ffff00', false, null);
//export const glassStage3 = makeBrick('glass', '#444444', false, null);
//export const glassStage2 = makeBrick('glass', '#555555', false, glassStage3);
//export const glass = makeBrick('glass', '#dddddd', false, glassStage2);
//export const activatedShield = makeBrick('activated-shield', '#dd9999', true, STAY_THE_SAME);
//export const shield = makeBrick('shield', '#9999dd', true, activatedShield);
//export const explosive = makeBrick('explosive', '#ff9900', false, STAY_THE_SAME, { explode: true });

export const basic = makeBrick('basic', loadImage('img/bricks/basic.png'), false, null);
export const basicRed = makeBrick('basic', loadImage('img/bricks/red.png'), false, null);
export const basicBlue = makeBrick('basic', loadImage('img/bricks/blue.png'), false, null);
export const basicGreen = makeBrick('basic', loadImage('img/bricks/green.png'), false, null);
export const basicYellow = makeBrick('basic', loadImage('img/bricks/yellow.png'), false, null);
export const glassStage3 = makeBrick('glass', loadImage('img/bricks/glass_stage3.png'), false, null);
export const glassStage2 = makeBrick('glass', loadImage('img/bricks/glass_stage2.png'), false, glassStage3);
export const glass = makeBrick('glass', loadImage('img/bricks/glass.png'), false, glassStage2);
export const activatedShield = makeBrick('activated-shield', loadImage('img/bricks/shield_activated.png', 60, 30, 2), true, STAY_THE_SAME);
export const shield = makeBrick('shield', loadImage('img/bricks/shield.png'), true, activatedShield);
export const explosive = makeBrick('explosive', loadImage('img/bricks/explosive.png', 60, 30, 1), false, STAY_THE_SAME, { explode: true });
