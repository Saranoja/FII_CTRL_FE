import * as R from 'ramda';
import { AMAZON_SEARCH_URL } from './constants';

export const coursesList = [
  {
    text: 'Computer Networks',
    key: 'cn',
    value: 'cn',
  },
  {
    text: 'Graph Algorithms',
    key: 'ga',
    value: 'ga',
  },
  {
    text: 'Data structures',
    key: 'sd',
    value: 'sd',
  },
  {
    text: 'Information Security',
    key: 'is',
    value: 'is',
  },
  {
    text: 'Computer Architecture and Operating Systems',
    key: 'acso',
    value: 'acso',
  },
  {
    text: 'Introduction to Cryptography',
    key: 'ic',
    value: 'ic',
  },
  {
    text: 'Operating Systems',
    key: 'so',
    value: 'so',
  },
  {
    text: 'Algorithm Design',
    key: 'pa',
    value: 'pa',
  },
];

export const formatRecommendations = (recommendationsJson) => {
  const sortByScore = R.sortBy(R.prop(0));
  sortByScore(recommendationsJson);
  const keys = R.keys(recommendationsJson);
  const formattedRecommendations = [];

  keys.forEach((key) => {
    const formattedPages = [];
    let maxScore = 0;

    for (const entry of Object.entries(recommendationsJson[key])) {
      if (entry[1] > maxScore) maxScore = entry[1];
      formattedPages.push(entry);
    }

    formattedPages.forEach((tuple) => (tuple[1] = (tuple[1] / maxScore) * 5));

    const reference = {
      title: key.split('by')[0],
      author: key.split('by')[1],
      pages: formattedPages,
      link: `${AMAZON_SEARCH_URL}${key}`,
    };
    formattedRecommendations.push(reference);
  });
  return formattedRecommendations;
};

export const transformKeywordsList = (keywordsList) => {
  let keywordsJson = {};
  let keywordsCount = keywordsList.length;
  const ratio = 10 / keywordsCount;
  keywordsList.forEach((keyword) => {
    keywordsJson[keyword] = ratio * keywordsCount;
    keywordsCount += 1;
  });
  return keywordsJson;
};
