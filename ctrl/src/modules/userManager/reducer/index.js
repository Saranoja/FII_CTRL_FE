import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import userManager from 'modules/userManager';
import initialState from './initialState';
import { signIn, signOut, getIdmTokens, getAccountDetails } from '../actions';
import { transformAuthData } from '../helpers';

const signInHandler = [
  signIn,
  (state) => ({
    ...state,
    hasId: true,
  }),
];

const signOutHandler = [
  signOut,
  (state) => ({
    ...state,
    hasId: false,
  }),
];

const getIdmTokensHandler = [
  getIdmTokens,
  (state, action) => {
    const { ready, error, payload } = action;

    if (!ready) {
      return {
        ...state,
        isLoading: true,
      };
    }

    if (error) {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }

    const idm = transformAuthData(R.prop('data', payload));
    userManager.setIdmData(idm);
    return {
      ...state,
      isLoading: false,
      hasError: false,
      hasId: true,
      idm,
    };
  },
];

const getAccountDetailsHandler = [
  getAccountDetails,
  (state, action) => {
    const { ready, error, payload } = action;

    if (!ready) {
      return {
        ...state,
        isLoading: true,
      };
    }

    if (error) {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }

    const data = R.prop('data', payload);
    userManager.setIdmData(data);
    return {
      ...state,
      isLoading: false,
      first_name: R.prop('first_name', data),
      last_name: R.prop('last_name', data),
      teaching: R.prop('teaching', data),
      id: R.prop('id', data),
    };
  },
];

const reducer = handleActions(
  new Map([
    getIdmTokensHandler,
    getAccountDetailsHandler,
    signInHandler,
    signOutHandler,
  ]),
  R.clone(initialState)
);

export default reducer;
