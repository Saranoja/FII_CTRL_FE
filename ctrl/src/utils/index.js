import * as R from 'ramda';

export const localStorageManager = {
    set: function set(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    get: function get(key) {
        var item = localStorage.getItem(key);

        if (item && item !== 'undefined') {
            try {
                return JSON.parse(item);
            }
            catch (e) {
                console.log(`Item ${item} cannot be parsed as json`);
            }
        }

        return '';
    },
    removeAll: function removeAll() {
        return localStorage.clear()
    },
    removeItem: function removeItem(key) {
        return localStorage.removeItem(key);
    }
};

export const STORE_KEYS = {
    ID: 'account',
};

export const clearInternalCache = () => {
    window.internalCache = {};
}

export const isBlank = (x) => R.isNil(x) || R.isEmpty(x);

export const reloadPage = () => {
    window.location.reload();
}