import images from '../../assets/images/cards';

export const studentCardsInfo = [
  {
    id: 1,
    image: images.resources,
    title: 'Additional resources',
    description: 'Get resources for your courses',
    route: '/resources',
  },
  {
    id: 2,
    image: images.group,
    title: 'Group',
    description: "Your group's channels",
    route: '/group',
  },
  {
    id: 3,
    image: images.team,
    title: 'Meetings',
    description: 'Check your meetings calendar',
    route: '/meetings',
  },
  {
    id: 4,
    image: images.courses,
    title: 'Courses',
    description: 'Find courses pages and lecture notes',
    route: '/courses',
  },
  {
    id: 5,
    image: images.announcements,
    title: 'Announcements',
    description: 'See the latest official announcements',
    route: '/announcements',
  },
  {
    id: 6,
    image: images.assignments,
    title: 'Assignments',
    description: 'Check your due assignments',
    route: '/assignments',
  },
];

export const teacherCardsInfo = [
  {
    id: 1,
    image: images.postResources,
    title: 'Courses',
    description: 'Post resources for your courses',
    route: '/courses',
  },
  {
    id: 2,
    image: images.postAnnouncement,
    title: 'Announcements',
    description: 'Post an announcement to one of your groups',
    route: '/announcements',
  },

  {
    id: 3,
    image: images.personalInfo,
    title: 'Your page',
    description: 'See and edit your page',
    route: '/personal',
  },
  {
    id: 4,
    image: images.meetings,
    title: 'Meetings',
    description: 'Post or edit a meeting',
    route: '/meetings',
  },
  {
    id: 5,
    image: images.postAssignment,
    title: 'Assignments',
    description: 'Post or edit an assignment',
    route: '/assignments',
  },
  {
    id: 6,
    image: images.notes,
    title: 'Notes',
    description: 'Write some notes down',
    route: '/notes',
  },
];
