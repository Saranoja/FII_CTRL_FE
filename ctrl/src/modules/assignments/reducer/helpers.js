import * as R from 'ramda';

const compareDates = (assignment1, assignment2) =>
  new Date(assignment2.created_at) - new Date(assignment1.created_at);

export const transformAssignmentsPayloadData = (payload) => {
  const transformedPayload = [];
  payload = R.sort(compareDates, payload);
  R.forEach((assignment) => {
    const updatedDate = {
      ...assignment,
      created_at: assignment.created_at.slice(0, -7),
      deadline: assignment.deadline.slice(0, -7),
    };
    transformedPayload.push(updatedDate);
  }, payload);

  const groupBySubject = R.groupBy((assignment) => assignment.subject);
  return groupBySubject(transformedPayload);
};
