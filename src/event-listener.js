import debounce from 'debounce';

export default class EventListener {
    constructor({type, debounceInterval}, {eventCollection, logDataProvider}) {
        this._type = type;
        this._eventCollection = eventCollection;
        this._logDataProvider = logDataProvider;

        this._eventCollection.setCommonData(logDataProvider.getCommonData());

        this.register(type);

        if (type === 'mousemove' || type === 'scroll') {
            this.handleEvent = debounce(this.handleEvent, debounceInterval);
        }
    }

    handleEvent(event) {
        const logData = this._logDataProvider.getLogData(event);
        this._eventCollection.push(logData);

        console.log('Logged data:', logData);
    }

    register() {
        window.addEventListener(this._type, this, true);
    }

    destroy() {
        this.handleEvent = null;
        window.removeEventListener(this._type, this, true);
    }
}
