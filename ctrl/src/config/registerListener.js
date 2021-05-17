import * as R from 'ramda';

const EVENT_LISTENERS = {};

export const registerListener = (event, handler, message) => {
  if (!R.is(String, event) || !R.is(Function, handler)) {
    throw new Error('Event name must be string. Handler must be a function.');
  }
  console.log(`Registering handler for event: ${event}`);
  EVENT_LISTENERS[event] = handler;
};

export const unregisterListener = (event) => {
  console.log(`Removed listener for event: ${event}`);
  delete EVENT_LISTENERS[event];
};

export const triggerEvent = (event, data, message) => {
  if (!R.is(String, event)) {
    throw new Error('Event name must be string');
  }

  console.log(`Event ${event} has been triggered.`);
  if (event in EVENT_LISTENERS) EVENT_LISTENERS[event](data);
};
