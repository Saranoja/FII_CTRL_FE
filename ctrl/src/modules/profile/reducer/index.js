import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';

import { retrieveProfileDetails } from '../actions';

const detailsRetrievalHandler = [
  retrieveProfileDetails,
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

    const response = R.prop('data', payload);

    return {
      ...state,
      isLoading: false,
      profileDetails: response,
    };
  },
];

const reducer = handleActions(
  new Map([detailsRetrievalHandler]),
  R.clone(initialState)
);

export default reducer;
