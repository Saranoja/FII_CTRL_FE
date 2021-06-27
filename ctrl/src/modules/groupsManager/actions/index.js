import {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
  createHeaderWithToken,
  createFormDataHeaderWithToken,
} from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from 'modules/userManager';

import actionTypes from './actionTypes';

export const addGroup = createPrefixedAction(actionTypes.POST_GROUP);
export const removeGroup = createPrefixedAction(actionTypes.DELETE_GROUP);
export const updateGroup = createPrefixedAction(actionTypes.PATCH_GROUP);
export const addMembers = createPrefixedAction(actionTypes.ADD_MEMBERS);
export const removeMembers = createPrefixedAction(actionTypes.DELETE_MEMBERS);
export const retrieveMembers = createPrefixedAction(actionTypes.GET_MEMBERS);
export const uploadAvatar = createPrefixedAction(actionTypes.UPLOAD_AVATAR);

export const uploadAvatarToBucket = (file) => (dispatch) => {
  const header = createFormDataHeaderWithToken();
  var formData = new FormData();
  formData.append('file', file);
  return dispatch(
    uploadAvatar(
      POST(`${userManager.config.files}?dir=avatars`, formData, header)
    )
  );
};

export const getMembers = (groupId) => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveMembers(
      GET(`${userManager.config.groups}/${groupId}/members`, {}, header)
    )
  );
};
export const putMembers = (groupId, membersListObject) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    addMembers(
      PUT(
        `${userManager.config.groups}/${groupId}/members`,
        membersListObject,
        header
      )
    )
  );
};

export const deleteMembers = (groupId, membersListObject) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    removeMembers(
      DELETE(
        `${userManager.config.groups}/${groupId}/members`,
        membersListObject,
        header
      )
    )
  );
};

export const postGroup = (groupData) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(addGroup(POST(`${userManager.config.groups}`, groupData, header)));
};

export const deleteGroup = (groupId) => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    removeGroup(
      DELETE(`${userManager.config.groups}?id=${groupId}`, {}, header)
    )
  );
};

export const patchGroup = (groupId, newGroupData = {}) => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    updateGroup(
      PATCH(`${userManager.config.groups}?id=${groupId}`, newGroupData, header)
    )
  );
};
