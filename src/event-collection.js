import LocalStorage from './local-storage';

export default class EventCollection {
    constructor({requestInterval, commonData}, {api}) {
        this._api = api;
        this._ls = new LocalStorage();

        this._events = [];

        this._timerId = window.setInterval(() => {
            const cachedEvents = this._ls.get('events') || [];
            const sentEvents = [...cachedEvents, ...this._events];

            if (!sentEvents.length) return;

            this._events = [];

            this._api.post({
                commonData,
                events: sentEvents
            }).then(r => {
                this._ls.remove('events');
            }).catch(e => {
                this._ls.set('events', sentEvents);
            });
        }, requestInterval);
    }

    push(event) {
        this._events.push(event);
    }

    destroy() {
        window.clearInterval(this._timerId);
        this._ls.remove('events');
    }
}
