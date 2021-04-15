import { POST, GET } from 'config/http';
import userManager from 'modules/userManager';
import actionTypes from './actionTypes';
import { createPrefixedAction } from '../config';

export const getIdmTokens = createPrefixedAction(actionTypes.GET_IDM_TOKENS);
export const signIn = createPrefixedAction(actionTypes.SIGN_IN);
export const signOut = createPrefixedAction(actionTypes.SIGN_OUT);
export const updateTokens = createPrefixedAction(actionTypes.UPDATE_TOKENS);
export const getAccountDetails = createPrefixedAction(actionTypes.GET_ACCOUNT_DETAILS);

export const loadAuthToken = (header) => (dispatch) =>
    dispatch(
        getIdmTokens(
            POST(
                userManager.config.authorization,
                null,
                header,
            )
        )
    );

export const loadAccountDetails = (header) => async (dispatch) => {
    try {
        dispatch(
            getAccountDetails(
                GET(userManager.config.details, header)
            )
        );
    } catch (exception) {
        console.log(exception);
    }
};
