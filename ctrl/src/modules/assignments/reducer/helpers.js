import * as R from 'ramda';
import * as moment from 'moment';
import { timeFormat } from 'utils';

const compareDates = (assignment1, assignment2) =>
  new Date(assignment2.created_at) - new Date(assignment1.created_at);

export const transformAssignmentsPayloadData = (payload) => {
  const transformedPayload = [];
  payload = R.sort(compareDates, payload);
  R.forEach((assignment) => {
    const updatedDate = {
      ...assignment,
      created_at: String(
        moment(new Date(assignment.created_at)).format(timeFormat)
      ),
      deadline: String(
        moment(new Date(assignment.deadline)).format(timeFormat)
      ),
    };
    transformedPayload.push(updatedDate);
  }, payload);

  const groupBySubject = R.groupBy((assignment) => assignment.subject);
  return groupBySubject(transformedPayload);
};

export const extractSubjectsFromPayloadData = (payload) => {
  const subjects = {};
  R.forEach((assignment) => {
    subjects[assignment.subject] = assignment.subject_id;
  }, payload);

  return subjects;
};
