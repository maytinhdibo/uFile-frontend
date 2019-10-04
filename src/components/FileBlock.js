import React from 'react';
import '../styles/loader.scss';

class FileBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
    };
  }

  openEntry = () => {
    alert('Opening...');
  };

  contextMenu = (e) => {
    e.preventDefault();
    this.props.openContextMenu({ x: e.clientX, y: e.clientY });
  };

  clickEntry = (e) => {
    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
      // mobile
      this.openEntry();
    } else {
      // desktop
      // eslint-disable-next-line no-lonely-if
      if (this.state.isSelected) {
        this.props.selectFile(this.props.data.id, true);
        console.log(this.state.isSelected);
        this.setState({ isSelected: false });
      } else {
        this.props.selectFile(this.props.data.id, false);
        this.setState({ isSelected: true });
      }
    }
    e.preventDefault();
  };

  render() {
    const { data } = this.props;
    return (
      <label className="file-block">
        {/* <input id="item-0" type="checkbox" /> */}
        <div
          className={this.state.isSelected ? 'file-item selected' : 'file-item'}
          onDoubleClick={this.openEntry}
          onClick={(e) => this.clickEntry(e)}
          onContextMenu={(e) => this.contextMenu(e)}
        >
          <div className="name">
            <span className="entry-icon" />
            <span className="entry-name">{data.name}</span>
          </div>
          <div className="type">Image</div>
          <div className="date">14/07/2019</div>
          <div className="size">30 MB</div>
        </div>
      </label>
    );
  }
}

export default FileBlock;
