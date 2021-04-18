/* eslint-disable import/no-anonymous-default-export */
// const ENV = window._env_ || process.env;
const BASE = 'https://fii-ctrl.appspot.com/';

export default {
    userManager: {
        authorization: `${BASE}/login`,
        details: `${BASE}/current-user`,
        teaching: `${BASE}/current-user/teaching`,
        resources: `${BASE}/resources`,
        articles: `${BASE}/articles`,
    },
}