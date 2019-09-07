export function lerp(fraction, targetMin, targetMax) {
	return fraction * (targetMax - targetMin) + targetMin;
}

export function fraction(value, valueMin, valueMax) {
	return (value - valueMin) / (valueMax - valueMin);
}

/* This function expects cortesian coordinates */
export function checkBoundingBoxOverlapping(box1, box2) {
	return box1.x1 < box2.x2 && box1.x2 > box2.x1 &&
			box1.y1 > box2.y2 && box1.y2 < box2.y1;
}
/* This function expects cortesian coordinates */
export function pointInBox(point, box) {
	return point.x < box.x2 && point.x > box.x1 &&
			point.y > box.y2 && point.y < box.y1;
}

export function assertUnreachable(subject) {
	throw new Error('This should not be reached, subject was ' + JSON.stringify(subject));
}

export function lineInterSectionDistance(line1, line2) {
	const e = {
		x: line1.x2 - line1.x1,
		y: line1.y2 - line1.y1,
	};
	const f = {
		x: line2.x2 - line2.x1,
		y: line2.y2 - line2.y1,
	};
	const p = {
		x: -e.y,
		y: e.x,
	};
	const h1 = (line1.x1 - line2.x1) * p.x + (line1.y1 - line2.y1) * p.y;
	const h2 = f.x * p.x + f.y * p.y;
	if (h2 === 0) {
		return Number.POSITIVE_INFINITY;
	}
	const h = h1 / h2;
	return h;
}

export function clamp(value, min, max) {
	if (value < min) {
		return min;
	}
	if (value > max) {
		return max;
	}
	return value;
}
export function clampToArray(value, array) {
	return clamp(Math.floor(value), 0, array.length - 1);
}
export function removeByValue(array, value) {
	const index = array.findIndex(v => v === value);
	if (index >= 0) {
		array.splice(index, 1);
	}
}
