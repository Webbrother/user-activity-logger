import EventListener from './event-listener';

export default class EventListenerClick extends EventListener {
    constructor(config, dependencies) {
        super(config, dependencies);
    }

    handleEvent(event) {
        // Ignore focuse on window
        if (event.target === window) {
            event.stopPropagation();
            return;
        }

        super.handleEvent(event);
    }
}
