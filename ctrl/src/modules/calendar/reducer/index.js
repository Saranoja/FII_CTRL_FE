import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';

import { retrieveEvents } from '../actions';

const eventsRetrievalHandler = [
  retrieveEvents,
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

    const response = R.path(['data'], payload);

    return {
      ...state,
      isLoading: false,
      currentEvents: response,
    };
  },
];

const reducer = handleActions(
  new Map([eventsRetrievalHandler]),
  R.clone(initialState)
);

export default reducer;
