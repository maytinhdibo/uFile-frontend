import React from 'react';
import bytes from 'bytes';
import { iconParse } from './../helpers/iconParse';
import moment from 'moment';

class FileBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  openEntry = () => {
    this.props.onOpen(this.props.data);
  };

  dbClickEntry = () => {
    if (this.props.isTrash) return;
    if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) {
      this.openEntry();
    }
  };

  selectEntry = willSelect => {
    if (this.isSelected()) {
      if (willSelect) return 0;
      this.props.selectFile(this.props.data, true);
    } else {
      this.props.selectFile(this.props.data, false);
    }
  };

  contextMenu = e => {
    e.preventDefault();
    this.selectEntry(true);
    e.stopPropagation();
    this.props.openContextMenu({ x: e.clientX, y: e.clientY }, false);
  };

  clickEntry = e => {
    if (('ontouchstart' in window || navigator.msMaxTouchPoints) && !this.props.isTouchSelector) {
      // mobile
      this.openEntry();
    } else {
      // desktop
      this.selectEntry();
    }
    e.preventDefault();
  };

  renderIcon = () => {
    if (this.props.data.isFolder) {
      return {
        backgroundImage: 'url(/img/mime-type/folder.svg)',
      };
    } else if (this.props.data.thumbnail) {
      return {
        backgroundImage: 'url(' + this.props.data.thumbnail + ')',
        backgroundSize: 'cover',
      };
    }
    return {
      backgroundImage: 'url(' + iconParse(this.props.data.name) + ')',
    };
  };

  isSelected = () => {
    return this.props.selectedEntry.some(el => {
      return el.id === this.props.data.id;
    });
  };

  render() {
    const { data } = this.props;
    return (
      <label className="file-block">
        {/* <input id="item-0" type="checkbox" /> */}
        <div
          className={this.isSelected() ? 'file-item selected' : 'file-item'}
          onDoubleClick={this.dbClickEntry}
          onClick={e => this.clickEntry(e)}
          onContextMenu={e => this.contextMenu(e)}
        >
          <div className="name">
            <span style={this.renderIcon()} className="entry-icon" />
            <span className="entry-name">
              <span className="text-line">
                {/* {data.name} */}
                <span className="name">
                  {data.name && (data.name && data.name.split('.').length == 1
                    ? data.name
                    : data.name
                        .split('.')
                        .slice(0, data.name.split('.').length - 1)
                        .join('.'))}
                  {data.name && data.name.split('.').length > 1 ? '.' : null}
                </span>
                <span className="ext">
                  {data.name && data.name.split('.').length > 1 ? data.name.split('.').pop() : ''}
                </span>
              </span>
            </span>
          </div>
          <div className="type">{data.type && data.type.split("/")[0]}</div>
          <div className="date">{data.updated_at.split(' ')[0]}</div>
          <div className="size">{bytes(data.size, { decimalPlaces: 0 })}</div>
        </div>
      </label>
    );
  }
}

export default FileBlock;
