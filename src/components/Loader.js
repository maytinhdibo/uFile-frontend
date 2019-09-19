/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import '../styles/loader.scss';

class Loader extends React.Component {
  render() {
    let { color, size } = this.props;
    return (
      <div style={{ transform: `scale(${size / 112})` }} className="me-loader">
        <div style={{ borderColor: color }} className="box1" />
        <div style={{ borderColor: color }} className="box2" />
        <div style={{ borderColor: color }} className="box3" />
      </div>
    );
  }
}

export default Loader;
