import * as R from 'ramda';
import CONFIG from 'config';
import routePaths from 'routes/routePaths';
import { isBlank, localStorageManager, STORE_KEYS } from 'utils';
import { createHeaderWithToken, POST } from 'config/http';

class UserManager {
  constructor() {
    this.config = CONFIG.userManager;
    this.loginUrl = this.config.authorization;
    this.logoutUrl = this.config.logout;
  }

  getIdmData = () => localStorageManager.get(STORE_KEYS.ID);

  getIdToken = () => R.prop('token', this.getIdmData());

  getRefreshToken = () => R.prop('refresh_token', this.getIdmData());

  isLoggedIn = () =>
    !isBlank(R.prop('token', localStorageManager.get(STORE_KEYS.ID)));

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
    localStorageManager.removeItem(STORE_KEYS.PERSISTED_PATH);
    localStorageManager.removeItem(STORE_KEYS.NOTIFICATIONS_LIST);
    localStorageManager.removeItem(STORE_KEYS.LAST_VISITED_GROUP);
  };

  isTeaching = () => {
    return R.prop('teaching', this.getIdmData());
  };

  getGroup = () => {
    return R.prop('group', this.getIdmData());
  };

  getYear = () => {
    return R.prop('year', this.getIdmData());
  };

  logout = () => {
    const header = createHeaderWithToken();
    POST(this.config.logout, {}, header).then(() => {
      window.location.replace(routePaths.LOGIN);
      this.clearData();
    });
  };

  redirectToErrorPage = () => {
    window.location.replace(routePaths.ERROR);
  };
}

const userManager = new UserManager();

export default userManager;
