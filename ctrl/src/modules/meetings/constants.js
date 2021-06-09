export const recurrenceIntervals = [
  {
    key: 1,
    value: '1 day',
    text: 'Daily',
  },
  {
    key: 7,
    value: '1 week',
    text: 'Weekly',
  },
  {
    key: 14,
    value: '2 weeks',
    text: 'Every 2 weeks',
  },
  {
    key: 30,
    value: '1 month',
    text: 'Monthly',
  },
];

export const recurrenceToTimeMap = {
  '1 day': 'Daily',
  '7 days': 'Weekly',
  '14 days': 'Every 2 weeks',
  '30 days': 'Monthly',
};

export const intervalsMap = {
  '1 day': '1 day',
  '7 days': '1 week',
  '14 days': '2 weeks',
  '30 days': '1 month',
};
