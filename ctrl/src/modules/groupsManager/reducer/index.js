import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';

import { uploadAvatar, retrieveMembers } from '../actions';

const avatarUploadToBucketdHandler = [
  uploadAvatar,
  (state, action) => {
    const { ready, error } = action;

    if (!ready) {
      return {
        ...state,
        isAvatarLoading: true,
      };
    }

    if (error) {
      return {
        ...state,
        hasError: true,
        isAvatarLoading: false,
      };
    }

    return {
      ...state,
      isAvatarLoading: false,
    };
  },
];

const membersRetrievalHandler = [
  retrieveMembers,
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

    const response = R.path(['data', 'members'], payload);

    return {
      ...state,
      isLoading: false,
      currentGroupMembers: response,
    };
  },
];

const reducer = handleActions(
  new Map([avatarUploadToBucketdHandler, membersRetrievalHandler]),
  R.clone(initialState)
);

export default reducer;
