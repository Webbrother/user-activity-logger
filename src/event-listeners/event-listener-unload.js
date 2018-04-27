import EventListener from './event-listener';

export default class EventListenerUnload extends EventListener {
    constructor(config, dependencies) {
        super(config, dependencies);

        this._eventCollection = dependencies.eventCollection;
    }

    handleEvent(event) {
        super.handleEvent(event);

        this._eventCollection.sendEvents(true);
    }
}
