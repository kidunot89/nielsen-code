// styled.js
/**
 * External dependencies
 */
import posed from 'react-pose';
import styled from 'styled-components';

/**
 * Provides transition states for loading dialogue
 */
export const Loading = posed.span({
  enter: {
    applyAtStart: { display: 'block' },
    opacity: 1,
    x: '-50%',
    y: '-50%',
    transition: {
      x: {
        type: 'keyframes',
        values: ['-150%', '-50%'],
        duration: 600,
      }
    }
  },
  exit: {
    applyAtEnd: { display: 'none' },
    opacity: 0,
    x: '100%',
    y: '-50%',
    transition: {
      x: {
        type: 'keyframes',
        values: ['-50%', '100%'],
        duration: 500,
      }
    }
  },
  initialPose: 'exit',
})

/**
 * Provides transition states for error message
 */
export const ErrMsg = posed.p({
  enter: { scale: 1 },
  exit: { scale: 0 },
  initialPose: 'exit',
});

/**
 * Provides styling for the app's wrapping div element and form element. 
 */
export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 646px;
  text-align: center;

  form {
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    label {
      padding: 1em 1em;
    }
    input {
      margin: 1em 1em 1em auto;
      flex-basis: 45%;
    }
    p {
      color: #a94442;
      margin-top: -0.5em;
      flex-basis: 100%;
      font-size: 85%;
    }
    button {
      padding: 1em;
      margin-top: 1em;
      font-size: 125%;
      font-weight: 600;
      background-color: #595959;
      color: #f4f4f4;
      border: none;
      flex-basis: 100%;
    }
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    width: 100%;
    max-width: 400px;
    height: 100px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d9edf7;
    color: #31708f;
  }

  .key-column {
    text-align: left;
    select{ margin: 1em 0 1em 1em; }
  }
`;


/**
 * styled bar graph wrapping div element
 */
export const BarGraph = styled.div`
  width: 100%;
  max-width: 646px;
  height: 500px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  padding-top: 2em;

  .row {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;

    .bars {
      height: 100%;
      margin: 0 1em;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
      .bar {
        width: 45px;

        .text {
          margin-top: -1.5em;
        }
      }
    }

    .row-text { margin: 0.5 auto; }
  }
`;