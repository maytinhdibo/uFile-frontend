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
          {!this.props.isFolder ? (
            <div>
              <div className="item">Open</div>
              <div onClick={this.props.onRename} className="item">
                Rename
              </div>
              <div className="item">Cut</div>
              <div className="item">Copy</div>
              <div className="item">Paste</div>
              <div className="item">Move to trash</div>
              <div onClick={this.props.getInfo} className="item">Get info</div>
            </div>
          ) : (
            <div>
              <div onClick={this.props.onNewFolder} className="item">New folder</div>
              <div className="item">Paste</div>
              <div onClick={this.props.getInfo} className="item">Get info</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ContextMenu;
