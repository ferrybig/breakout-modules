export function createPattern(width, height, type, callback) {
	const element = document.createElement('canvas');
	element.width = width;
	element.height = height;
	const context = element.getContext('2d');
	callback(context, { width, height, element });
	return (graphics) => graphics.createPattern(element, type);
}

const BACKGROUND_PATTERN = createPattern(4, 4, 'repeat', graphics => {
	graphics.fillStyle = 'rgb(80, 80, 80)';
	graphics.fillRect(0, 0, 2, 2);
	graphics.fillRect(2, 2, 2, 2);
	graphics.fillStyle = 'rgb(0, 0, 0)';
	graphics.fillRect(0, 2, 2, 2);
	graphics.fillRect(2, 0, 2, 2);
})

export default class Ui {
	constructor(element, renderOptions, onExclusiveAccessRequested) {
		this.renderOptions = renderOptions;
		this.element = element;
		this.width = renderOptions.width;
		this.height = renderOptions.height;
		this.updatePending = true;

		this.element.width = this.width;
		this.element.height = this.height;
		this.context = element.getContext('2d');
		this.context.requestExclusiveAccess = onExclusiveAccessRequested;
		this.sizeInvalid = true;
		this.backgroundPattern = BACKGROUND_PATTERN(this.context);
	}
	track() {
		const windowListener = () => {
			this.sizeInvalid = true;
		};
		window.addEventListener('resize', windowListener);
		return () => {
			window.removeEventListener('resize', windowListener);
		}
	}
	sizeCanvas() {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		this.element.width = windowWidth;
		this.element.height = windowHeight;

		const scaling = Math.min(windowWidth / this.width, windowHeight / this.height);
		const scaledWidth = this.width * scaling;
		const scaledHeight = this.height * scaling;

		const offsetX = (windowWidth - scaledWidth) / 2;
		const offsetY = (windowHeight - scaledHeight) / 2;

		// Set render options
		this.renderOptions.canvasOffset.x = offsetX;
		this.renderOptions.canvasOffset.y = offsetY;
		this.renderOptions.canvasOffset.scale = scaling;
	}
	beginRender() {
		if (this.sizeInvalid) {
			this.sizeCanvas();
			this.sizeInvalid = false
		}
		this.context.setTransform(
			this.renderOptions.canvasOffset.scale, 0, 0,
			this.renderOptions.canvasOffset.scale, this.renderOptions.canvasOffset.x, this.renderOptions.canvasOffset.y,
		);
		return this.context;
	}

	finishRender() {
		this.context.setTransform(
			1, 0, 0,
			1, 0, 0,
		);
		this.context.fillStyle = this.backgroundPattern;
		if (this.renderOptions.canvasOffset.x) {
			this.context.fillRect(0, 0, this.renderOptions.canvasOffset.x, this.element.height);
			this.context.fillRect(this.element.width - this.renderOptions.canvasOffset.x, 0, this.renderOptions.canvasOffset.x, this.element.height);
		}
		if (this.renderOptions.canvasOffset.y) {
			this.context.fillRect(0, 0, this.element.width, this.renderOptions.canvasOffset.y);
			this.context.fillRect(0, this.element.height - this.renderOptions.canvasOffset.y, this.element.width, this.renderOptions.canvasOffset.y);
		}
	}
	setNMouseCursor(type) {
		this.element.style.cursor = type;
	}
}
