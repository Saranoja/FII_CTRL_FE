import * as R from 'ramda';

export const transformAnnouncementsPayloadData = (payload) => {
  const transformedPayload = [];
  R.forEach((announcement) => {
    const updatedDate = {
      ...announcement,
      created_at: announcement.created_at.replace(' GMT', '').slice(0, -3),
    };
    transformedPayload.push(updatedDate);
  }, payload);
  return transformedPayload;
};
