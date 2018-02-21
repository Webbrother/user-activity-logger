export default class API {
    constructor(config) {
        this._config = config;
    }

    post() {
        // debug code
        return new Promise((res, rej) => {
            setTimeout(res, 200);
        });
    }
}
