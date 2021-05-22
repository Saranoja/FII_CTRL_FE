import { GET, PATCH, createHeaderWithToken } from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from '../../userManager';

import actionTypes from './actionTypes';

export const retrieveProfileDetails = createPrefixedAction(
  actionTypes.GET_PROFILE_DETAILS
);
export const updateProfileDetails = createPrefixedAction(
  actionTypes.PATCH_ANNOUNCEMENT
);

export const loadProfileDetails = (userId) => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveProfileDetails(
      GET(`${userManager.config.profile}/${userId}`, {}, header)
    )
  );
};

export const patchProfileDetails = (userId, newDetailsData = {}) => (
  dispatch
) => {
  const header = createHeaderWithToken();
  dispatch(
    updateProfileDetails(
      PATCH(`${userManager.config.profile}/${userId}`, newDetailsData, header)
    )
  );
};
