export default class EventListener {
    constructor({type}, {eventCollection, logDataProvider}) {
        this._type = type;
        this._eventCollection = eventCollection;
        this._logDataProvider = logDataProvider;

        this._eventCollection.setCommonData(logDataProvider.getCommonData());

        this.register(type);
    }

    handleEvent(event) {
        const logData = this._logDataProvider.getLogData(event);
        this._eventCollection.push(logData);

        console.log('Logged data:', logData);
    }

    register() {
        document.addEventListener(this._type, this, true);
    }

    destroy() {
        document.removeEventListener(this._type, this, true);
    }
}
