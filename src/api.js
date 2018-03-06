export default class API {
    constructor({api: {method, url}}) {
        this._method = method;
        this._url = url;
    }

    post(data) {
        return fetch(this._url, {
            method: this._method.toUpperCase(),
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',       // receive json
                'Content-Type': 'application/json'  // send json
            }
        })
            .then(this._status)
            .then(this._json);
    }

    _status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    _json(response) {
        return response.json();
    }
}
