export default class EventCollection {
    constructor({interval}, {api}) {
        this._api = api;
        this._events = [];

        this._timerId = window.setInterval(() => {
            console.log('interval', this._events);
            if (!this._events.length) return;

            console.log('do request');

            const events = this._events;
            const commonData = this._commonData;
            this._events = [];

            this._api.post({commonData, events})
                .then(() => {
                    // process events array
                    console.log('success request');
                }).catch(err => {
                    this._events = [...events, ...this._events];
                    console.log('failed request');
                });
        }, interval);
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
