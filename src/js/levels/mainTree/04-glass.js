import makeLevel from '../makeLevel.js';
import * as powerups from '../../powerups.js';

export default makeLevel([
  "            **      ",
  "           **       ",
  "          **        ",
  "         **         ",
  "         **         ",
  "         **         ",
  "         **         ",
  "       ******       ",
  "      ********      ",
  "     **000000**     ",
  "     *000!0000*     ",
  "     *0!0!0000*     ",
  "     *0!0!!000*     ",
  "     *0!0!!0!0*      ",
  "     *0!0!!!!0*     ",
  "     *0!!!!!!0*     ",
  "     *0!!!!!!0*     ",
  "     *00000000*     ",
  "     **********     ",
  "      *      *      "
], [
    {
        "0": powerups.ballSpeedUp,
        "3": powerups.paddleGrow,
        "17": powerups.paddleLasers,
        "31": powerups.ballSpeedUp,
        "35": powerups.ballSpeedUp,
        "38": powerups.ballSpeedDown,
        "39": powerups.paddleShrink,
        "40": powerups.ballSpeedDown,
        "50": powerups.paddleGrow,
        "54": powerups.ballExtra,
        "55": powerups.extraLive,
        "58": powerups.ballExtra,
        "65": powerups.ballSpeedUp,
        "70": powerups.lightning,
        "76": powerups.ballExtra,
        "84": powerups.paddleSticky,
        "99": powerups.ballSpeedUp,
        "107": powerups.paddleGrow,
        "110": powerups.ballSpeedUp,
        "116": powerups.instaDeath,
        "119": powerups.paddleLasers,
        "121": powerups.paddleGrow,
        "122": powerups.lightning,
        "124": powerups.instaDeath,
        "126": powerups.paddleShrink
    },
    {
        "0": powerups.ballExtra,
        "2": powerups.ballSpeedUp,
        "5": powerups.ballUnstopable,
        "6": powerups.ballSpeedDown,
        "13": powerups.ballSpeedDown,
        "27": powerups.paddleGrow,
        "33": powerups.paddleGrow,
        "36": powerups.paddleShrink,
        "46": powerups.paddleShrink,
        "58": powerups.ballSpeedDown,
        "61": powerups.ballExtra,
        "71": powerups.paddleShrink,
        "73": powerups.extraLive,
        "75": powerups.paddleSticky,
        "81": powerups.ballExtra,
        "91": powerups.paddleLasers,
        "102": powerups.ballSpeedUp,
        "110": powerups.ballSpeedUp,
        "113": powerups.ballExploding,
        "117": powerups.paddleGrow,
        "122": powerups.ballExtra,
        "124": powerups.paddleShrink,
        "125": powerups.paddleSticky
    },
    {
        "3": powerups.lightning,
        "7": powerups.ballSpeedUp,
        "15": powerups.paddleSticky,
        "17": powerups.paddleShrink,
        "20": powerups.ballExtra,
        "30": powerups.ballExtra,
        "31": powerups.ballExtra,
        "45": powerups.instaDeath,
        "48": powerups.ballSpeedUp,
        "49": powerups.ballExploding,
        "52": powerups.paddleShrink,
        "56": powerups.extraLive,
        "64": powerups.paddleSticky,
        "70": powerups.ballExtra,
        "73": powerups.paddleGrow,
        "78": powerups.instaDeath,
        "90": powerups.paddleGrow,
        "102": powerups.ballExploding,
        "103": powerups.ballExtra,
        "112": powerups.lightning,
        "114": powerups.instaDeath,
        "119": powerups.ballExploding
    },
    {
        "0": powerups.ballExtra,
        "3": powerups.paddleLasers,
        "8": powerups.ballExploding,
        "10": powerups.paddleShrink,
        "11": powerups.ballUnstopable,
        "14": powerups.paddleGrow,
        "20": powerups.ballExploding,
        "26": powerups.paddleMini,
        "31": powerups.paddleShrink,
        "42": powerups.paddleSticky,
        "45": powerups.ballExploding,
        "46": powerups.ballExploding,
        "51": powerups.ballSpeedUp,
        "56": powerups.ballExtra,
        "57": powerups.ballSpeedUp,
        "63": powerups.weakenBlocks,
        "65": powerups.ballUnstopable,
        "69": powerups.ballSpeedUp,
        "78": powerups.paddleGrow,
        "79": powerups.ballExtra,
        "84": powerups.paddleGrow,
        "90": powerups.paddleSticky,
        "98": powerups.instaDeath,
        "101": powerups.paddleSticky,
        "106": powerups.paddleGrow,
        "110": powerups.paddleGrow,
        "112": powerups.ballExtra,
        "115": powerups.paddleGrow,
        "124": powerups.paddleShrink,
        "125": powerups.ballSpeedDown,
        "126": powerups.ballExtra,
        "127": powerups.ballSpeedUp,
        "129": powerups.ballSpeedUp
    }
]);
