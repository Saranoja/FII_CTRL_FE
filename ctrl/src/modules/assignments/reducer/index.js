import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';

import { retrieveAssignments } from '../actions';
import { transformAssignmentsPayloadData } from './helpers';

const assignmentsRetrievalHandler = [
  retrieveAssignments,
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
      currentAssignments: transformAssignmentsPayloadData(response),
    };
  },
];

const reducer = handleActions(
  new Map([assignmentsRetrievalHandler]),
  R.clone(initialState)
);

export default reducer;
