import { makeAction } from './EventBus.js';

export const ballHitBrick = makeAction('ball-hit-brick');
export const ballHitDeathZone = makeAction('ball-hit-death-zone');
export const ballHitPaddle = makeAction('ball-hit-paddle');

export const brickUpdated = makeAction('brick-updated');
export const brickRemoved = makeAction('brick-removed');

export const powerupActivated = makeAction('powerup-activated');

export const particleActivated = makeAction('particle-activated');

export const userHelperActivated = makeAction('user-helper-activated');

export const exclusiveRender = makeAction('exclusive-render');

export const reset = makeAction('reset');
export const triggerDeath = makeAction('trigger-death');
