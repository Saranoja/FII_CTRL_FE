// const ENV = window._env_ || process.env;

const BASE = 'http://localhost:8080';
// const base = 'https://fii-ctrl.appspot.com';

const API = {
  login: `${BASE}/login`,
  refresh: `${BASE}/refresh`,
  users: `${BASE}/users`,
  current_user: `${BASE}/current-user`,
  teaching: `${BASE}/current-user/teaching`,
  resources: `${BASE}/resources`,
  articles: `${BASE}/articles`,
  logout: `${BASE}/logout`,
};

export default API;
