import { ErrorPage } from 'components';
import Dashboard from 'modules/dashboard';
import Resources from 'modules/resources';
import Login from 'modules/login';
import routePaths from './routePaths';
import Announcements from 'modules/announcements';
// import Courses from 'modules/courses';
// import Assignments from 'modules/assignments';
// import Meetings from 'modules/meetings';
// import Groups from 'modules/groups';
// import Notes from 'modules/notes';
// import PersonalPage from 'modules/personalPage';

//TODO: actually separate this into routes for students and routes for teachers

export const privateRoutes = [
  {
    id: 'dashboard',
    path: routePaths.DASHBOARD,
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    id: 'resources',
    path: routePaths.RESOURCES,
    component: Resources,
    title: 'Resources',
  },
  {
    id: 'announcements',
    path: routePaths.ANNOUNCEMENTS,
    component: Announcements,
    title: 'Announcements',
  },
  // {
  //     id: 'courses',
  //     path: routePaths.COURSES,
  //     component: Courses,
  //     title: 'Courses',
  // },
  // {
  //     id: 'assignments',
  //     path: routePaths.ASSIGNMENTS,
  //     component: Assignments,
  //     title: 'Assignments',
  // },
  // {
  //     id: 'meetings',
  //     path: routePaths.MEETINGS,
  //     component: Meetings,
  //     title: 'Meetings',
  // },
  // {
  //     id: 'groups',
  //     path: routePaths.GROUPS,
  //     component: Groups,
  //     title: 'Groups',
  // },
  // {
  //     id: 'notes',
  //     path: routePaths.NOTES,
  //     component: Notes,
  //     title: 'Notes',
  // },
  // {
  //     id: 'personal',
  //     path: routePaths.PERSONAL,
  //     component: PersonalPage,
  //     title: 'Personal',
  // },
];
export const publicRoutes = [
  {
    id: 'login',
    path: routePaths.LOGIN,
    component: Login,
    title: 'Login',
  },
  {
    id: 'root',
    path: routePaths.ROOT,
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    id: 'error',
    path: routePaths.ERROR,
    component: ErrorPage,
    title: 'Error',
  },
];
