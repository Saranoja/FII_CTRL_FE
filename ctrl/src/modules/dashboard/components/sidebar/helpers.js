import { openLinkInNewTab } from 'utils';
import { webmailUrl, scheduleBase } from 'utils/externalLinks';

import GroupIcon from '@material-ui/icons/Group';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MailIcon from '@material-ui/icons/Mail';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import userManager from 'modules/userManager';

const currentUserGroup = userManager.getGroup();
const currentUserYear = userManager.getYear();

export const sidebarMenuItems = [
  {
    index: 0,
    label: 'Manage your groups',
    icon: GroupIcon,
    action: () => {
      console.log('manage groups click');
    },
    teachingRequired: true,
  },
  {
    index: 1,
    label: 'Check your calendar',
    icon: CalendarTodayIcon,
    action: () => {
      console.log('calendar click');
    },
    teachingRequired: false,
  },
  {
    index: 2,
    label: 'Check Webmail',
    icon: MailIcon,
    action: () => {
      openLinkInNewTab(webmailUrl);
    },
    teachingRequired: false,
  },
  {
    index: 3,
    label: 'Check your schedule',
    icon: ScheduleIcon,
    action: () => {
      openLinkInNewTab(
        `${scheduleBase}${currentUserYear}${currentUserGroup}.html`
      );
    },
    teachingRequired: false,
  },
  {
    index: 4,
    label: 'Contact faculty staff',
    icon: AccountBoxIcon,
    action: () => {
      console.log('contact click');
    },
    teachingRequired: false,
  },
];
