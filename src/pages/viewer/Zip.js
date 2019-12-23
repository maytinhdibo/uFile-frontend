import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconParse } from './../../helpers/iconParse';

import '../../styles/viewer.scss';

export default class Zip extends React.Component {
  renderIcon = (name, isFolder) => {
    if (isFolder) {
      return {
        backgroundImage: 'url(/img/mime-type/folder.svg)',
      };
    }
    return { backgroundImage: 'url(' + iconParse(name) + ')' };
  };
  render() {
    const data = this.props.data || [];
    const { props } = this;
    return (
      <div className="zip-viewer">
        <header>
          <h2>Zip viewer</h2>[{data.length} item{data.length>1?'s':null}]
        </header>

        {data.map((item, key) => {
          return (
            <div key={key} class="item">
              <span style={this.renderIcon(item.name, item.name.substr(item.name.length - 1)=="/")} className="entry-icon" />
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }
}
