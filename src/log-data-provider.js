export default class LogDataProvider {
    getLogData(event) {
        let payload = {};

        switch (event.type) {
            case 'focus':
                payload = this._getFocusEventData(event);
                break;
            case 'click':
                payload = this._getClickEventData(event);
                break;
            case 'keyup':
                payload = this._getKeyupEventData(event);
                break;
            case 'copy':
            case 'cut':
                payload = this._getCopyEventData(event);
                break;

            case 'paste':
                payload = this._getPasteEventData(event);
                break;

            case 'mousemove':
                payload = this._getMouseMoveEventData(event);
                break;

            case 'scroll':
                payload = this._getScrollEventData(event);
                break;
        }

        return {
            payload,
            type: event.type,
            timestamp: Date.now()
        };
    }

    _getFocusEventData({target}) {
        return {
            targetPath: this._getDomPath(target)
        }
    }

    _getClickEventData({target}) {
        // todo: coordinates?
        return {
            targetPath: this._getDomPath(target)
        }
    }

    _getKeyupEventData({keyCode, key, code, target}) {
        const targetPath = this._getDomPath(target);
        // todo: add secondary keys (alt, ctrl ... etc)

        return {
            keyCode,
            key,
            code,
            targetPath
        }
    }

    _getCopyEventData({target}) {
        return {
            targetPath: this._getDomPath(target),
            text: window.getSelection().toString()
        }
    }

    _getPasteEventData({target, clipboardData}) {
        return {
            targetPath: this._getDomPath(target),
            text: (clipboardData || window.clipboardData).getData('Text')
        }
    }

    _getMouseMoveEventData({clientX, clientY}) {
        return {
            clientX,
            clientY
        }
    }

    _getScrollEventData({target}) {
        let element;
        if (target === document) {
            element = document.documentElement;
        } else {
            element = target;
        }

        return {
            targetPath: this._getDomPath(element),
            scrollTop: element.scrollTop
        }
    }

    _getDomPath(el) {
        if (this._lastEventElement === el) return this._lastDomPath;

        var stack = [];
        while (el.parentNode) {
            var sibCount = 0;
            var sibIndex = 0;
            for (var i = 0; i < el.parentNode.childNodes.length; i++) {
                var sib = el.parentNode.childNodes[i];
                if (sib.nodeName == el.nodeName) {
                    if (sib === el) {
                        sibIndex = sibCount;
                    }
                    sibCount++;
                }
            }
            if (el.hasAttribute('id') && el.id != '') {
                stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
            } else if (sibCount > 1) {
                stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
            } else {
                stack.unshift(el.nodeName.toLowerCase());
            }
            el = el.parentNode;
        }

        this._lastEventElement = el;
        this._lastDomPath = stack.slice(1); // removes the html element
        return this._lastDomPath;
    }

    destroy() {
        this._lastEventElement = null;
    }
}
