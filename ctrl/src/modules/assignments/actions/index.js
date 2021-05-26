import {
  GET,
  POST,
  PATCH,
  DELETE,
  createHeaderWithToken,
  createFormDataHeaderWithToken,
} from 'config/http';
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

export const uploadFile = createPrefixedAction(actionTypes.UPLOAD_FILE);

export const uploadFileToBucket = (file) => (dispatch) => {
  const header = createFormDataHeaderWithToken();
  var formData = new FormData();
  formData.append('file', file);
  return dispatch(
    uploadFile(POST(`${userManager.config.files}`, formData, header))
  );
};

export const loadAssignments = () => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveAssignments(
      GET(`${userManager.config.assignments}/all`, {}, header)
    )
  );
};

export const postAssignment = (groupId, assignment) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    addAssignment(
      POST(`${userManager.config.assignments}/${groupId}`, assignment, header)
    )
  );
};
