// bar-graph.js
/**
 * External dependencies
 */
import React, { Fragment, useState } from 'react';
import { map, each, isEmpty } from 'lodash';

/**
 * Local dependencies
 */
import { BarGraph } from './styled';
import { getColors, getMax } from './graph-functions';

/**
 * Renders individual bar in graph
 * 
 * @returns {React.Component}
 */
const Bar = ({ sortBy, data, max, colors }) => (
  <div className="row">
    <div className="bars">
      {map(data, (value, key) =>{
        if (key === sortBy) return null;
        return (
          <div
            key={key}
            className="bar"
            style={{
              height: `${value / max[key] * 100}%`,
              backgroundColor: colors[key],
            }}
          >
            <p className="text">{value}</p>
          </div>
        );
      })}
    </div>
    <h3 className="row-text">{data[sortBy]}</h3>
  </div>
);

 /**
  * BarGraph
  * renders bar graph from value in provided `data` prop
  * 
  * @returns {React.Component}  
  */
const barGraph = ({ data: rawData }) => {
  if (isEmpty(rawData)) return null;

  // Clone data to prevent mutation
  const data = rawData.slice();
  // Get heading row
  const columns = data.splice(0, 1)[0];
  console.log(columns, data);
  
  // Sorting state
  const [sortBy, setSortBy] = useState(columns[0]);

  // Format data
  const rows = map(data, (row) => {
    const formatted = {};
    each(columns, (colName, i) => formatted[colName] = row[i]);
    return formatted;
  });

  // Get max values and graph colors
  const max = getMax(rows, columns);
  const colors = getColors(columns);
  
  return (
    <Fragment>
      <label className="key-column">
        Key Column:
        <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
          {map(columns, value => <option value={value}>{value}</option>)}
        </select>
      </label>
      <BarGraph>
        { map(rows, (row, i) => (
          <Bar
            key={`row-${i+row[sortBy]}`}
            sortBy={sortBy}
            data={row}
            max={max}
            colors={colors} />
        ))}
      </BarGraph>
    </Fragment>
  );
};

export default barGraph;