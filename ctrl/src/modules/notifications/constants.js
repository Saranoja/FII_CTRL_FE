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

export const postMessageGeneric = {
  error: 'Error when posting a new announcement in ',
  success: 'Successfully posted a new announcement in ',
  info: 'posted a new announcement in',
};

export const deleteMessageGeneric = {
  error: 'Error deleting announcement in ',
  success: 'Successfully deleted announcement in ',
  info: 'deleted an announcement in',
};

export const patchMessageGeneric = {
  error: 'Error updating announcement in ',
  success: 'Successfully updated announcement in ',
  info: 'updated an announcement in',
};

export const eventToMessageMap = {
  [EVENT_TYPES.post]: postMessageGeneric,
  [EVENT_TYPES.delete]: deleteMessageGeneric,
  [EVENT_TYPES.patch]: patchMessageGeneric,
};

export const noNotificationsGeneric = 'No new notifications';
