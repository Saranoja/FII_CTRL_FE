import { combineReducers } from 'redux';

import userManager from 'modules/userManager/reducer';
import resources from 'modules/resources/reducer';
import announcements from 'modules/announcements/reducer';
import notifications from 'modules/notifications/reducer';
import profile from 'modules/profile/reducer';
import usersService from 'modules/usersService/reducer';

export const REDUCER_KEYS = {
  userManager: 'userManager',
  resources: 'resources',
  announcements: 'announcements',
  notifications: 'notifications',
  profile: 'profile',
  usersService: 'usersService',
};

export const rootReducers = {
  [REDUCER_KEYS.userManager]: userManager,
  [REDUCER_KEYS.resources]: resources,
  [REDUCER_KEYS.announcements]: announcements,
  [REDUCER_KEYS.notifications]: notifications,
  [REDUCER_KEYS.profile]: profile,
  [REDUCER_KEYS.usersService]: usersService,
};

const createReducer = (asyncReducers) =>
  combineReducers({ ...rootReducers, ...asyncReducers });

export default createReducer;
