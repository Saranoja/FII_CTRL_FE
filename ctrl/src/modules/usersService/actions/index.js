import { GET, createHeaderWithToken } from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from 'modules/userManager';

import actionTypes from './actionTypes';

export const retrieveTeachers = createPrefixedAction(
  actionTypes.GET_ALL_TEACHERS
);

export const retrieveStudents = createPrefixedAction(actionTypes.GET_STUDENTS);

export const loadTeachers = () => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveTeachers(GET(`${userManager.config.teachers}`, {}, header))
  );
};

export const loadStudents = (year, group) => (dispatch) => {
  const header = createHeaderWithToken();
  let yearParam = '';
  let groupParam = '';
  if (year) yearParam = `year=${year}`;
  if (group) groupParam = `group=${group}`;
  return dispatch(
    retrieveStudents(
      GET(
        `${userManager.config.students}?${yearParam}&${groupParam}`,
        {},
        header
      )
    )
  );
};
