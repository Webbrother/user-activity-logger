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
        var commonData = {
            // workerId: *required
            // 
            // Put here common data which should be sent within log information
            // Example:
            // taskId: parseInt(document.getElementById("assignment-job-id").innerHTML),
        }

        window.addEventListener('load', function() {
            var config = {
                api: {
                    url: 'https://example.com',
                    method: 'post'
                },
                requestInterval: 5000,
                eventTypes: [
                    'start',
                    'unload',
                    'focus',
                    'click',
                    'submit'
                    'keyup',
                    'copy',
                    'cut',
                    'paste',
                    'mousemove',
                    'scroll'
                ],
                debounceInterval: 200,
                commonData: commonData
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
