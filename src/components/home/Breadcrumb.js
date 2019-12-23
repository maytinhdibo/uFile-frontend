import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
  renderPath = () => {
    let spe = ['photos', 'shared-with-me', 'favorites', 'trash'];
    if (spe.indexOf(this.props.path) == -1) {
      return this.props.parse_path.map(item => {
        return (
          <Link className="item" to={'/drive/' + item.id}>
            <span className="icon">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
            {item.title}
          </Link>
        );
      });
    } else {
      let name;
      switch (this.props.path) {
        case 'photos':
          name = 'Photos';
          break;
        case 'favorites':
          name = 'Favorites';
          break;
        case 'trash':
          name = 'Trash';
          break;
        case 'shared-with-me':
          name = 'Shared with me';
          break;
        default:
        // code block
      }
      return (
        <Link className="item" to={'/drive/' + this.props.path}>
          <span className="icon">
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
          {name}
        </Link>
      );
    }
  }
  render() {
    const data = [
      {
        name: 'picture',
        id: 'adskfjsdfndslf',
      },
      {
        name: 'summer',
        id: 'ksjenfsenfkslefn',
      },
    ];
  
    return (
      <div className="path-breadcrumb block">
        <Link to="/drive/home">My drive</Link>
        {this.renderPath()}
        {/* [id: {this.props.path}] */}
      </div>
    );
  }
}
