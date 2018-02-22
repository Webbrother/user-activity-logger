import EventCollection from './event-collection';
import EventListener from './event-listener';
import LogDataProvider from './log-data-provider';
import API from './api';

const eventTypes = [
    'focus',
    'click',
    'keyup',
    'copy',
    'cut',
    'paste',
    'mousemove',
    'scroll'
];

export default class Logger {
    constructor() {
        this.init({
            interval: 5000,
            debounceInterval: 200
        });
    }

    init(config) {
        this._config = config;

        const api = new API(config);
        this._eventCollection = new EventCollection(config, {api});
        this._logDataProvider = new LogDataProvider(config);

        this._eventListeres = eventTypes.map(type => new EventListener(
            {
                ...config,
                type
            }, {
                eventCollection: this._eventCollection,
                logDataProvider: this._logDataProvider
            }));
    }

    destroy() {
        this._eventListeres.forEach(eventListener => eventListener.destroy());
        this._eventListeres = null;
        this._eventCollection.destroy();
        this._logDataProvider.destroy();
    }
}
