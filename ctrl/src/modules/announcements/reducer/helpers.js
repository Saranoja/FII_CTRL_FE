import * as R from 'ramda';

const compareAnnouncementsDates = (announcement1, announcement2) =>
  new Date(announcement2.created_at) - new Date(announcement1.created_at);

export const transformAnnouncementsPayloadData = (payload) => {
  const transformedPayload = [];
  payload = R.sort(compareAnnouncementsDates, payload);
  R.forEach((announcement) => {
    const updatedDate = {
      ...announcement,
      created_at: announcement.created_at.slice(0, -7),
    };
    transformedPayload.push(updatedDate);
  }, payload);
  return transformedPayload;
};
