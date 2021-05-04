import routePaths from './routePaths';
import { ErrorPage } from 'components';
import Dashboard from 'modules/dashboard';
import Login from '../modules/login';
import Resources from 'modules/resources';
// import Announcements from '../modules/announcements';
// import Courses from '../modules/courses';
// import Assignments from '../modules/assignments';
// import Meetings from '../modules/meetings';
// import Groups from '../modules/groups';
// import Notes from '../modules/notes';
// import PersonalPage from '../modules/personalPage';

export const privateRoutes = [
	{
		id: 'dashboard',
		path: routePaths.DASHBOARD,
		component: Dashboard,
		title: 'Dashboard',
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
		id: 'root',
		path: routePaths.ROOT,
		component: Login,
		title: 'Login',
	},
	{
		id: 'resources',
		path: routePaths.RESOURCES,
		component: Resources,
		title: 'Resources',
	},
	// {
	//     id: 'announcements',
	//     path: routePaths.ANNOUNCEMENTS,
	//     component: Announcements,
	//     title: 'Announcements',
	// },
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
	{
		id: 'error',
		path: routePaths.ERROR,
		component: ErrorPage,
		title: 'Error',
	},
];
