import { openLinkInNewTab } from 'utils';
import { webmailUrl, scheduleBase } from 'utils/externalLinks';

import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MailIcon from '@material-ui/icons/Mail';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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
  },
  {
    index: 1,
    label: 'Manage your groups',
    icon: GroupIcon,
    action: (history) => {
      console.log('manage groups click');
    },
    teachingRequired: true,
    studentRequired: false,
  },
  {
    index: 2,
    label: 'Check your calendar',
    icon: CalendarTodayIcon,
    action: (history) => {
      console.log('calendar click');
    },
    teachingRequired: false,
    studentRequired: false,
  },
  {
    index: 3,
    label: 'Check Webmail',
    icon: MailIcon,
    action: (history) => {
      openLinkInNewTab(webmailUrl);
    },
    teachingRequired: false,
    studentRequired: false,
  },
  {
    index: 4,
    label: 'Check your schedule',
    icon: ScheduleIcon,
    action: (history) => {
      openLinkInNewTab(
        `${scheduleBase}${currentUserYear}${currentUserGroup}.html`
      );
    },
    teachingRequired: false,
    studentRequired: true,
  },
  {
    index: 5,
    label: 'Find your teachers',
    icon: SupervisorAccountIcon,
    action: (history) => {
      console.log('teachers click');
    },
    teachingRequired: false,
    studentRequired: true,
  },
  {
    index: 6,
    label: 'Contact faculty staff',
    icon: AccountBoxIcon,
    action: (history) => {
      console.log('contact click');
    },
    teachingRequired: false,
    studentRequired: true,
  },
];
