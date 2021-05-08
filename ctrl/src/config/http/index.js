import axios from 'axios';
import { isBlank } from '../../utils';
import { getToken, getRefreshToken } from './helpers';
import { errorHandler } from './refreshInterceptor';

export const createHeaderWithToken = (headers = {}) => {
  const token = getToken();
  if (isBlank(token)) return headers;

  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    ...headers,
  };
};

export const createHeaderWithRefreshToken = (headers = {}) => {
  const token = getRefreshToken();
  if (isBlank(token)) return headers;

  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    ...headers,
  };
};

export const createAuthHeader = (username, password) => {
  if (typeof window === 'undefined') return '';
  const encoded = window.btoa(`${username}:${password}`);
  const auth = `Basic ${encoded}`;

  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: `${auth}`,
  };
};

export const RequestFactory = (
  method,
  url,
  headers,
  data,
  responseType,
  options
) => {
  const augmentedHeaders = createHeaderWithToken(headers || {}, url);
  return axios({
    method,
    url,
    data,
    headers: augmentedHeaders,
    crossDomain: true,
    responseType,
    ...options,
  });
};

export const GET = (url, headers = {}, ...options) =>
  RequestFactory('get', url, headers, null, null, ...options);

export const HEAD = (url, headers = {}, ...options) =>
  RequestFactory('head', url, headers, null, null, ...options);

export const POST = (url, data, headers = {}, ...options) =>
  RequestFactory('post', url, headers, data, null, ...options);

export const PUT = (url, data, headers = {}, ...options) =>
  RequestFactory('put', url, headers, data, null, ...options);

export const PATCH = (url, data, headers = {}, ...options) =>
  RequestFactory('patch', url, headers, data, null, ...options);

export const DELETE = (url, headers = {}, ...options) =>
  RequestFactory('delete', url, headers, null, null, ...options);

export const configureRefreshInterceptor = (signOut) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => errorHandler(error, signOut)
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  RequestFactory,
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
};
