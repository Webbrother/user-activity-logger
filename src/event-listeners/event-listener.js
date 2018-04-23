import debounce from 'debounce';

export default class EventListener {
    constructor({type, debounceInterval}, {eventCollection, logDataProvider}) {
        this._type = type;
        this._eventCollection = eventCollection;
        this._logDataProvider = logDataProvider;

        if (type === 'start') {
            this.handleEvent({type});
            return;
        }

        if (type === 'mousemove' || type === 'scroll') {
            this.handleEvent = debounce(this.handleEvent, debounceInterval);
        }

        this.register();
    }

    handleEvent(event) {
        const logData = this._logDataProvider.getLogData(event); // todo: move logDataProvider to eventCollection.push method
        this._eventCollection.push(logData);
    }

    register() {
        window.addEventListener(this._type, this, true);
    }

    destroy() {
        this.handleEvent = null;
        window.removeEventListener(this._type, this, true);
    }
}
