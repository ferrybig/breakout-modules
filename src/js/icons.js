import loadImage from './imageLoader.js';

function makeIcon(image) {
	return image;
}

export const right = makeIcon(loadImage('img/icons/right.png'));
export const left = makeIcon(loadImage('img/icons/left.png'));
export const down = makeIcon(loadImage('img/icons/down.png'));
export const up = makeIcon(loadImage('img/icons/up.png'));
