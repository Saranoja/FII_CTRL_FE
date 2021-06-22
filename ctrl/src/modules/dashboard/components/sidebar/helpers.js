import { openLinkInNewTab } from 'utils';
import { webmailUrl, scheduleBase, esimsUrl } from 'utils/externalLinks';

import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MailIcon from '@material-ui/icons/Mail';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import GradeIcon from '@material-ui/icons/Grade';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import userManager from 'modules/userManager';
import routePaths from 'routes/routePaths';

const currentUserGroup = userManager.getGroup();
const currentUserYear = userManager.getYear();

export const sidebarMenuItems = [
  {
    index: 0,
    label: 'Home',
    icon: HomeIcon,
    action: (history) => {
      history.push(routePaths.DASHBOARD);
    },
    teachingRequired: false,
    studentRequired: false,
    adminAllowed: true,
  },
  {
    index: 1,
    label: 'Manage your groups',
    icon: GroupIcon,
    action: (history) => {
      history.push(routePaths.GROUPS_MANAGER);
    },
    teachingRequired: true,
    studentRequired: false,
    adminAllowed: true,
  },
  {
    index: 2,
    label: 'Check your calendar',
    icon: CalendarTodayIcon,
    action: (history) => {
      history.push(routePaths.CALENDAR);
    },
    teachingRequired: false,
    studentRequired: false,
    adminAllowed: false,
  },
  {
    index: 3,
    label: 'Check Webmail',
    icon: MailIcon,
    action: () => {
      openLinkInNewTab(webmailUrl);
    },
    teachingRequired: false,
    studentRequired: false,
    adminAllowed: false,
  },
  {
    index: 4,
    label: 'Check your schedule',
    icon: ScheduleIcon,
    action: () => {
      openLinkInNewTab(
        `${scheduleBase}${currentUserYear}${currentUserGroup}.html`
      );
    },
    teachingRequired: false,
    studentRequired: true,
    adminAllowed: false,
  },
  {
    index: 5,
    label: 'Find your teachers',
    icon: SupervisorAccountIcon,
    action: (history) => {
      history.push(routePaths.TEACHERS_ALL);
    },
    teachingRequired: false,
    studentRequired: true,
    adminAllowed: true,
  },
  {
    index: 6,
    label: 'Check your grades',
    icon: GradeIcon,
    action: () => {
      openLinkInNewTab(esimsUrl);
    },
    teachingRequired: false,
    studentRequired: true,
    adminAllowed: false,
  },
  {
    index: 7,
    label: 'Upload resources',
    icon: LibraryBooksIcon,
    action: (history) => {
      history.push(routePaths.RESOURCES_MANAGER);
    },
    teachingRequired: true,
    studentRequired: false,
    adminAllowed: true,
  },
];
