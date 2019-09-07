import Entity from '../../Entity.js';
import Text from './Text.js';
import InteractiveMenuItem from './InteractiveMenuItem.js';
import LayoutHelper from './LayoutHelper.js';
import * as console from '../../../console.js';

const LAYOUT_BUTTON_OFFSET = 0;

export function makeMenuElement(definition) {
	return (x, y, width, height, thisInstance, options) => {
		if(definition.action) {
			return new InteractiveMenuItem(thisInstance, x, y, width, height, definition.text, (event, point) => {
				console.log('click', definition.text, point);
				if (definition.action === 'back') {
					const menuObject = options.menuObjects[options.menuObjects.length - 2];
					menuObject.ressurect();
					options.manager.replaceAll([menuObject]);
				} else {
					definition.action(options, point, event);
				}
			}, {
				left: definition.iconLeft,
				right: definition.iconRight,
			});
		} else {
			return new Text(thisInstance, x, y, width, height, definition.text, definition.font || 'normal');
		}
	}
}

export default function(name, buttons, init = () => {}, offset = LAYOUT_BUTTON_OFFSET) {
	const layout = new LayoutHelper(buttons.map(makeMenuElement));
	return class SimpleMenu extends Entity {
		constructor() {
			super(0, 0, name, 0, 0);
		}

		init(options) {
			const index = options.menuObjects.findIndex(other => other.type === this.type);
			if (index >= 0) {
				options.menuObjects.length = index;
			}
			options.menuObjects.push(this);
			this.width = options.width;
			this.height = options.height;
			const layoutResult = layout.layout(0, offset, this.width, this.height, this, options);
			init(options, layoutResult, this);
			for (const button of layoutResult.entities) {
				options.manager.addEntity(button);
			}
		}

		ressurect() {
			this.timeToLive = undefined;
		}
	};
}
