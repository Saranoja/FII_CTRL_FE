import axios from 'axios';
import * as R from 'ramda';
import { createHeaderWithRefreshToken } from 'config/http';
import {
  getErrorCode,
  isStatus,
  withCache,
  includes,
  safeJSONParse,
} from 'utils';
import userManager from 'modules/userManager';
import { transformAuthData } from 'modules/userManager/helpers';

/* 
the point with this is that we don't want to do multiple 
token calls - in case there are concurrent api calls on the same page
60 seconds should be more than enough of a lifetime for this
*/
const cachedAxios = withCache(axios, 60);

export const AUTH_ERROR_CODES = {
  ID_TOKEN_INVALID: 'ID_TOKEN_INVALID',
  TOKEN_HAS_NOT_EXPIRED_YET: 'TOKEN_HAS_NOT_EXPIRED_YET',
};

const isTokenInvalid = (error) => {
  const isRefreshPath = includes(R.path(['config', 'url'], error), 'refresh');

  return (
    isStatus(401, error) &&
    !isRefreshPath &&
    getErrorCode(error) in AUTH_ERROR_CODES
  );
};

export const refreshIdToken = () => {
  return new Promise(function refreshIdm(resolve, reject) {
    const refreshToken = userManager.getRefreshToken();
    if (!refreshToken) {
      userManager.logout();
      return reject('Refresh token missing');
    }

    const header = createHeaderWithRefreshToken();

    return cachedAxios({
      method: 'POST',
      url: userManager.config.refresh,
      data: {},
      headers: header,
    })
      .then((body) => {
        console.log('Successfully refreshed ID token');
        const data = R.prop('data', body);
        const transformedData = transformAuthData(data);
        userManager.setIdmData(transformedData);
        resolve(transformedData);
      })
      .catch((exception) => {
        console.log(
          `[AUTH] An exception occurred during the id refresh flow.`,
          exception
        );
        userManager.logout();
        reject(exception);
      });
  });
};

const updateRefreshToken = (data) => {
  const parsed = safeJSONParse(data);
  if (R.prop('refresh_token', parsed)) {
    parsed.refresh_token = userManager.getRefreshToken();
    return JSON.stringify(parsed);
  }
  return data;
};

const refreshInterceptor = (error) => {
  const originalRequest = error.config;

  if (isTokenInvalid(error) && !originalRequest.retry) {
    console.log('Starting refresh token process...');
    originalRequest.retry = true;

    return new Promise(function refresh(resolve) {
      refreshIdToken()
        .then(() => {
          console.log('Refresh flow successful, replaying original request');

          const bearer = `Bearer ${userManager.getIdToken()}`;
          originalRequest.data = updateRefreshToken(originalRequest.data);
          originalRequest.headers.Authorization = bearer;
          resolve(axios(originalRequest));
        })
        .catch((exception) => {
          console.log(
            `Exception occurred during authentication flow ${exception}`
          );
        });
    });
  }
  return Promise.reject(error);
};

export const errorHandler = (error) => {
  return refreshInterceptor(error);
};

export default refreshInterceptor;
