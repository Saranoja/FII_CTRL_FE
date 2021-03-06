import * as R from 'ramda';

export { default as withCache } from './withCache';

export const localStorageManager = {
  set: function set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  },
  get: function get(key) {
    const item = localStorage.getItem(key);

    if (item && item !== 'undefined') {
      try {
        return JSON.parse(item);
      } catch (e) {
        console.log(`Item ${item} cannot be parsed as json`);
      }
    }

    return '';
  },
  removeAll: function removeAll() {
    return localStorage.clear();
  },
  removeItem: function removeItem(key) {
    return localStorage.removeItem(key);
  },
};

export const STORE_KEYS = {
  ID: 'account',
  IS_DARK_THEME: 'dark_theme',
  LAST_VISITED_GROUP: 'last_visited_group',
  NOTIFICATIONS_LIST: 'notifications_list',
  PERSISTED_PATH: 'persisted_path',
};

export const clearInternalCache = () => {
  window.internalCache = {};
};

export const isBlank = (x) => R.isNil(x) || R.isEmpty(x);

export const toLower = (string = '') => {
  return string ? String(string).toLowerCase() : '';
};

export const toUpper = (string = '') => {
  return string ? String(string).toUpperCase() : '';
};

export const reloadPage = () => {
  window.location.reload();
};

export const includes = (string, substring) =>
  typeof string === 'string' ? string.includes(substring) : false;

export const getErrorCode = R.path(['response', 'data', 'code']);

export const hasIntersection =
  typeof window !== 'undefined' &&
  ('IntersectionObserver' in window || 'IntersectionObserverEntry' in window);

export const safeJSONParse = (data) => {
  try {
    return JSON.parse(data);
  } catch (ex) {
    return null;
  }
};

export const isStatus = (status, error) =>
  R.path(['response', 'status'], error) === status;

export const openLinkInNewTab = (url) => {
  window.open(url, '_blank');
};

export const timeFormat = 'LLLL';
