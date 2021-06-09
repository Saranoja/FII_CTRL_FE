import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';

import { transformMeetingsPayloadData } from './helpers';

import { retrieveMeetings } from '../actions';

const meetingsRetrievalHandler = [
  retrieveMeetings,
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
      currentMeetings: transformMeetingsPayloadData(response),
    };
  },
];

const reducer = handleActions(
  new Map([meetingsRetrievalHandler]),
  R.clone(initialState)
);

export default reducer;
