export default class EventCollection {
    constructor({requestInterval}, {api}) {
        this._api = api;
        this._events = [];

        this._timerId = window.setInterval(() => {
            if (!this._events.length) return;

            const events = this._events;
            const commonData = this._commonData;
            this._events = [];

            this._api.post({commonData, events}).catch(err => {
                    this._events = [...events, ...this._events];
                });
        }, requestInterval);
    }

    setCommonData(data) {
        this._commonData = data;
    }

    push(event) {
        this._events.push(event);
    }

    destroy() {
        window.clearInterval(this._timerId);
    }
}
