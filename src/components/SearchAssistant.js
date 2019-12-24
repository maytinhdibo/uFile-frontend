import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { iconParse } from './../helpers/iconParse';

import fileServices from './../services/files';

import '../styles/search.scss';

class SearchAssistant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      results: [],
    };
  }
  componentDidUpdate() {
    this.input.focus();
  }

  onOpen = item => {
    this.props.onOpen({
      id: item.file_id,
      name: item.file_title,
      isFolder: item.file_type == 'folder',
    });
    this.props.close();
  };

  inputChange = async e => {
    await this.setState({ inputValue: e.target.value });
    fileServices
      .searchDetails({
        q: this.state.inputValue,
        user_id: '1',
        basic_info: true,
      })
      .then(data => {
        console.log(data);
        this.setState({ results: data.result.files });
      });
  };

  renderIcon = (name, isFolder, thumbnail) => {
    if (isFolder) {
      return {
        backgroundImage: 'url(/img/mime-type/folder.svg)',
      };
    } else if (thumbnail) {
      return {
        backgroundImage: 'url(' + thumbnail + ')',
        backgroundSize: 'cover',
      };
    }
    return {
      backgroundImage: 'url(' + iconParse(name) + ')',
    };
  };

  render() {
    const results = [
      {
        id: 3,
        name: 'hinhanh.doc',
        size: 33,
        updated_at: '2019-02-03T00:00:00.000Z',
      },
      {
        id: 9,
        name: 'hinhanh.rar',
        size: 3567893,
        updated_at: '2019-02-03T00:00:00.000Z',
      },
      {
        isFolder: true,
        id: 4,
        name: 'hinhanh',
        size: 30,
        updated_at: '2015-03-04T00:00:00.000Z',
      },
    ];
    return (
      <div>
        <div
          onClick={this.props.close}
          className={this.props.opened ? 'me-search-assistant-overlay opened' : 'me-search-assistant-overlay'}
        />
        <div className="me-search-assistant">
          <header className="flex">
            <input
              ref={c => (this.input = c)}
              value={this.state.inputValue}
              onChange={e => this.inputChange(e)}
              placeholder="Search by tag or by name...."
              className="input-search"
            />
            <div onClick={this.props.close} role="button" tabIndex={0} className="btn-close">
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </header>
          {this.state.inputValue.length > 0 ? (
            <div>
              {this.state.results.map(item => {
                return (
                  <div onClick={() => this.onOpen(item)} class="file-item">
                    <div class="name">
                      <span
                        class="entry-icon"
                        style={this.renderIcon(item.file_title, item.file_type == 'folder', item.thumbnail)}
                      ></span>
                      <span class="entry-name">{item.file_title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : // <div>
          //   <div class="file-item">
          //     <div class="name">
          //       <span class="entry-icon"></span>
          //       <span class="entry-name">a.pdf</span>
          //     </div>
          //   </div>
          //   <div class="file-item">
          //     <div class="name">
          //       <span class="entry-icon"></span>
          //       <span class="entry-name">a.pdf</span>
          //     </div>
          //   </div>
          //   <div class="file-item">
          //     <div class="name">
          //       <span class="entry-icon"></span>
          //       <span class="entry-name">a.pdf</span>
          //     </div>
          //   </div>
          //   <div class="file-item">
          //     <div class="name">
          //       <span class="entry-icon"></span>
          //       <span class="entry-name">a.pdf</span>
          //     </div>
          //   </div>
          // </div>
          null}
        </div>
      </div>
    );
  }
}

export default SearchAssistant;
