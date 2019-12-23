/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import '../styles/loader.scss';
import { alertText } from './common/Alert';

import fileServices from './../services/files';
import { BASE_API_URL } from 'services/requests';

class ContextMenu extends React.Component {
  isTrash = () => {
    return this.props.isTrash;
  };
  isBlockFolder() {
    return this.props.isFolder && (this.props.isPhoto || this.props.isFav || this.props.isShared);
  }
  download = () => {
    window.open(BASE_API_URL + 'download/' + this.props.selectedEntry[0].id);
  };
  moveToTrash = async () => {
    const list = this.props.selectedEntry.map(item => {
      return item.id;
    });
    await fileServices.moveToTrash({
      file_ids: list,
    });
    setTimeout(() => {
      this.props.reloadFolder();
    }, 1000);
  };

  putBack = async () => {
    const list = this.props.selectedEntry.map(item => {
      return item.id;
    });
    await fileServices.putback({
      file_ids: list,
    });
    setTimeout(() => {
      this.props.reloadFolder();
    }, 1000);
  };

  starAction = async () => {
    if (!this.props.selectedEntry[0].stared) {
      await fileServices.star({
        file_id: this.props.selectedEntry[0].id,
      });
    } else {
      await fileServices.r_star({
        file_id: this.props.selectedEntry[0].id,
      });
    }
    this.props.reloadFolder();
  };
  render() {
    const aloneEntry = this.props.selectedEntry[0];
    const { position } = this.props;
    return (
      <div
        onClick={this.props.closeContextMenu}
        style={{
          display: this.props.opened && !this.isBlockFolder() ? 'block' : 'none',
        }}
        className="me-context-menu-overlay"
      >
        <div
          className="me-context-menu"
          style={{
            top: position.y / window.innerHeight < 0.5 ? position.y : 'auto',
            bottom:
              position.y / window.innerHeight >= 0.5
                ? 'calc(' + window.innerHeight + 'px - ' + position.y + 'px)'
                : 'auto',

            left: position.x,
          }}
        >
          {!this.props.isFolder ? (
            <div>
              {this.isTrash() ? (
                <div>
                  <div onClick={this.putBack} className="item">
                    Put back
                  </div>
                  <div className="item">Get info</div>
                </div>
              ) : (
                <div>
                  {this.props.selectedEntry.length == 1 ? (
                    <div>
                      {/* <div className="item">Open</div> */}
                      <div onClick={this.props.onRename} className="item">
                        Rename
                      </div>
                      <div onClick={this.starAction} className="item">
                        {this.props.selectedEntry[0].stared ? 'Remove from' : 'Add to'} favorites
                      </div>
                    </div>
                  ) : null}
                  <div onClick={this.props.onCut} className="item">
                    Cut
                  </div>
                  <div onClick={this.props.onCopy} className="item">
                    Copy
                  </div>
                  <div className="item">Paste</div>
                  {this.props.selectedEntry.length == 1 && this.props.selectedEntry[0].file_type != 'folder' ? (
                    <div onClick={this.download} className="item">
                      Download
                    </div>
                  ) : null}
                  {this.props.selectedEntry.length == 1 ? (
                    <div onClick={this.props.onShare} className="item">
                      Share or get link
                    </div>
                  ) : null}
                  <div onClick={this.moveToTrash} className="item">
                    Move to trash
                  </div>
                  {this.props.selectedEntry.length == 1 ? (
                    <div onClick={this.props.getInfo} className="item">
                      Get info
                    </div>
                  ) : null}
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
                  {this.props.clipboard && this.props.clipboard.data.length > 0 ? (
                    <div onClick={this.props.onPaste} className="item">
                      Paste
                    </div>
                  ) : null}
                  {/* <div className="item">Share this folder</div> */}
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
