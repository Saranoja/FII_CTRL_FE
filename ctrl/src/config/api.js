// const ENV = window._env_ || process.env;

const BASE = 'http://localhost:5000';
// const base = 'https://fii-ctrl.appspot.com';

const API = {
  login: `${BASE}/login`,
  logout: `${BASE}/logout`,
  refresh: `${BASE}/refresh`,
  users: `${BASE}/users`,
  current_user: `${BASE}/current-user`,
  teaching: `${BASE}/current-user/teaching`,
  resources: `${BASE}/resources`,
  articles: `${BASE}/articles`,
  announcements: `${BASE}/announcements`,
  groups: `${BASE}/discussion-groups`,
  profile: `${BASE}/profile`,
  teachers: `${BASE}/teachers`,
  students: `${BASE}/students`,
  assignments: `${BASE}/assignments`,
};

export default API;
