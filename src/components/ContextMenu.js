/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import '../styles/loader.scss';

class ContextMenu extends React.Component {
  isTrash = () => {
    return this.props.isTrash;
  };
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
              {this.isTrash() ? (
                <div>
                  <div className="item">Put back</div>
                  <div className="item">Get info</div>
                </div>
              ) : (
                <div>
                  <div className="item">Open</div>
                  <div onClick={this.props.onRename} className="item">
                    Rename
                  </div>
                  <div className="item">Cut</div>
                  <div className="item">Copy</div>
                  <div className="item">Paste</div>
                  <div className="item">Download</div>
                  <div onClick={this.props.onShare} className="item">
                    Share or get link
                  </div>
                  <div className="item">Move to trash</div>
                  <div onClick={this.props.getInfo} className="item">
                    Get info
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {this.isTrash() ? (
                <div className="item">Empty trash</div>
              ) : (
                <div>
                  <div onClick={this.props.onNewFolder} className="item">
                    New folder
                  </div>
                  <div className="item">Paste</div>
                  <div className="item">Share this folder</div>
                  <div onClick={this.props.getInfo} className="item">
                    Get info
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ContextMenu;
