import { combineReducers } from 'redux';

import userManager from 'modules/userManager/reducer';
import resources from 'modules/resources/reducer';
import announcements from 'modules/announcements/reducer';

export const REDUCER_KEYS = {
  userManager: 'userManager',
  resources: 'resources',
  announcements: 'announcements',
};

export const rootReducers = {
  [REDUCER_KEYS.userManager]: userManager,
  [REDUCER_KEYS.resources]: resources,
  [REDUCER_KEYS.announcements]: announcements,
};

const createReducer = (asyncReducers) =>
  combineReducers({ ...rootReducers, ...asyncReducers });

export default createReducer;
