import { removeByValue, pointInBox, assertUnreachable } from './mathUtils.js';

const NOOP_FUNCTION = () => {};

export const MouseState = {
	NO_HIT_AREAS: 'NO_HIT_AREAS',
	NO_HIT_AREAS_WITH_POINTER_LOCK: 'NO_HIT_AREAS_WITH_POINTER_LOCK',
	MOUSE_OUTSIDE_REGION: 'MOUSE_OUTSIDE_REGION',
	MOUSE_INSIDE_REGION: 'MOUSE_INSIDE_REGION',
};

export default class MouseTracker {
	constructor(canvasOffset) {
		this.regions = [];
		this.canvasOffset = canvasOffset;
		this.canvas = null;
		this.listeners = [];
		this.hasLock = false;
		this.lastState = MouseState.NO_HIT_AREAS;
		this.mouseListeners = [];
		this.lastPoint = {
			x: 0,
			y: 0,
		};
	}
	
	updateListeners(state) {
		if (state !== this.lastState) {
			for (const listener of this.listeners) {
				listener(state, this.lastState);
			}
			const hasLock = this.shouldHavePointerLock(this.lastState);
			const shouldLock = this.shouldHavePointerLock(state);

			if (!hasLock && shouldLock) {
				this.tryPointerLock();
			}
			if (hasLock && !shouldLock) {
				this.releasePointerLock();
			}

			this.lastState = state;
		}
	}

	tryPointerLock() {
		this.canvas.requestPointerLock()
	}
	releasePointerLock() {
		try {
			this.hasLock = false;
			if (document.pointerLockElement === this.canvas) {
				document.exitPointerLock();
			}
		} catch(e) {
			console.error(e);
		}
	}

	shouldHavePointerLock(state) {
		switch (state) {
			case MouseState.NO_HIT_AREAS_WITH_POINTER_LOCK:
				return true;
			case MouseState.NO_HIT_AREAS:
			case MouseState.MOUSE_OUTSIDE_REGION:
			case MouseState.MOUSE_INSIDE_REGION:
				return false;
			default:
				return assertUnreachable(state);
		}
	}

	addStateListener(listener) {
		listener(this.lastState);
		this.listeners.push(listener);
		return () => {
			removeByValue(this.listeners, listener);
		}
	}
	addMouseListener(listener) {
		const modifiedListener = {
			click: listener.click || NOOP_FUNCTION,
			move: listener.move || NOOP_FUNCTION,
		}
		this.mouseListeners.push(modifiedListener);
		return () => {
			removeByValue(this.mouseListeners, modifiedListener);
		}
	}

	eventToPoint(event) {
		let mouseX;
		let mouseY;
		if (event.eNow !== undefined) {
			mouseX = event.eNow.offsetX;
			mouseY = event.eNow.offsetY;
		} else if (event.offsetX !== undefined) {
			mouseX = event.offsetX;
			mouseY = event.offsetY;
		} else if (event.layerX) {
			mouseX = event.layerX;
			mouseY = event.layerY;
		} else {
			throw new Error('unable to get the mouse position');
		}

		return {
			x: (mouseX - this.canvasOffset.x) / this.canvasOffset.scale,
			y: (mouseY - this.canvasOffset.y) / this.canvasOffset.scale,
		};
	}

	track(element) {
		this.canvas = element;
		const onMove = (event) => {
			const point = this.eventToPoint(event);
			let state = MouseState.MOUSE_OUTSIDE_REGION;
			if (this.regions.length === 0) {
				if (this.mouseListeners.length !== 0) {
					state = MouseState.NO_HIT_AREAS_WITH_POINTER_LOCK;
				} else {
					state = MouseState.NO_HIT_AREAS;
				}
			}
			for (const region of this.regions) {
				const mouseInside = pointInBox(point, region);
				if (region.mouseInside && !mouseInside) {
					region.leave(event, point);
				}
				if (!region.mouseInside && mouseInside) {
					region.enter(event, point);
				}
				if (mouseInside) {
					state = MouseState.MOUSE_INSIDE_REGION;
				}
				region.mouseInside = mouseInside;
			}
			const movement = this.hasLock ? {
				x: event.movementX / this.canvasOffset.scale,
				y: event.movementY / this.canvasOffset.scale,
			} : null;
			for (const mouseListener of this.mouseListeners) {
				mouseListener.move(point, movement, event);
			}
			this.updateListeners(state);
		}
		const onClick = (event) => {
			const point = this.eventToPoint(event);
			const shouldLock = this.shouldHavePointerLock(this.lastState);

			if (!this.hasLock && shouldLock) {
				this.tryPointerLock();
			}
			if (this.hasLock && !shouldLock) {
				this.releasePointerLock();
			}
			for (const region of this.regions) {
				const mouseInside = pointInBox(point, region);
				if (mouseInside) {
					region.click(event, point);
				}
			}
			for (const mouseListener of this.mouseListeners) {
				mouseListener.click(point, event);
			}
		}
		const onPointerLockChange = (event) => {
			this.hasLock = document.pointerLockElement === element;
		}
		element.addEventListener('mousemove', onMove)
		element.addEventListener('click', onClick)
		element.addEventListener('dbclick', onClick)
		document.addEventListener('pointerlockchange', onPointerLockChange)
		return () => {
			element.removeEventListener('mousemove', onMove)
			element.removeEventListener('click', onClick)
			element.removeEventListener('dbclick', onClick)
			document.removeEventListener('pointerlockchange', onPointerLockChange)
		};
	}

	addRegion(x, y, width, height, click, enter = NOOP_FUNCTION, leave = NOOP_FUNCTION) {
		const region = {
			x1: x,
			x2: x + width,
			y1: y + height,
			y2: y,
			click,
			enter,
			leave,
			mouseInside: false,
		};
		this.regions.push(region);
		return () => {
			removeByValue(this.regions, region);
			if (this.regions.length === 0 && this.mouseListeners.length > 0) {
				this.updateListeners(MouseState.NO_HIT_AREAS_WITH_POINTER_LOCK);
			}
		}
	}
}