import { POST, PATCH, DELETE, createHeaderWithToken } from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from 'modules/userManager';

import actionTypes from './actionTypes';

export const addGroup = createPrefixedAction(actionTypes.POST_GROUP);
export const removeGroup = createPrefixedAction(actionTypes.DELETE_GROUP);
export const updateGroup = createPrefixedAction(actionTypes.PATCH_GROUP);
export const addMembers = createPrefixedAction(actionTypes.ADD_MEMBERS);
export const removeMembers = createPrefixedAction(actionTypes.DELETE_MEMBERS);

export const postMembers = (groupId, membersListObject) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    addMembers(
      POST(
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
  dispatch(
    removeGroup(
      DELETE(`${userManager.config.groups}?id=${groupId}`, {}, header)
    )
  );
};

export const patchGroup = (groupId, newGroupData = {}) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    updateGroup(
      PATCH(`${userManager.config.groups}/?id=${groupId}`, newGroupData, header)
    )
  );
};
