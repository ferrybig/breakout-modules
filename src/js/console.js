const enabled = window.location.hash.includes('console.log');

export const log = (...args) => {
	if (enabled) {
		console.log(...args);
	}
};

export const error = (...args) => {
	if (enabled) {
		console.error(...args);
	}
};

export const group = (...args) => {
	if (enabled) {
		console.group(...args);
	}
};

export const groupCollapsed = (...args) => {
	if (enabled) {
		console.groupCollapsed(...args);
	}
};

export const groupEnd = (...args) => {
	if (enabled) {
		console.groupEnd(...args);
	}
};

export const console = window.console;
