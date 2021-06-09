import * as R from 'ramda';
import * as moment from 'moment';
import { timeFormat } from 'utils';

const compareDates = (meeting1, meeting2) =>
  new Date(meeting1.next_occurrence) - new Date(meeting2.next_occurrence);

export const transformMeetingsPayloadData = (payload) => {
  const transformedPayload = [];
  payload = R.sort(compareDates, payload);
  R.forEach((meeting) => {
    const updatedDate = {
      ...meeting,
      next_occurrence: String(
        moment(new Date(meeting.next_occurrence)).format(timeFormat)
      ),
    };
    transformedPayload.push(updatedDate);
  }, payload);
  return transformedPayload;
};
