// Event types:
// Minimal set:
//      an element has received focus,
//      an input element has been clicked.
// Intermediate: minimal + the following:
//      keyboard events while the focus on an input element (i.e., typing an answer),
//      clipboard events:
//          the selection has been copied to the clipboard
//          OR
//          the item from the clipboard has been pasted.
// Maximal: minimal + intermediate + the following:
//     mouse movement events,
//     scrolling


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
    'paste'
];

export default class Logger {
    constructor() {
        this.init({
            interval: 5000
        });
    }

    init(config) {
        this._config = config;

        const api = new API(config);
        this._eventCollection = new EventCollection(config, {api});
        this._logDataProvider = new LogDataProvider(config);

        this._eventListeres = eventTypes.map(type => new EventListener(
            {type},
            {
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
