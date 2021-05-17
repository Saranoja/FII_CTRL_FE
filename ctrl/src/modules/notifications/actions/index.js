import { createPrefixedAction } from '../config';
import actionTypes from './actionTypes';

export const displayNotification = createPrefixedAction(
  actionTypes.DISPLAY_NOTIFICATION
);

export const dismissNotification = createPrefixedAction(
  actionTypes.HIDE_NOTIFICATION
);

export const deleteNotification = createPrefixedAction(
  actionTypes.REMOVE_NOTIFICATION
);

export const loadNotification = (newNotification) => (dispatch) => {
  dispatch(displayNotification(newNotification));
};

export const hideNotification = () => (dispatch) => {
  dispatch(dismissNotification());
};

export const removeNotification = (notification) => (dispatch) => {
  dispatch(displayNotification({ notification }));
};
