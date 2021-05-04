import { combineReducers } from 'redux';

import userManager from '../modules/userManager/reducer';
import resources from '../modules/resources/reducer';

export const REDUCER_KEYS = {
  userManager: 'userManager',
  resources: 'resources',
};

export const rootReducers = {
  [REDUCER_KEYS.userManager]: userManager,
  [REDUCER_KEYS.resources]: resources,
};

const createReducer = (asyncReducers) => combineReducers({ ...rootReducers, ...asyncReducers });

export default createReducer;
