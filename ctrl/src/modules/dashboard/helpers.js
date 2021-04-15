import images from '../../assets/images/cards';

export const studentCardsInfo = [
    {
        id: 1,
        first: {
            image: images.resources,
            title: 'Additional resources',
            description: 'Get resources for your courses',
            route: '/resources',
        },
        second: {
            image: images.group,
            title: 'Group',
            description: "Your group's channels",
            route: '/group'
        }
    },
    {
        id: 2,
        first: {
            image: images.team,
            title: 'Meetings',
            description: 'Check your meetings calendar',
            route: '/meetings'
        },
        second: {
            image: images.courses,
            title: 'Courses',
            description: "Find courses pages and lecture notes",
            route: '/courses'
        }
    },
    {
        id: 3,
        first: {
            image: images.announcements,
            title: 'Announcements',
            description: 'See the latest official announcements',
            route: '/announcements'
        },
        second: {
            image: images.assignments,
            title: 'Assignments',
            description: "Check your due assignments",
            route: '/assignments'
        }
    },
];

export const teacherCardsInfo = [
    {
        id: 1,
        first: {
            image: images.postResources,
            title: 'Courses',
            description: 'Post resources for your courses',
            route: '/courses',
        },
        second: {
            image: images.postAnnouncement,
            title: 'Announcements',
            description: "Post an announcement to one of your groups",
            route: '/announcements'
        }
    },
    {
        id: 2,
        first: {
            image: images.personalInfo,
            title: 'Your page',
            description: 'See and edit your page',
            route: '/personal',
        },
        second: {
            image: images.meetings,
            title: 'Meetings',
            description: "Post or edit a meeting",
            route: '/meetings'
        }
    },
    {
        id: 3,
        first: {
            image: images.postAssignment,
            title: 'Assignments',
            description: 'Post or edit an assignment',
            route: '/assignments',
        },
        second: {
            image: images.notes,
            title: 'Notes',
            description: "Write some notes down",
            route: '/notes'
        }
    },
];