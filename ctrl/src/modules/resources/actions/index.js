import { POST, createHeaderWithRefreshToken } from '../../../config/http';
import { createPrefixedAction } from '../config';
import userManager from '../../userManager';

import actionTypes from './actionTypes';

export const uploadFile = createPrefixedAction(actionTypes.UPLOAD_FILE);
export const postFile = createPrefixedAction(actionTypes.POST_FILE);
export const postFileArticles = createPrefixedAction(
  actionTypes.POST_FILE_ARTICLES,
);
export const resetState = createPrefixedAction(actionTypes.RESET_STATE);
export const resetSearch = createPrefixedAction(actionTypes.RESET_SEARCH);

export const loadResourcesForFile = (file) => (dispatch) => {
  dispatch(uploadFile({ file }));
};

export const getResetState = () => (dispatch) => {
  dispatch(resetState({}));
};

export const getResetSearch = () => (dispatch) => {
  dispatch(resetSearch({}));
};

export const getResourcesForFile = (file, subjectId) => (dispatch) => {
  const header = createHeaderWithRefreshToken();
  dispatch(
    postFile(
      POST(`${userManager.config.resources}/${subjectId}/pdf`, file, header),
    ),
  );
};

export const getArticlesForFile = (file) => (dispatch) => {
  const header = createHeaderWithRefreshToken();
  dispatch(
    postFileArticles(POST(`${userManager.config.articles}/pdf`, file, header)),
  );
};
