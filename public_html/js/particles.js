function makeParticle(speed, size, sizeGlow, speedDecay, sizeDecay, gravity, glowTexture, mainTexture) {
	return {
		speed,
		size,
		sizeGlow,
		speedDecay,
		sizeDecay,
		gravity,
		glowTexture,
		mainTexture,
	};
}

function makeDefinition(name, timeToLive, count, particles) {
	return {
		name,
		timeToLive,
		count,
		particles,
	}
}

export const explosion = makeDefinition('explosion', 60, 12, [
	makeParticle(3, 3, 10, 0.99, 0.95, 0.1, 'rgba(255, 200, 60, *)', 'rgba(40, 17, 0, *)'),
	makeParticle(3, 3, 10, 0.99, 0.95, 0.1, 'rgba(222, 100, 60, *)', 'rgba(34, 34, 0, *)'),
	makeParticle(2, 2, 7, 0.99, 0.95, 0.1, 'rgba(255, 200, 60, *)', 'rgba(40, 17, 0, *)'),
	makeParticle(2, 2, 7, 0.99, 0.95, 0.1, 'rgba(222, 100, 60, *)', 'rgba(34, 34, 0, *)'),
]);

export const fireworkBall = makeDefinition('fireworks', 70, 18, [
	makeParticle(2, 2, 8, 0.95, 0.8, 0.03, 'hsla(290, 50%, 50%, *)', 'hsla(290, 100%, 50%, *)'),
	makeParticle(2, 2, 8, 0.95, 0.8, 0.03, 'hsla(230, 50%, 50%, *)', 'hsla(230, 100%, 50%, *)'),
	makeParticle(2, 2, 8, 0.95, 0.8, 0.03, 'hsla(170, 50%, 50%, *)', 'hsla(170, 100%, 50%, *)'),
	makeParticle(2, 2, 8, 0.95, 0.8, 0.03, 'hsla(140, 50%, 50%, *)', 'hsla(140, 100%, 50%, *)'),
]);
