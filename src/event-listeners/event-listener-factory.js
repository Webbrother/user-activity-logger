import EventListener from "./event-listener";

import EventListenerClick from './event-listener-click';
import EventListenerFocus from './event-listener-focus';

export default function eventListenerFactory(config, dependencies) {
    let Klass;

    switch (config.type) {
        case 'click':
            Klass = EventListenerClick;
            break;

        case 'focus':
            Klass = EventListenerFocus;
            break;

        default:
            Klass = EventListener;
    }

    return new Klass(config, dependencies);
}
