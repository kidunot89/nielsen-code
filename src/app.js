// app.js
/**
 * External dependencies
 */
import React, { useState, useRef } from 'react';
import { get } from 'lodash';

/**
 * Local dependencies
 */
import BarGraph from './bar-graph';
import parseCSV from './parse-csv';
import { Loading, ErrMsg, Wrapper } from './styled';

/**
 * App Component
 * Reads and graphs csv files.
 * 
 * @returns { React.Component }
 */
const App = () => {
  // Selected file
  const file = useRef(null);
  // Parsed CSV data
  const [data, setData] = useState(null);
  // Error message
  const [errMsg, setErrorMsg] = useState(null);
  // loading toggle
  const [loading, setLoading] = useState(false);


  /**
   * onSubmit event handler
   * Loads, reads, and parses file. Set loading state/message and error message when necessary.
   */
  const onSubmit = (event) => {
    event.preventDefault();
    
    // set loading dialog
    setLoading('Loading file');
    const selectedFile = get(file, 'current.files[0]');

    // set error message state accordingly
    if (!selectedFile) {
      setErrorMsg('Please choose a file to be .CSV file to be read');
      setLoading(false);
    } else {
      setErrorMsg(null);

      // read file
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        // set loading dialog
        setLoading('Parsing file');
        // parse file  
        const data = parseCSV(fileReader.result);
        // set error message state accordingly
        if (data.length === 0) {
          setErrorMsg('Sorry, there was a problem parsing the CSV file.');
        } else {
          setErrorMsg(null);
        }
        // set data state
        setData(data);

        // hide loading dialogue
        setLoading(false);
      }

      // set loading dialog
      setLoading('Reading file');
      fileReader.readAsText(selectedFile);
    }
  }

  return (
    <Wrapper className="App">
      <h1>CSV Bar Graph Mapper</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="file">CSV File</label>
        <input type="file" ref={file} accept=".csv" />
        <ErrMsg pose={errMsg ? 'enter' : 'exit'}>{errMsg}</ErrMsg>
        <button type="submit">Update Graph</button>
      </form>
      <BarGraph data={data} />
      <Loading className="loading" pose={loading ? 'enter' : 'exit'}>{loading}</Loading>
    </Wrapper>
  );
};

export default App;
