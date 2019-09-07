import { removeByValue } from './mathUtils.js';

export function makeAction(type) {
	return {
		makeEvent(payload = undefined, source = undefined, target = undefined) {
			return {
				type,
				payload,
				source,
				target,
			};
		},
		type,
	}
}
export default class EventBus {
	constructor() {
		this.subscribers = {};
		this.anySubscribers = [];
	}

	fireAction(action, payload, source, target) {
		const event = action.makeEvent(payload, source, target);
		const subscriberList = this.subscribers[action.type];
		if (subscriberList) {
			for (const subscriber of subscriberList) {
				subscriber(event);
			}
		}
		for (const subscriber of this.anySubscribers) {
			subscriber(event);
		}
	}

	addSubscription(subscriber, action = undefined) {
		if (action !== undefined) {
			if (!this.subscribers[action.type]) {
				this.subscribers[action.type] = [subscriber];
			} else {
				this.subscribers[action.type].push(subscriber);
			}
		} else {
			this.anySubscribers.push(subscriber);
		}
		return () => {
			this.removeSubscription(subscriber, action);
		};
	}
	removeSubscription(subscriber, action) {
		if (action !== undefined) {
			if (this.subscribers[action.type]) {
				removeByValue(this.subscribers[action.type], subscriber);
			}
		} else {
			removeByValue(this.anySubscribers, subscriber);
		}
	}
}