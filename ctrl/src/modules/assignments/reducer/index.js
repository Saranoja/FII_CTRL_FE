import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';

import { retrieveAssignments, addAssignment, uploadFile } from '../actions';
import {
  transformAssignmentsPayloadData,
  extractSubjectsFromPayloadData,
} from './helpers';

const fileUploaToBucketdHandler = [
  uploadFile,
  (state, action) => {
    const { ready, error } = action;

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

    return {
      ...state,
      isLoading: false,
    };
  },
];

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
      subjects: extractSubjectsFromPayloadData(response),
    };
  },
];

const assignmentsPostHandler = [
  addAssignment,
  (state, action) => {
    const { ready, error } = action;
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

    return {
      ...state,
      isLoading: false,
    };
  },
];

const reducer = handleActions(
  new Map([
    assignmentsRetrievalHandler,
    assignmentsPostHandler,
    fileUploaToBucketdHandler,
  ]),
  R.clone(initialState)
);

export default reducer;
