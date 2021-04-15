import * as R from 'ramda';

export const REDIRECT_TIME_VALUE = 1500;
export const IDM_REFRESH_TOKEN_ERROR = 'Invalid refresh_token';


export const transformAuthData = (data = {}) =>
    R.pick(['refresh_token', 'token'], data);


export const getAuthPayload = (refreshToken) => ({
    refresh_token: refreshToken,
});

export const authErrorHandler = (exception, user) => {
    console.log(
        `Failed to authenticate user ${user}. ${exception}`,
        R.prop('stack', exception)
    );

    return Promise.reject();
};

