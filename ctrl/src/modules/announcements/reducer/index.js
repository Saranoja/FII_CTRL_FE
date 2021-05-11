import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';
import { transformAnnouncementsPayloadData } from './helpers';

import { retrieveGroups, retrieveGroupAnnouncements } from '../actions';

const groupsRetrievalHandler = [
  retrieveGroups,
  (state, action) => {
    const { ready, error, payload } = action;
    if (!ready) {
      return {
        ...state,
        isLoading: true,
      };
    }

    if (error) {
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    }

    const response = R.path(['data', 'current_user_groups'], payload);

    return {
      ...state,
      isLoading: false,
      groups: response,
    };
  },
];

const announcementsRetrievalHandler = [
  retrieveGroupAnnouncements,
  (state, action) => {
    const { ready, error, payload } = action;
    if (!ready) {
      return {
        ...state,
        areAnnouncementsLoading: true,
      };
    }

    if (error) {
      return {
        ...state,
        hasError: true,
        areAnnouncementsLoading: false,
      };
    }

    const response = R.path(['data'], payload);

    return {
      ...state,
      areAnnouncementsLoading: false,
      currentGroupAnnouncements: transformAnnouncementsPayloadData(response),
    };
  },
];

const reducer = handleActions(
  new Map([groupsRetrievalHandler, announcementsRetrievalHandler]),
  R.clone(initialState)
);

export default reducer;
