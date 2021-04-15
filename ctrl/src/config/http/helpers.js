import userManager from '../../modules/userManager';

export const getToken = () => userManager.getIdToken();
export const getRefreshToken = () => userManager.getRefreshToken();