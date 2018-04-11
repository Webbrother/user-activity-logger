import API from './api';
import EventCollection from './event-collection';
import eventListenerFactory from './event-listeners/event-listener-factory';
import LogDataProvider from './log-data-provider';

export default class Logger {
    init(config) {
        if (!config.commonData || !config.commonData.workerId) {
            console.error(new Error('no workerId'));
            return;
        }

        const api = new API(config);
        this._eventCollection = new EventCollection(config, {api});
        this._logDataProvider = new LogDataProvider();

        const {eventTypes} = config;
        this._eventListeres = eventTypes.map(type => eventListenerFactory(
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
