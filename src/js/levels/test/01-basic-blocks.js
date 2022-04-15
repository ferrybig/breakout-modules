import makeLevel from '../makeLevel.js';
import * as powerups from '../../powerups.js';

export default makeLevel([
	'                    ',
	'                    ',
	'                    ',
	'                    ',
	'                    ',
	'                    ',
	'                    ',
	'                    ',
	'                    ',
	'                    ',
	'2 2 2 2 2 2 2 2 2 2 ',
	' 1 1 1 1 1 1 1 1 1 1',
	'0 0 0 0 0 0 0 0 0 0 ',
	' # # # # # # # # # #',
	'! ! ! ! ! ! ! ! ! ! ',
	' * * * * * * * * * *',
	'g g g g g g g g g g ',
	' r r r r r r r r r r',
	'y y y y y y y y y y ',
	' b b b b b b b b b b',
], [
    {
        "16": powerups.ballSpeedDown,
        "18": powerups.paddleSticky,
        "30": powerups.ballExtra,
        "34": powerups.ballSpeedUp,
        "39": powerups.ballUnstopable,
        "42": powerups.ballExtra,
        "53": powerups.weakenBlocks,
        "54": powerups.ballSpeedUp,
        "55": powerups.paddleShrink,
        "64": powerups.paddleShrink,
        "70": powerups.instaDeath,
        "75": powerups.paddleGrow,
        "78": powerups.paddleLasers,
        "81": powerups.ballSpeedDown,
        "87": powerups.paddleSticky,
        "94": powerups.paddleShrink,
        "99": powerups.paddleGrow
    },
    {
        "1": powerups.ballExtra,
        "7": powerups.paddleGrow,
        "8": powerups.paddleLasers,
        "13": powerups.lightning,
        "23": powerups.ballSpeedDown,
        "24": powerups.weakenBlocks,
        "26": powerups.ballExtra,
        "30": powerups.ballSpeedUp,
        "38": powerups.paddleLasers,
        "50": powerups.ballSpeedDown,
        "54": powerups.ballExploding,
        "62": powerups.ballSpeedUp,
        "66": powerups.paddleSticky,
        "68": powerups.ballExploding,
        "80": powerups.lightning,
        "81": powerups.paddleShrink,
        "82": powerups.paddleSticky,
        "93": powerups.ballExtra,
        "95": powerups.paddleShrink,
        "99": powerups.ballSpeedUp
    },
    {
        "0": powerups.weakenBlocks,
        "9": powerups.paddleShrink,
        "10": powerups.ballSpeedUp,
        "12": powerups.ballSpeedUp,
        "17": powerups.ballExploding,
        "19": powerups.paddleLasers,
        "25": powerups.paddleShrink,
        "26": powerups.paddleShrink,
        "35": powerups.paddleShrink,
        "41": powerups.paddleShrink,
        "47": powerups.ballUnstopable,
        "49": powerups.ballExtra,
        "52": powerups.paddleShrink,
        "55": powerups.ballUnstopable,
        "62": powerups.paddleShrink,
        "66": powerups.paddleLasers,
        "67": powerups.ballSpeedUp,
        "70": powerups.ballSpeedDown,
        "72": powerups.paddleLasers,
        "79": powerups.instaDeath,
        "81": powerups.paddleShrink,
        "85": powerups.instaDeath,
        "86": powerups.ballSpeedUp,
        "88": powerups.paddleSticky
    },
    {
        "0": powerups.paddleGrow,
        "2": powerups.paddleGrow,
        "5": powerups.ballExtra,
        "7": powerups.ballSpeedDown,
        "8": powerups.ballSpeedUp,
        "19": powerups.paddleGrow,
        "42": powerups.paddleGrow,
        "45": powerups.paddleSticky,
        "48": powerups.paddleLasers,
        "51": powerups.ballExploding,
        "52": powerups.ballSpeedDown,
        "60": powerups.ballSpeedDown,
        "62": powerups.ballSpeedUp,
        "63": powerups.ballExtra,
        "66": powerups.paddleGrow,
        "71": powerups.ballUnstopable,
        "75": powerups.lightning,
        "80": powerups.paddleShrink,
        "93": powerups.paddleLasers,
        "95": powerups.paddleShrink,
        "96": powerups.ballSpeedDown,
        "98": powerups.paddleGrow
    },
    {
        "0": powerups.ballExtra,
        "2": powerups.paddleLasers,
        "7": powerups.paddleShrink,
        "12": powerups.ballExtra,
        "15": powerups.paddleShrink,
        "18": powerups.ballExtra,
        "26": powerups.ballUnstopable,
        "30": powerups.ballExploding,
        "35": powerups.paddleShrink,
        "37": powerups.weakenBlocks,
        "39": powerups.paddleSticky,
        "48": powerups.ballSpeedDown,
        "60": powerups.paddleShrink,
        "80": powerups.ballSpeedUp,
        "88": powerups.paddleLasers,
        "95": powerups.paddleShrink
    },
    {
        "0": powerups.paddleLasers,
        "11": powerups.ballSpeedUp,
        "14": powerups.ballExtra,
        "15": powerups.ballUnstopable,
        "17": powerups.ballSpeedDown,
        "20": powerups.ballSpeedDown,
        "21": powerups.ballExploding,
        "22": powerups.ballExtra,
        "23": powerups.ballExtra,
        "24": powerups.ballExtra,
        "25": powerups.paddleShrink,
        "27": powerups.ballSpeedDown,
        "29": powerups.paddleLasers,
        "33": powerups.ballExtra,
        "37": powerups.ballSpeedDown,
        "45": powerups.ballExtra,
        "47": powerups.paddleGrow,
        "49": powerups.weakenBlocks,
        "51": powerups.ballExploding,
        "66": powerups.ballUnstopable,
        "68": powerups.paddleGrow,
        "69": powerups.paddleGrow,
        "73": powerups.paddleMini,
        "74": powerups.ballSpeedUp,
        "76": powerups.skipLevel,
        "83": powerups.paddleShrink,
        "85": powerups.ballSpeedUp,
        "86": powerups.paddleGrow,
        "88": powerups.paddleMini,
        "89": powerups.ballUnstopable,
        "97": powerups.paddleGrow,
        "98": powerups.ballSpeedUp
    },
    {
        "5": powerups.paddleLasers,
        "12": powerups.ballExtra,
        "13": powerups.ballUnstopable,
        "14": powerups.paddleGrow,
        "17": powerups.paddleShrink,
        "20": powerups.ballExtra,
        "35": powerups.paddleLasers,
        "46": powerups.ballSpeedDown,
        "53": powerups.paddleGrow,
        "58": powerups.ballUnstopable,
        "97": powerups.ballSpeedDown,
        "98": powerups.ballUnstopable,
        "99": powerups.ballUnstopable
    },
    {
        "1": powerups.ballExploding,
        "3": powerups.paddleGrow,
        "9": powerups.ballExploding,
        "13": powerups.ballSpeedUp,
        "17": powerups.ballSpeedUp,
        "20": powerups.paddleGrow,
        "22": powerups.lightning,
        "28": powerups.ballExtra,
        "29": powerups.lightning,
        "34": powerups.ballSpeedDown,
        "38": powerups.ballSpeedUp,
        "47": powerups.instaDeath,
        "49": powerups.ballExploding,
        "50": powerups.ballUnstopable,
        "64": powerups.ballSpeedDown,
        "65": powerups.paddleGrow,
        "67": powerups.ballExploding,
        "70": powerups.paddleGrow,
        "81": powerups.lightning,
        "83": powerups.ballExtra,
        "86": powerups.ballExtra,
        "88": powerups.ballUnstopable,
        "99": powerups.ballExtra
    }
]);