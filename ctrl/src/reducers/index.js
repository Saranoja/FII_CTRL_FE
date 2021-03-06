import { combineReducers } from 'redux';

import userManager from 'modules/userManager/reducer';
import resources from 'modules/resources/reducer';
import announcements from 'modules/announcements/reducer';
import notifications from 'modules/notifications/reducer';
import profile from 'modules/profile/reducer';
import usersService from 'modules/usersService/reducer';
import assignments from 'modules/assignments/reducer';
import groups from 'modules/groupsManager/reducer';
import meetings from 'modules/meetings/reducer';
import calendar from 'modules/calendar/reducer';

export const REDUCER_KEYS = {
  userManager: 'userManager',
  resources: 'resources',
  announcements: 'announcements',
  notifications: 'notifications',
  profile: 'profile',
  usersService: 'usersService',
  assignments: 'assignments',
  groups: 'groups',
  meetings: 'meetings',
  calendar: 'calendar',
};

export const rootReducers = {
  [REDUCER_KEYS.userManager]: userManager,
  [REDUCER_KEYS.resources]: resources,
  [REDUCER_KEYS.announcements]: announcements,
  [REDUCER_KEYS.notifications]: notifications,
  [REDUCER_KEYS.profile]: profile,
  [REDUCER_KEYS.usersService]: usersService,
  [REDUCER_KEYS.assignments]: assignments,
  [REDUCER_KEYS.groups]: groups,
  [REDUCER_KEYS.meetings]: meetings,
  [REDUCER_KEYS.calendar]: calendar,
};

const createReducer = (asyncReducers) =>
  combineReducers({ ...rootReducers, ...asyncReducers });

export default createReducer;
