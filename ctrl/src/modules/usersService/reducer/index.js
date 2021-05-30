import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';

import { transformPayloadData } from './helpers';

import { retrieveTeachers, retrieveStudents } from '../actions';

const teachersRetrievalHandler = [
  retrieveTeachers,
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
      teachersList: transformPayloadData(response),
    };
  },
];

const studentsRetrievalHandler = [
  retrieveStudents,
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
      studentsList: transformPayloadData(response),
    };
  },
];

const reducer = handleActions(
  new Map([teachersRetrievalHandler, studentsRetrievalHandler]),
  R.clone(initialState)
);

export default reducer;
