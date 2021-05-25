import { GET, POST, PATCH, DELETE, createHeaderWithToken } from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from '../../userManager';

import actionTypes from './actionTypes';

export const retrieveAssignments = createPrefixedAction(
  actionTypes.GET_ASSIGNMENTS
);
export const addAssignment = createPrefixedAction(actionTypes.POST_ASSIGNMENT);
export const removeAssignment = createPrefixedAction(
  actionTypes.DELETE_ASSIGNMENT
);
export const updateAssignment = createPrefixedAction(
  actionTypes.PATCH_ASSIGNMENT
);

export const loadAssignments = () => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveAssignments(
      GET(`${userManager.config.assignments}/all`, {}, header)
    )
  );
};
