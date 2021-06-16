import { POST, createHeaderWithToken } from 'config/http';
import { createPrefixedAction } from '../config';
import userManager from 'modules/userManager';

import actionTypes from './actionTypes';

export const postFile = createPrefixedAction(actionTypes.POST_FILE_MAPPING);

export const postBibliography = (bibliographyMapping, subjectId) => (
  dispatch
) => {
  const header = createHeaderWithToken();
  return dispatch(
    postFile(
      POST(
        `${userManager.config.bibliography}/${subjectId}`,
        bibliographyMapping,
        header
      )
    )
  );
};
