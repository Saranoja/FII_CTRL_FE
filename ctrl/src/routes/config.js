import { ErrorPage, TeachersPage, ProfilePage } from 'components';
import Dashboard from 'modules/dashboard';
import Resources from 'modules/resources';
import Login from 'modules/login';
import routePaths from './routePaths';
import Announcements from 'modules/announcements';
import GroupsManager from 'modules/groupsManager';
// import Courses from 'modules/courses';
import Assignments from 'modules/assignments';
import Meetings from 'modules/meetings';
// import Groups from 'modules/groups';
// import Notes from 'modules/notes';
import Profile from 'modules/profile';
import Calendar from 'modules/calendar';

//TODO: actually separate this into routes for students and routes for teachers

/* 
(
        <ErrorPage
          image={Forbidden}
          errorText="Oops... this route is not for you!"
        />
      )
*/
export const privateRoutes = [
  {
    id: 'root',
    path: routePaths.ROOT,
    component: Dashboard,
    title: 'Dashboard',
  },
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
  {
    id: 'teachers',
    path: routePaths.TEACHERS_ALL,
    component: TeachersPage,
    title: 'Teachers',
  },
  {
    id: 'teacher_profile',
    path: routePaths.TEACHERS,
    component: ProfilePage,
    title: 'Teacher Profile',
  },
  // {
  //     id: 'courses',
  //     path: routePaths.COURSES,
  //     component: Courses,
  //     title: 'Courses',
  // },
  {
    id: 'assignments',
    path: routePaths.ASSIGNMENTS,
    component: Assignments,
    title: 'Assignments',
  },
  {
    id: 'groups-manager',
    path: routePaths.GROUPS_MANAGER,
    component: GroupsManager,
    title: 'Groups Manager',
  },
  {
    id: 'meetings',
    path: routePaths.MEETINGS,
    component: Meetings,
    title: 'Meetings',
  },
  {
    id: 'calendar',
    path: routePaths.CALENDAR,
    component: Calendar,
    title: 'Calendar',
  },
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
  {
    id: 'profile',
    path: routePaths.PROFILE,
    component: Profile,
    title: 'Profile',
  },
];
export const publicRoutes = [
  {
    id: 'login',
    path: routePaths.LOGIN,
    component: Login,
    title: 'Login',
  },
  {
    id: 'error',
    path: routePaths.ERROR,
    component: ErrorPage,
    title: 'Error',
  },
];
