import Brick from '../entities/Brick.js';
import * as bricks from '../bricks.js';
import * as powerups from '../powerups.js';
import * as console from '../console.js';
import { assertUnreachable } from '../mathUtils.js';

const BRICK_MAPPING = {
	'*': bricks.basic,
	'y': bricks.basicYellow,
	'b': bricks.basicBlue,
	'g': bricks.basicGreen,
	'r': bricks.basicRed,
	' ': null,
	'!': bricks.explosive,
	'0': bricks.glass,
	'1': bricks.glassStage2,
	'2': bricks.glassStage3,
	'#': bricks.shield,
};

const RANDOM_POWERUPS = [];

for (const [key, value] of Object.entries(powerups)) {
	let count;
	switch(value.rarity) {
		case 'common':
			count = 8;
			break;
		case 'uncommon':
			count = 4;
			break;
		case 'rare':
			count = 2;
			break;
		case 'legendary':
			count = 1;
			break;
		default:
			count = assertUnreachable(value.rarity);
			break;
	}
	for(let i = 0; i < count; i++) {
		RANDOM_POWERUPS.push(key);
	}
}
const RANDOM_POWERUP_CHANGE = 1 / 5;

function suggestPowerupSets(grid) {
	console.console.groupCollapsed('Powerup suggestion:');
	console.console.log('level loaded with a random powerup list:');
	console.console.log(grid.join('\n'))
	const powerups = [];
	const powerupValues = [];
	for (let i = 0; i < 4; i++) {
		const currentSet = {};
		const currentSetValues = {};
		let counter = -1;
		for (let j = 0; j < grid.length; j++) {
			for (let k = 0; k < grid[j].length; k++) {
				if (grid[j][k] === ' ') {
					continue;
				}
				counter++;
				const random = Math.random();
				if(random > RANDOM_POWERUP_CHANGE) {
					continue;
				}
				const powerup = RANDOM_POWERUPS[Math.floor(Math.random() * RANDOM_POWERUPS.length)];
				currentSet[counter] = powerup;
				currentSetValues[counter] = powerups[powerup];
			}
		}
		powerups.push(currentSet);
	}
	console.console.log('Here are some suggested powerup combination to hard codes:');
	console.console.log(JSON.stringify(powerups, null, 4).replace(/: "(\w*)"/g, (_, g1) => ': powerups.' + g1));
	console.console.groupEnd();
	return powerups;
}

const EMPTY_POWERUP_LIST = [{}];

export default function makeLevel(grid, powerupLists = EMPTY_POWERUP_LIST) {
	if (powerupLists === EMPTY_POWERUP_LIST) {
		powerupLists = suggestPowerupSets(grid);
	}
	return function prepareLevel(updateTick) {
		const bricks = [];
		const powerupSet = powerupLists[updateTick % powerupLists.length];
		for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
			const row = grid[rowIndex];
			for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
				const cell = row[columnIndex];
				const definition = BRICK_MAPPING[cell];
				if (definition === undefined) {
					throw new Error('"' + cell + '" is not a valid character');
				}
				if (definition !== null) {
					bricks.push(new Brick(columnIndex * 60, rowIndex * 30, definition, powerupSet[bricks.length] ? [powerupSet[bricks.length]] : []));
				}
			}
		}
		return bricks;
	}
}