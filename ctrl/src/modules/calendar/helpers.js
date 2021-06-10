import * as R from 'ramda';

const EVENT_TYPES = {
  MEETING: 'meeting',
  ASSIGNMENT: 'assignment',
};

const availableRecurrenceIntervals = ['1 day', '7 days'];

export const transformEventsArray = (eventsArray, theme) => {
  const transformedArray = [];
  R.forEach((event) => {
    let eventDetails = {};
    if (
      event.recurrent &&
      R.includes(event.recurrence_interval, availableRecurrenceIntervals)
    )
      eventDetails = {
        title: event.title,
        color:
          event.type === EVENT_TYPES.ASSIGNMENT
            ? theme.palette.info.main
            : theme.palette.secondary.dark,
        date: new Date(event.timestamp),
        daysOfWeek:
          event.recurrence_interval === '1 day'
            ? ['1', '2', '3', '4', '5']
            : [String(new Date(event.timestamp).getDay())],
        startTime: new Date(event.timestamp).toLocaleTimeString('ro-RO'),
        url: event.url,
      };
    else {
      eventDetails = {
        title: event.title,
        color:
          event.type === EVENT_TYPES.ASSIGNMENT
            ? theme.palette.info.main
            : theme.palette.secondary.dark,
        date: new Date(event.timestamp),
        url: event.url,
      };
    }
    transformedArray.push(eventDetails);
  }, eventsArray);
  return transformedArray;
};
