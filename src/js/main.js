import Ui from './ui.js';
import gameloop from './gameloop.js';
import MainMenu from './entities/overlays/MainMenu.js';
import LoadingScreen from './entities/helpers/LoadingScreen.js';
import EntityManager from './EntityManager.js';
import EventBus from './EventBus.js';
import MouseTracker, { MouseState } from './MouseTracker.js';
import * as actions from './actions.js';
import * as bricks from './bricks.js';
import * as console from './console.js';
import levelTree from './levels/index.js';
import { INITIAL_LIVES } from './settings.js';
import { assertUnreachable } from './mathUtils.js';

function main(element) {
	const eventBus = new EventBus();
	eventBus.addSubscription(({ type, payload, source, target }) => {
		console.groupCollapsed('Event: ' + type);
		console.log('Date: ', new Date());
		if (payload) {
			console.log('Payload: ', payload);
		}
		if (source) {
			console.log('Source: ', source);
		}
		if (target) {
			console.log('Target: ', target);
		}
		console.groupEnd();
	})


	const entityManager = new EntityManager();
	//entityManager.addEntity(new Ball(605, 405));
	//	entityManager.addEntity(new Background());
	//	entityManager.addEntity(new Brick(0, 600, bricks.basic));
	//	entityManager.addEntity(new Brick(60, 600, bricks.basicRed));
	//	entityManager.addEntity(new Brick(120, 600, bricks.basicBlue));
	//	entityManager.addEntity(new Brick(180, 600, bricks.basicGreen));
	//	entityManager.addEntity(new Brick(240, 600, bricks.basicYellow));
	//	entityManager.addEntity(new Brick(0, 570, bricks.basic));
	//	entityManager.addEntity(new Brick(60, 570, bricks.basicRed));
	//	entityManager.addEntity(new Brick(120, 570, bricks.basicBlue));
	//	entityManager.addEntity(new Brick(180, 570, bricks.basicGreen));
	//	entityManager.addEntity(new Brick(240, 570, bricks.basicYellow));
	//	entityManager.addEntity(new Brick(300, 570, bricks.glassStage3));
	//	entityManager.addEntity(new Brick(300, 600, bricks.glassStage2));
	//	entityManager.addEntity(new Brick(360, 600, bricks.glass));
	//	entityManager.addEntity(new Brick(420, 600, bricks.shield));
	//	entityManager.addEntity(new Brick(480, 600, bricks.activatedShield));
	//	entityManager.addEntity(new Brick(540, 600, bricks.explosive));
	//	entityManager.addEntity(new Brick(600, 600, bricks.explosive));
	//	entityManager.addEntity(new Brick(660, 600, bricks.explosive));
	//	entityManager.addEntity(new Brick(540, 570, bricks.explosive));
	//	entityManager.addEntity(new Brick(600, 570, bricks.explosive));
	//	entityManager.addEntity(new Brick(660, 570, bricks.explosive));
	//	entityManager.addEntity(new Brick(540, 540, bricks.explosive));
	//	entityManager.addEntity(new Brick(600, 540, bricks.explosive));
	//	entityManager.addEntity(new Brick(660, 540, bricks.explosive));
	//	entityManager.addEntity(new Brick(480, 540, bricks.explosive));
	//	entityManager.addEntity(new Brick(420, 540, bricks.explosive));
	//	entityManager.addEntity(new Brick(360, 540, bricks.explosive));
	//	entityManager.addEntity(new Brick(300, 540, bricks.explosive));
	//	entityManager.addEntity(new Brick(240, 540, bricks.explosive));
	//	entityManager.addEntity(new Paddle(600, 750));
	//	entityManager.addEntity(new ScoreReducer(1000, 0, 100))
	//entityManager.addEntity(new LevelLoader())
	//	entityManager.addEntity(new LoadingScreen([new LevelLoader()]));
	entityManager.addEntity(new LoadingScreen([new MainMenu()]));

	const canvasOffset =  {
		x: 0,
		y: 0,
		scale: 1,
	};

	const mouseTracker = new MouseTracker(canvasOffset);

	const renderOptions = {
		width: 1200,
		height: 800,
		paused: false,
		eventBus,
		mouseTracker,
		// modified by the score reducer
		score: {
			lives: INITIAL_LIVES,
			score: 0,
			previeusScore: 0,
			brickCount: 0,
			levelScores: [],
		},
		manager: entityManager,
		// modified by the ui layer
		canvasOffset,
		// modified by the ball controller
		ballSettings: {
			speed: 0,
			// modified by the difficulty menu
			modifier: 6,
			powerups: {
				exploding: false,
				unstopable: false,
			},
		},
		// modified only the level selection controller
		levelTree: {
			tree: levelTree[0],
			level: 0,
		},
		menuObjects: [],
	};

	console.console.log(renderOptions);

	const ui = new Ui(element, renderOptions);

	mouseTracker.addStateListener((state) => {
		switch (state) {
			case MouseState.NO_HIT_AREAS:
				ui.setNMouseCursor('crosshair');
				break;
			case MouseState.NO_HIT_AREAS_WITH_POINTER_LOCK:
				ui.setNMouseCursor('none');
				break;
			case MouseState.MOUSE_OUTSIDE_REGION:
				ui.setNMouseCursor('default');
				break;
			case MouseState.MOUSE_INSIDE_REGION:
				ui.setNMouseCursor('pointer');
				break;
			default:
				ui.setNMouseCursor(assertUnreachable(state));
				break;
		}
	})

	ui.track();
	mouseTracker.track(element);

	gameloop((updateTick) => {
		entityManager.update(renderOptions, updateTick);
	}, (renderTick) => {
		const graphics = ui.beginRender();
		entityManager.render(graphics, renderOptions, renderTick);
		ui.finishRender();
	});
}

const element = document.createElement('canvas');
main(element);
document.body.appendChild(element);
