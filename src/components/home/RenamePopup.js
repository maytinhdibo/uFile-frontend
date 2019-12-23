import React from 'react';
import Modal from 'components/common/Modal';

import fileServices from './../../services/files';

export default class RenamePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.visible != this.props.visible) {
      this.refs.text.focus();
      // this.refs.text.select();
      let entry_name = this.props.selectedEntry && this.props.selectedEntry.name;
      this.setState({ name: entry_name });
    }
  }

  rename = () => {
    let entry_id = this.props.selectedEntry.id;
    fileServices.rename({ file_id: entry_id, new_name: this.state.name }).then(data => {
      setTimeout(() => {
        this.props.reloadFolder();
      }, 1000);
    });
    this.props.onClose();
  };

  render() {
    return (
      <Modal name="rename" onClose={this.props.onClose} visible={this.props.visible}>
        <div className="rename-popup">
          <h3>Rename....</h3>
          <input
            ref="text"
            value={this.state.name}
            onChange={evt => {
              this.setState({ name: evt.target.value });
            }}
            className="me-input"
          />
          <div style={{ textAlign: 'right' }}>
            <button onClick={this.rename} className="me-btn">
              Apply
            </button>
            <button onClick={this.props.onClose} className="me-btn cancel">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
