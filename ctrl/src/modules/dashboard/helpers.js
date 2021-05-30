import images from 'assets/images/cards';
import routePaths from 'routes/routePaths';

export const studentCardsInfo = [
  {
    id: 1,
    image: images.announcements,
    title: 'Announcements',
    description: 'See the latest official announcements',
    route: routePaths.ANNOUNCEMENTS,
  },
  {
    id: 2,
    image: images.team,
    title: 'Meetings',
    description: 'Check your meetings calendar',
    route: routePaths.MEETINGS,
  },
  {
    id: 3,
    image: images.resources,
    title: 'Additional resources',
    description: 'Get resources for your courses',
    route: routePaths.RESOURCES,
  },
  {
    id: 4,
    image: images.group,
    title: 'Group',
    description: "Your group's channels",
    route: routePaths.CHANNEL,
  },
  {
    id: 5,
    image: images.courses,
    title: 'Courses',
    description: 'Find courses pages and lecture notes',
    route: routePaths.COURSES,
  },
  {
    id: 6,
    image: images.assignments,
    title: 'Assignments',
    description: 'Check your due assignments',
    route: routePaths.ASSIGNMENTS,
  },
];

export const teacherCardsInfo = [
  {
    id: 1,
    image: images.postResources,
    title: 'Courses',
    description: 'Post resources for your courses',
    route: routePaths.COURSES,
  },
  {
    id: 2,
    image: images.postAnnouncement,
    title: 'Announcements',
    description: 'Post an announcement to one of your groups',
    route: routePaths.ANNOUNCEMENTS,
  },

  {
    id: 3,
    image: images.personalInfo,
    title: 'Your page',
    description: 'See and edit your page',
    route: routePaths.PROFILE,
  },
  {
    id: 4,
    image: images.meetings,
    title: 'Meetings',
    description: 'Post or edit a meeting',
    route: routePaths.MEETINGS,
  },
  {
    id: 5,
    image: images.postAssignment,
    title: 'Assignments',
    description: 'Post or edit an assignment',
    route: routePaths.ASSIGNMENTS,
  },
  {
    id: 6,
    image: images.notes,
    title: 'Notes',
    description: 'Write some notes down',
    route: routePaths.NOTES,
  },
];
