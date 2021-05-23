import { GET, createHeaderWithToken } from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from 'modules/userManager';

import actionTypes from './actionTypes';

export const retrieveTeachers = createPrefixedAction(
  actionTypes.GET_ALL_TEACHERS
);

export const loadTeachers = () => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveTeachers(GET(`${userManager.config.teachers}`, {}, header))
  );
};
