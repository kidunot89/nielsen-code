// parse-csv.js
/**
 * External dependencies
 */
import { isEqual } from 'lodash';

/**
 * Modified version of Ben Nadel's CSVToArray function
 * @link https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
 * 
 * @param {string} strData - raw file string
 * @param {string} strDelimiter - csv file string delimiter
 * 
 * @return {array}
 */
export default (strData, strDelimiter) => {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");

  // Create a regular expression to parse the CSV values.
  const objPattern = new RegExp(
    (
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
  );


  // Create an array to hold our data. Give the array
  // a default empty first row.
  const arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups and process the first line.
  let arrMatches;


  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  // eslint-disable-next-line no-cond-assign
  while (arrMatches = objPattern.exec( strData )) {

      // Get the delimiter that was found.
      const strMatchedDelimiter = arrMatches[1];

      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (
        strMatchedDelimiter.length &&
        strMatchedDelimiter !== strDelimiter
        ){

        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push([]);

      }

      let strMatchedValue;

      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]){
        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        strMatchedValue = arrMatches[2].replace(
          new RegExp( "\"\"", "g" ),
          "\""
        );
      } else if (!isNaN(arrMatches[3])) {
        strMatchedValue = parseInt(arrMatches[3], 10);
      } else {
        // We found a non-quoted value.
        strMatchedValue = arrMatches[3];
      }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  if (isEqual(arrData[arrData.length - 1], [NaN], [''])) {
    arrData.splice(-1);
  }
  return( arrData );
};