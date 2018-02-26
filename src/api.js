import axios from 'axios';

export default class API {
    constructor({api: {method, url}}) {
        this._method = method;
        this._url = url;
    }

    post(data) {
        return axios({
            method: this._method,
            url: this._url,
            data
        });
    }
}
