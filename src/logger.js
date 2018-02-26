import API from './api';
import EventCollection from './event-collection';
import EventListener from './event-listener';
import LogDataProvider from './log-data-provider';

export default class Logger {
    init(config) {
        const api = new API(config);
        this._eventCollection = new EventCollection(config, {api});
        this._logDataProvider = new LogDataProvider();

        const {eventTypes} = config;
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
