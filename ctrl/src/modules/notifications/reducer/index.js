import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import initialState from './initialState';
import {
  displayNotification,
  dismissNotification,
  deleteNotification,
} from '../actions';
import { localStorageManager, STORE_KEYS } from 'utils';

const notificationPushHandler = [
  displayNotification,
  (state, action) => {
    const { payload } = action;

    localStorageManager.set(STORE_KEYS.NOTIFICATIONS_LIST, [
      ...state.notfications_list,
      payload,
    ]);

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

    const filteredNotificationsList = R.filter(
      (element) => element !== payload,
      state.notfications_list
    );

    localStorageManager.set(
      STORE_KEYS.NOTIFICATIONS_LIST,
      filteredNotificationsList
    );

    return {
      ...state,
      notfications_list: filteredNotificationsList,
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
