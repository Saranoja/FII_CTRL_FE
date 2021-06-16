/* eslint-disable import/no-anonymous-default-export */
// const ENV = window._env_ || process.env;
const BASE = 'http://localhost:5000';
// const BASE = 'https://fii-ctrl.appspot.com';

export default {
  userManager: {
    authorization: `${BASE}/login`,
    details: `${BASE}/current-user`,
    teaching: `${BASE}/current-user/teaching`,
    resources: `${BASE}/resources`,
    articles: `${BASE}/articles`,
    announcements: `${BASE}/announcements`,
    groups: `${BASE}/groups`,
    refresh: `${BASE}/refresh`,
    logout: `${BASE}/logout`,
    profile: `${BASE}/profile`,
    teachers: `${BASE}/teachers`,
    students: `${BASE}/students`,
    assignments: `${BASE}/assignments`,
    files: `${BASE}/files`,
    meetings: `${BASE}/meetings`,
    calendar: `${BASE}/calendar`,
    bibliography: `${BASE}/bibliography`,
  },
};
