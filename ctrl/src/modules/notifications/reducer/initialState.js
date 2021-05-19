import { localStorageManager, STORE_KEYS } from 'utils';

// eslint-disable-next-line
export default {
  notfications_list:
    localStorageManager.get(STORE_KEYS.NOTIFICATIONS_LIST) || [],
  is_toast_on: false,
};
