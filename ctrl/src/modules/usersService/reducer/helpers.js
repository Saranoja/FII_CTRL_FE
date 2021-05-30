import * as R from 'ramda';

export const transformPayloadData = (payload) => {
  const sortByLastName = R.sortBy(R.prop('last_name'));
  return sortByLastName(payload);
};
