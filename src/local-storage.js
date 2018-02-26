export default class LocalStorage {
    constructor() {
        this._ls = window.localStorage;
    }

    set(key, value) {
        try {
            this._ls.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    }

    get(key) {
        return JSON.parse(this._ls.getItem(key));
    }

    remove(key) {
        return this._ls.removeItem(key);
    }

    clear() {
        return this._ls.clear();
    }
}
