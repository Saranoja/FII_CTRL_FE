import { GET, createHeaderWithToken } from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from 'modules/userManager';

import actionTypes from './actionTypes';

export const retrieveEvents = createPrefixedAction(actionTypes.GET_MEETINGS);

export const getEvents = () => (dispatch) => {
  const header = createHeaderWithToken();
  return dispatch(
    retrieveEvents(GET(`${userManager.config.calendar}`, {}, header))
  );
};
