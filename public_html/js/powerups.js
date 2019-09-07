import loadImage from './imageLoader.js';

function makePowerup(name, rarity, image) {
	return {
		name,
		rarity,
		image,
	}
}

export const paddleGrow = makePowerup('paddle-grow', 'common', loadImage('img/powerups/paddle_grow.png'));
export const paddleShrink = makePowerup('paddle-shrink', 'common', loadImage('img/powerups/paddle_shrink.png'));
export const paddleLasers = makePowerup('paddle-lasers', 'uncommon', loadImage('img/powerups/paddle_lasers.png'));
export const paddleSticky = makePowerup('paddle-sticky', 'uncommon', loadImage('img/powerups/paddle_sticky.png'));
export const paddleMini = makePowerup('paddle-mini', 'rare', loadImage('img/powerups/paddle_mini.png'));
export const ballExtra = makePowerup('ball-extra', 'common', loadImage('img/powerups/ball_extra.png'));
export const ballExploding = makePowerup('ball-exploding', 'uncommon', loadImage('img/powerups/ball_exploding.png'));
export const ballUnstopable = makePowerup('ball-unstopable', 'uncommon', loadImage('img/powerups/ball_unstopable.png'));
export const ballSpeedUp = makePowerup('ball-speed-up', 'common', loadImage('img/powerups/ball_speedup.png'));
export const ballSpeedDown = makePowerup('ball-speed-down', 'common', loadImage('img/powerups/ball_slowdown.png'));
export const lightning = makePowerup('lightning', 'rare', loadImage('img/powerups/lightning.png'));
export const skipLevel = makePowerup('skip-level', 'legendary', loadImage('img/powerups/skip_level.png'));
export const weakenBlocks = makePowerup('weaker-blocks', 'rare', loadImage('img/powerups/weaken_blocks.png'));
export const instaDeath = makePowerup('insta-death', 'rare', loadImage('img/powerups/insta_kill.png'));
export const extraLive = makePowerup('extra-life', 'rare', loadImage('img/powerups/extra_life.png'));
