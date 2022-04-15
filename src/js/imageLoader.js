let pendingRequests = 0;
let totalRequests = 0;
let error = null;
let imageListeners = [];

function notifyImageListeners() {
	for(const listener of imageListeners) {
		listener(pendingRequests, totalRequests);
	}
}

export default function loadImage(path, naturalWidth, naturalHeight, animationTimer = false) {
	pendingRequests++;
	totalRequests++;
	notifyImageListeners();
	const image = new Image(naturalWidth, naturalHeight);
	const returnResult = {
		drawToGraphics(graphics, x, y, width = naturalWidth, height = naturalHeight, renderTick) {
			throw new Error('Image not ready yet');
		},
		width: naturalWidth,
		height: naturalHeight,
		image,
		path,
	};
	image.onload = () => {
		if (animationTimer !== false) {
			const divided = image.naturalWidth / naturalWidth;
			returnResult.drawToGraphics = (graphics, x, y, width = naturalWidth, height = naturalHeight, renderTick) => {
				const sX = ((renderTick >> animationTimer) % divided) * naturalWidth;
				graphics.drawImage(image, sX, 0, naturalWidth, naturalHeight, x, y, width, height)
			}
		} else {
			returnResult.drawToGraphics = (graphics, x, y, width = naturalWidth, height = naturalHeight) => {
				graphics.drawImage(image, x, y, width, height)
			}
		}
		
		if (naturalHeight === undefined && naturalWidth === undefined) {
			returnResult.width = naturalWidth = image.naturalWidth;
			returnResult.height = naturalHeight = image.naturalHeight;
		}
		pendingRequests--;
		notifyImageListeners();
	}
	image.src = path;
	return returnResult;
}

export function subscribe(listener) {
	imageListeners.push(listener);
	listener(pendingRequests, totalRequests);
	return () => {
		const index = imageListeners.findIndex(listener);
		if(index >= 0) {
			imageListeners.splice(index, 1);
		}
	};
}
