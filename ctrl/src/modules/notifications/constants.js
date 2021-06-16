export const NOTIFICATION_TYPES = {
  error: 'error',
  success: 'success',
  info: 'info',
};

export const EVENT_TYPES = {
  post: 'post',
  patch: 'patch',
  delete: 'delete',
};

export const DOMAINS = {
  ASSIGNMENTS: 'assignments',
  ANNOUNCEMENTS: 'announcements',
  GROUPS: 'groups',
  MEETINGS: 'meetings',
  PROFILE: 'profile',
  BIBLIOGRAPHY: 'bibliography',
};

export const generics = {
  postMessageGeneric: {
    [DOMAINS.ANNOUNCEMENTS]: {
      error: 'Error when posting a new announcement in ',
      success: 'Successfully posted a new announcement in ',
      info: 'posted a new announcement in',
    },
    [DOMAINS.ASSIGNMENTS]: {
      error: 'Error when posting a new assignment in ',
      success: 'Successfully posted a new assignment in ',
      info: 'posted a new assignment in',
    },
    [DOMAINS.GROUPS]: {
      error: 'Error when creating a new group',
      success: 'Successfully created new group',
      info: 'added you to',
    },
    [DOMAINS.MEETINGS]: {
      error: 'Error when posting a new meeting for',
      success: 'Successfully created new meeting for',
      info: 'added you to a meeting for',
    },
    [DOMAINS.BIBLIOGRAPHY]: {
      error: 'Error when posting a new resource.',
      success: 'Successfully posted a new resource.',
    },
  },
  deleteMessageGeneric: {
    [DOMAINS.ANNOUNCEMENTS]: {
      error: 'Error deleting announcement in ',
      success: 'Successfully deleted announcement in ',
      info: 'deleted an announcement in',
    },
    [DOMAINS.ASSIGNMENTS]: {
      error: 'Error deleting assignment in ',
      success: 'Successfully deleted assignment in ',
      info: 'deleted an assignment in',
    },
    [DOMAINS.GROUPS]: {
      error: 'Error deleting group ',
      success: 'Successfully deleted group ',
      info: 'deleted the group',
    },
    [DOMAINS.MEETINGS]: {
      error: 'Error when deleting meeting for',
      success: 'Successfully deleted meeting of',
      info: 'deleted a meeting of',
    },
  },
  patchMessageGeneric: {
    [DOMAINS.ANNOUNCEMENTS]: {
      error: 'Error updating announcement in ',
      success: 'Successfully updated announcement in ',
      info: 'updated an announcement in',
    },
    [DOMAINS.ASSIGNMENTS]: {
      error: 'Error updating assignment in ',
      success: 'Successfully updated assignment in ',
      info: 'updated an assignment in',
    },
    [DOMAINS.GROUPS]: {
      error: 'Error updating info for group ',
      success: 'Successfully updated info for group ',
      info: 'updated info for the group',
    },
    [DOMAINS.MEETINGS]: {
      error: 'Error when updating the meeting info for',
      success: 'Successfully updated meeting data for',
      info: 'updated the deetails of a meeting for',
    },
    [DOMAINS.PROFILE]: {
      error: 'Error when updating profile.',
      success: 'Successfully updated profile.',
    },
  },
};

export const eventToMessageMap = {
  [EVENT_TYPES.post]: generics.postMessageGeneric,
  [EVENT_TYPES.delete]: generics.deleteMessageGeneric,
  [EVENT_TYPES.patch]: generics.patchMessageGeneric,
};

export const noNotificationsGeneric = 'No new notifications';
