import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import '../styles/search.scss';

class SearchAssistant extends React.Component {
  constructor(props){
    super(props);
    this.state={
      inputValue:""
    }
  }
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
            <input ref={(c) => (this.input = c)}
            value={this.state.inputValue}
            onChange={(e)=>this.setState({inputValue:e.target.value})}
            placeholder="Search by tag or by name...." className="input-search" />
            <div onClick={this.props.close} role="button" tabIndex={0} className="btn-close">
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </header>
      {this.state.inputValue.length>0? 
        <div><div class="file-item"><div class="name"><span class="entry-icon"></span><span class="entry-name">a.pdf</span></div></div>
        <div class="file-item"><div class="name"><span class="entry-icon"></span><span class="entry-name">a.pdf</span></div></div>
        <div class="file-item"><div class="name"><span class="entry-icon"></span><span class="entry-name">a.pdf</span></div></div>
        <div class="file-item"><div class="name"><span class="entry-icon"></span><span class="entry-name">a.pdf</span></div></div></div>
        :null}
      

        </div>
      </div>
    );
  }
}

export default SearchAssistant;
