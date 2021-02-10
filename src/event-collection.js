// LocalStorage using is commented until decision about further using
// import LocalStorage from './local-storage';

export default class EventCollection {
    constructor({requestInterval, commonData}, {api, logDataProvider}) {
        this._api = api;
        this._logDataProvider = logDataProvider;
        this._commonData = commonData;
        // this._ls = new LocalStorage();

        this._events = [];

        this._timerId = window.setInterval(() => {
            this.sendEvents();
        }, requestInterval);
    }

    sendEvents(isBeacon) {
        // const cachedEvents = this._ls.get('events') || [];
        // const sentEvents = [...cachedEvents, ...this._events];
        const sentEvents = [...this._events];

        if (!sentEvents.length) return;

        this._events = [];
        const data = {
            commonData: this._commonData,
            events: sentEvents
        };

        if (isBeacon) {
            this._api.sendBeacon(data);
        } else {
            this._api.post(data)
            // .then(r => { this._ls.remove('events'); })
            .catch(e => {
                // this._ls.set('events', sentEvents);
                this._events = [...sentEvents, ...this._events];
            });
        }
    }

    push(event) {
        const logData = this._logDataProvider.getLogData(event);
        this._events.push(logData);
    }

    destroy() {
        window.clearInterval(this._timerId);
        // this._ls.remove('events');
    }
}
