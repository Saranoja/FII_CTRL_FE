import * as R from 'ramda';
import userManager from '../../modules/userManager';
import API from '../api';

export const getToken = () => userManager.getIdToken();
export const getRefreshToken = () => userManager.getRefreshToken();

export const ID_ONLY_ROUTES = [
  API.refresh,
  API.users,
  API.current_user,
  API.teaching,
  API.resources,
  API.articles,
  API.logout,
];

export const isIdOnlyRoute = (url) =>
  R.any((item) => url.includes(item), ID_ONLY_ROUTES);
