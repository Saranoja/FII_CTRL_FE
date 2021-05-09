import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';

import { retrieveGroups } from '../actions';

const groupsRetrievalHandler = [
  retrieveGroups,
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

    const response = R.path(['data', 'current_user_groups'], payload);

    return {
      ...state,
      isLoading: false,
      groups: response,
    };
  },
];

const reducer = handleActions(
  new Map([groupsRetrievalHandler]),
  R.clone(initialState)
);

export default reducer;
