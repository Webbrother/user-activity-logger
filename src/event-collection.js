export default class EventCollection {
    constructor({interval}, {api}) {
        this._api = api;
        this._events = [];

        this._timerId = window.setInterval(() => {
            this._api.post(this._events).then(() => {
                 // process events array
                // console.log('success request');
            });
            // console.log('tick');
        }, interval);
    }

    push(event) {
        this._events.push(event);
    }

    destroy() {
        window.clearInterval(this._timerId);
    }
}
