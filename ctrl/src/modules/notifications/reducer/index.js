import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';
import {
  displayNotification,
  dismissNotification,
  deleteNotification,
} from '../actions';

const notificationPushHandler = [
  displayNotification,
  (state, action) => {
    const { payload } = action;

    return {
      ...state,
      notfications_list: [...state.notfications_list, payload],
      is_toast_on: true,
    };
  },
];

const notificationHideHandler = [
  dismissNotification,
  (state, action) => {
    return {
      ...state,
      is_toast_on: false,
    };
  },
];

const notificationRemovalHandler = [
  deleteNotification,
  (state, action) => {
    const { payload } = action;

    return {
      ...state,
      notfications_list: R.remove(0, payload, state.notfications_list),
    };
  },
];

const reducer = handleActions(
  new Map([
    notificationPushHandler,
    notificationRemovalHandler,
    notificationHideHandler,
  ]),
  R.clone(initialState)
);

export default reducer;
