import EventListener from './event-listener';

export default class EventListenerFocus extends EventListener {
    constructor(config, dependencies) {
        super(config, dependencies);
    }

    handleEvent(event) {
        // Ignore focus on window
        if (event.target === window) {
            event.stopPropagation();
            return;
        }

        super.handleEvent(event);
    }
}
