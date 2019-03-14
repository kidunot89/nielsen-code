// colors.js
/**
 * External dependencies
 */
import { each, reduce } from 'lodash';

// Graph colors
const graphColors = [
  'rgba(101, 13, 27, 1)',
  'rgba(130, 50, 0, 1)',
  'rgba(155, 61, 18, 1)',
  'rgba(174, 142, 28, 1)',
  'rgba(193, 223, 31, 1)',
];

/**
 * Simple function for mapping colors to columns
 */
export const getColors = (columns) => {
  let index = 0;
  const colors = {};
  each(columns, (colName) => {
    if (index > colors.length -1) {
      index = 0;
    }
    colors[colName] = graphColors[index];
    index += 1;
  });

  return colors;
}

/**
 * Simple function for calculating max value for each property
 */
export const getMax = (rows, columns) => reduce(rows, (result, next) => {
  each(columns, colName => {
    result[colName] = (result[colName] && result[colName] > next[colName])
    ? result[colName]
    : next[colName];
  });

  return result;
}, {});