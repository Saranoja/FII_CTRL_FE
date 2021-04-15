/* eslint-disable import/no-anonymous-default-export */
// const ENV = window._env_ || process.env;
const BASE = 'http://localhost:5000';

export default {
    userManager: {
        authorization: `${BASE}/login`,
        details: `${BASE}/current-user`,
        teaching: `${BASE}/current-user/teaching`,
        resources: `${BASE}/resources`,
        articles: `${BASE}/articles`,
    },
}