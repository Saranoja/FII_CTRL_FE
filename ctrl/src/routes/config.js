import { ErrorPage, TeachersPage, ProfilePage, NotFoundPage } from 'components';
import Dashboard from 'modules/dashboard';
import Resources from 'modules/resources';
import Login from 'modules/login';
import routePaths from './routePaths';
import Announcements from 'modules/announcements';
import GroupsManager from 'modules/groupsManager';
import Assignments from 'modules/assignments';
import Meetings from 'modules/meetings';
import Profile from 'modules/profile';
import Calendar from 'modules/calendar';
import ResourcesManager from 'modules/resourcesManager';

export const privateRoutes = [
  {
    id: 'root',
    path: routePaths.ROOT,
    component: Dashboard,
    title: 'Dashboard',
    teacherAuthorized: true,
    studentAuthorized: true,
  },
  {
    id: 'dashboard',
    path: routePaths.DASHBOARD,
    component: Dashboard,
    title: 'Dashboard',
    teacherAuthorized: true,
    studentAuthorized: true,
  },
  {
    id: 'resources',
    path: routePaths.RESOURCES,
    component: Resources,
    title: 'Resources',
    teacherAuthorized: false,
    studentAuthorized: true,
  },
  {
    id: 'announcements',
    path: routePaths.ANNOUNCEMENTS,
    component: Announcements,
    title: 'Announcements',
    teacherAuthorized: true,
    studentAuthorized: true,
  },
  {
    id: 'teachers',
    path: routePaths.TEACHERS_ALL,
    component: TeachersPage,
    title: 'Teachers',
    teacherAuthorized: false,
    studentAuthorized: true,
  },
  {
    id: 'teacher_profile',
    path: routePaths.TEACHERS,
    component: ProfilePage,
    title: 'Teacher Profile',
    teacherAuthorized: false,
    studentAuthorized: true,
  },
  {
    id: 'assignments',
    path: routePaths.ASSIGNMENTS,
    component: Assignments,
    title: 'Assignments',
    teacherAuthorized: true,
    studentAuthorized: true,
  },
  {
    id: 'groups-manager',
    path: routePaths.GROUPS_MANAGER,
    component: GroupsManager,
    title: 'Groups Manager',
    teacherAuthorized: true,
    studentAuthorized: false,
  },
  {
    id: 'meetings',
    path: routePaths.MEETINGS,
    component: Meetings,
    title: 'Meetings',
    teacherAuthorized: true,
    studentAuthorized: true,
  },
  {
    id: 'calendar',
    path: routePaths.CALENDAR,
    component: Calendar,
    title: 'Calendar',
    teacherAuthorized: true,
    studentAuthorized: true,
  },
  {
    id: 'profile',
    path: routePaths.PROFILE,
    component: Profile,
    title: 'Profile',
    teacherAuthorized: true,
    studentAuthorized: false,
  },
  {
    id: 'resources-manager',
    path: routePaths.RESOURCES_MANAGER,
    component: ResourcesManager,
    title: 'ResourcesManager',
    teacherAuthorized: true,
    studentAuthorized: false,
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
  {
    id: 'not-found',
    path: routePaths.NOT_FOUND,
    component: NotFoundPage,
    title: 'Not found',
  },
];
