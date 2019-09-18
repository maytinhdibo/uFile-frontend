import React from 'react';
import './../styles/loader.scss';

class Loader extends React.Component {
    render() {
        var { color, size } = this.props;
        return (
            <div style={{ transform: "scale(" + size / 112 + ")" }} className="me-loader">
                <div style={{ borderColor: color }} className="box1"></div>
                <div style={{ borderColor: color }} className="box2"></div>
                <div style={{ borderColor: color }} className="box3"></div>
            </div>
        )
    }
}

export default Loader;