import React from 'react';
import Modal from 'components/common/Modal';

export default class RenamePopup extends React.Component {
  componentDidUpdate(){
    if(this.props.visible){
      this.refs.text.focus();
      this.refs.text.select();
    }
  }
  render() {
    return (
      <Modal name="rename" onClose={this.props.onClose} visible={this.props.visible}>
      <div className="rename-popup">
        <h3>Rename....</h3>
        <input ref="text" value="doiten.txt" className="me-input" />
        <div style={{textAlign:"right"}}>
          <button className="me-btn">Apply</button>
          <button onClick={this.props.onClose} className="me-btn cancel">Cancel</button>
        </div>
      </div>
    </Modal>
    );
  }
}
