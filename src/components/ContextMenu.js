/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import '../styles/loader.scss';

class ContextMenu extends React.Component {
  render() {
    const { position } = this.props;
    return (
      <div
        onClick={this.props.closeContextMenu}
        style={{
          display: this.props.opened ? 'block' : 'none',
        }}
        className="me-context-menu-overlay"
      >
        <div
          className="me-context-menu"
          style={{
            top: position.y,
            left: position.x,
          }}
        >
          <div className="item">Open</div>
          <div className="item">Rename</div>
          <div className="item">Cut</div>
          <div className="item">Copy</div>
          <div className="item">Paste</div>
          <div className="item">Move to trash</div>
          <div className="item">Get info</div>
        </div>
      </div>
    );
  }
}

export default ContextMenu;
