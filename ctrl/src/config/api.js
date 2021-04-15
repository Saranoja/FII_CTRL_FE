// const ENV = window._env_ || process.env;

const base = 'http://localhost:5000';

const API = {
    login: `${base}/login`,
    refresh: `${base}/refresh`,
    users: `${base}/users`,
    current_user: `${base}/current-user`,
    teaching: `${base}/current-user/teaching`,
};

export default API;