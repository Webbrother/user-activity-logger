import EventListener from "./event-listener";

import EventListenerClick from './event-listener-click';

export default function eventListenerFactory(config, dependencies) {
    let Klass;

    switch (config.type) {
        case 'click':
            Klass = EventListenerClick;
            break;

        default:
            Klass = EventListener;
    }

    return new Klass(config, dependencies);
}
