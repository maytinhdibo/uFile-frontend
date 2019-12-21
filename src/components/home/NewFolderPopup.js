import React from 'react';
import Modal from 'components/common/Modal';
import folderServices from './../../services/folders';
import { alertText } from 'components/common/Alert';

export default class NewFolderPopup extends React.Component {
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
    }
  }
  newFolder = () => {
    if(this.state.name < 1 ){
      alertText("Please enter folder name!");
      return;
    }
    folderServices
      .create({
        parent_id: this.props.path == 'home' ? localStorage.user_id : this.props.path,
        file_title: this.state.name,
      })
      .then(() => {
        this.props.reloadFolder();
        this.props.onClose();
      });
  };
  render() {
    return (
      <Modal name="rename" onClose={this.props.onClose} visible={this.props.visible}>
        <div className="rename-popup">
          <h3>Enter name of new folder....</h3>
          <input
            ref="text"
            placeholder="new folder"
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
            className="me-input"
          />
          <div style={{ textAlign: 'right' }}>
            <button onClick={this.newFolder} className="me-btn">
              Create
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
