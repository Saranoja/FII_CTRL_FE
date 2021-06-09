import * as R from 'ramda';
import * as moment from 'moment';
import { timeFormat } from 'utils';

const compareAnnouncementsDates = (announcement1, announcement2) =>
  new Date(announcement2.created_at) - new Date(announcement1.created_at);

export const transformAnnouncementsPayloadData = (payload) => {
  const transformedPayload = [];
  payload = R.sort(compareAnnouncementsDates, payload);
  R.forEach((announcement) => {
    const updatedDate = {
      ...announcement,
      created_at: String(
        moment(new Date(announcement.created_at)).format(timeFormat)
      ),
    };
    transformedPayload.push(updatedDate);
  }, payload);
  return transformedPayload;
};
