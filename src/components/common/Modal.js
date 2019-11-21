import React from 'react';
import '../../styles/modal.scss';

export default class Modal extends React.Component {
  handleChildClick(e) {
    e.stopPropagation();
  }
  render() {
    return (
      <div
        style={{
          display: this.props.visible ? 'block' : 'none',
        }}
        className="me-modal-overlay"
        onClick={this.props.onClose}
      >
        <div onClick={this.handleChildClick} className="me-modal-body">{this.props.children}</div>
      </div>
    );
  }
}
