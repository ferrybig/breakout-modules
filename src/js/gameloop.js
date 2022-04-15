export default function (update, render) {
	let lastFrameTime = undefined;
	const targetPhysicsRate = 1000 / 60;
	const targetFrameRate = 1000 / targetPhysicsRate;
	let updateTick = 0;
	let renderTick = 0;

	const _requestAnimFrame = window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, targetFrameRate);
			};

	function tick() {
		const timeInMs = Date.now();
		if (lastFrameTime === undefined || timeInMs - lastFrameTime > 400) {
			// Either missed to many frames, or we are first starting
			// Adjust the frames by a few MS to prevent clock skew from messing with the time
			lastFrameTime = timeInMs - targetPhysicsRate / 10;
			update(updateTick++);
		} else {
			while (timeInMs - lastFrameTime > targetPhysicsRate) {
				update(updateTick++);
				lastFrameTime += targetPhysicsRate;
			}
		}
		render(renderTick++);
		_requestAnimFrame(tick);
	}
	;
	_requestAnimFrame(tick);
};
