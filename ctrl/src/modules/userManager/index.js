import * as R from 'ramda';
import CONFIG from '../../config';
import { isBlank, localStorageManager, STORE_KEYS } from '../../utils';

class UserManager {
    constructor() {
        this.config = CONFIG.userManager;
        this.loginUrl = this.config.authorization;
    }

    getIdmData = () => localStorageManager.get(STORE_KEYS.ID);

    getIdToken = () => R.prop('token', this.getIdmData());

    getRefreshToken = () => R.prop('refresh_token', this.getIdmData());

    isLoggedIn = () => !isBlank(R.prop('token', localStorageManager.get(STORE_KEYS.ID)));

    setIdmData = (data) => {
        const existingIdmData = this.getIdmData();

        localStorageManager.set(STORE_KEYS.ID, { ...existingIdmData, ...data });
    };

    setTokens = (data) => {
        localStorageManager.set(STORE_KEYS.ID.token, data.token);
        localStorageManager.set(STORE_KEYS.ID.refresh_token, data.refresh_token);
    };

    clearData = () => {
        localStorageManager.removeItem(STORE_KEYS.ID);
    };

    isTeaching = async () => {
        return R.prop('teaching', this.getIdmData());
    }
}

const userManager = new UserManager();

export default userManager;
