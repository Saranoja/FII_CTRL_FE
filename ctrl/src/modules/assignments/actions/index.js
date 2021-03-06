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

export const uploadFileToBucket = (file, dirname = '') => (dispatch) => {
  const header = createFormDataHeaderWithToken();
  var formData = new FormData();
  formData.append('file', file);
  const dir = dirname.length ? `?dir=${dirname}` : '';
  return dispatch(
    uploadFile(POST(`${userManager.config.files}${dir}`, formData, header))
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

export const deleteAssignment = (groupId, assignmentId) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    removeAssignment(
      DELETE(
        `${userManager.config.assignments}/${groupId}?id=${assignmentId}`,
        {},
        header
      )
    )
  );
};

export const patchAssignment = (
  groupId,
  announcementId,
  newAssignmentData = {}
) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    updateAssignment(
      PATCH(
        `${userManager.config.assignments}/${groupId}?id=${announcementId}`,
        newAssignmentData,
        header
      )
    )
  );
};
