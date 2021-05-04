// const ENV = window._env_ || process.env;

const base = 'http://localhost:8080';
// const base = 'https://fii-ctrl.appspot.com';

const API = {
  login: `${base}/login`,
  refresh: `${base}/refresh`,
  users: `${base}/users`,
  current_user: `${base}/current-user`,
  teaching: `${base}/current-user/teaching`,
};

export default API;
