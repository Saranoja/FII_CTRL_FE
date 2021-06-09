import { GET, POST, PATCH, DELETE, createHeaderWithToken } from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from 'modules/userManager';

import actionTypes from './actionTypes';

export const addMeeting = createPrefixedAction(actionTypes.POST_MEETING);
export const removeMeeting = createPrefixedAction(actionTypes.DELETE_MEETING);
export const updateMeeting = createPrefixedAction(actionTypes.PATCH_MEETING);
export const retrieveMeetings = createPrefixedAction(actionTypes.GET_MEETINGS);

export const getMeetings = () => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveMeetings(GET(`${userManager.config.meetings}`, {}, header))
  );
};

export const postMeeting = (meetingData) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    addMeeting(POST(`${userManager.config.meetings}`, meetingData, header))
  );
};

export const deleteMeeting = (meetingId) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    removeMeeting(
      DELETE(`${userManager.config.meetings}?id=${meetingId}`, {}, header)
    )
  );
};

export const patchMeeting = (meetingId, newMeetingData = {}) => (dispatch) => {
  const header = createHeaderWithToken();
  dispatch(
    updateMeeting(
      PATCH(
        `${userManager.config.groups}?id=${meetingId}`,
        newMeetingData,
        header
      )
    )
  );
};
