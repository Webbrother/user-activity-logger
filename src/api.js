import axios from 'axios';

export default class API {
    constructor(config) {
        this._config = config;
        this._url = 'https://lf1tgbnnm2.execute-api.us-east-1.amazonaws.com/dev/events';
        // curl https://lf1tgbnnm2.execute-api.us-east-1.amazonaws.com/dev/events -v -POST -d’
    }

    post(data) {
        // debug code
        // return new Promise((res, rej) => {
        //     setTimeout(res, 200);
        //     setTimeout(rej, 200);
        // });

        return axios.post(this._url, data);
    }
}
