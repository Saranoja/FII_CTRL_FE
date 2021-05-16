import { GET, POST, PATCH, DELETE, createHeaderWithToken } from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from '../../userManager';

import actionTypes from './actionTypes';

export const retrieveGroups = createPrefixedAction(actionTypes.GET_USER_GROUPS);
export const retrieveGroupAnnouncements = createPrefixedAction(
  actionTypes.GET_GROUP_ANNOUNCEMENTS
);
export const addAnnouncement = createPrefixedAction(
  actionTypes.POST_ANNOUNCEMENT
);
export const removeAnnouncement = createPrefixedAction(
  actionTypes.DELETE_ANNOUNCEMENT
);
export const updateAnnouncement = createPrefixedAction(actionTypes.PATCH);

export const loadGroups = () => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveGroups(GET(`${userManager.config.groups}`, {}, header))
  );
};

export const loadGroupAnnouncements = (groupId) => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveGroupAnnouncements(
      GET(`${userManager.config.announcements}/${groupId}`, {}, header)
    )
  );
};

export const postAnnouncement = (groupId, announcement) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    retrieveGroups(
      POST(
        `${userManager.config.announcements}/${groupId}`,
        announcement,
        header
      )
    )
  );
};

export const deleteAnnouncement = (groupId, announcementId) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    retrieveGroups(
      DELETE(
        `${userManager.config.announcements}/${groupId}?id=${announcementId}`,
        {},
        header
      )
    )
  );
};

export const patchAnnouncement = (
  groupId,
  announcementId,
  newAnnouncementData = {}
) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    retrieveGroups(
      PATCH(
        `${userManager.config.announcements}/${groupId}?id=${announcementId}`,
        newAnnouncementData,
        header
      )
    )
  );
};
