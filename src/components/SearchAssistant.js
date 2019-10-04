/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class SearchAssistant extends React.Component {
  componentDidUpdate() {
    this.input.focus();
  }

  render() {
    return (
      <div>
        <div
          onClick={this.props.close}
          className={this.props.opened ? 'me-search-assistant-overlay opened' : 'me-search-assistant-overlay'}
        />
        <div className="me-search-assistant">
          <header className="flex">
            <input ref={(c) => (this.input = c)} placeholder="Search by tag or by name...." className="input-search" />
            <div onClick={this.props.close} role="button" tabIndex={0} className="btn-close">
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default SearchAssistant;
