const BUTTON_WIDTH = 500;
const BUTTON_HEIGHT = 70;
const BUTTON_SPACING = 10;

export default class LayoutHelper {
	constructor(buttons) {
		this.buttons = buttons;
	}

	layout(x, y, width, height, ...args) {
		const areaRequired = (this.buttons.length * (BUTTON_HEIGHT + BUTTON_SPACING)) - BUTTON_SPACING;
		const xOffset = x + width / 2 - BUTTON_WIDTH / 2;
		const yOffset = y + height / 2 - areaRequired / 2;
		return {
			entities: this.buttons.map((callback, index) => callback(
				xOffset, yOffset + index * (BUTTON_HEIGHT + BUTTON_SPACING),
				BUTTON_WIDTH, BUTTON_HEIGHT,
				...args,
			)),
			x: xOffset,
			y: yOffset,
			width: BUTTON_WIDTH,
			height: areaRequired,
		};
	}
}