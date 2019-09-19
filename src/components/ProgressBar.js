/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import '../styles/loader.scss';

class ProgressBar extends React.Component {
  render() {
    let { color, value, style } = this.props;
    return (
      <div style={style} className="me-progress-bar">
        <div
          style={{
            backgroundColor: color,
            width: `${value * 100}%`
          }}
          className="me-progress-percent"
        />
      </div>
    );
  }
}

export default ProgressBar;
