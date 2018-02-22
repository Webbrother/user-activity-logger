# user-activity-logger

## npm commands
- use `npm start` to start local server (it opens demo page where you can test logger)
- use `npm run build` to build library

## How to use
1. Add script to your page

```html
<script type="text/javascript" src="logger.min.js"></script>
```

2. Initialyze logger
```html
<script>
    (function() {
        'use strict';

        window.addEventListener('load', function() {
            var config = {
                api: {
                    url: 'https://example.com',
                    method: 'post'
                },
                requestInterval: 5000,
                eventTypes: [
                    'focus',
                    'click',
                    'keyup',
                    'copy',
                    'cut',
                    'paste',
                    'mousemove',
                    'scroll'
                ],
                debounceInterval: 200
            };

            window.userActivityLogger.init(config);
        });
    })();
</script>

```

3. Destroy logger when you need it 

```javascript
window.userActivityLogge.destroy();
```

## Config

At the moment following eventTypes are supported: 
focus, click, keyup, copy, cut, paste, mousemove, scroll

We use debounce wrapper for `mousemove` and `scroll` events.
