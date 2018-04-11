import EventListener from './event-listener';

export default class EventListenerClick extends EventListener {
    constructor(config, dependencies) {
        super(config, dependencies);
    }

    handleEvent(event) {
        // Ignore click on labels because they fire click on inputs
        // so here we exclude double triggering of the same event
        if (event.target.hasAttribute('for')) {
            event.stopPropagation();
            return;
        }

        // Ignore click by 'submit' button
        if (event.target.type === 'submit') return;

        super.handleEvent(event);
    }
}
