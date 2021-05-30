import { createAction } from 'redux-actions';

export const MODULE_NAME = 'GROUPS_MANAGER';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  MODULE_NAME,
};

export const createPrefixedAction = (type) =>
  createAction(`${MODULE_NAME}/${type}`);
