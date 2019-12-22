import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
  render() {
    const data = [
      {
        name: 'picture',
        id: 'adskfjsdfndslf'
      },
      {
        name: 'summer',
        id: 'ksjenfsenfkslefn'
      },
    ];
    return (
      <div className="path-breadcrumb block">
        <Link to="/drive/home">My drive</Link>
        {this.props.parse_path.map(item => {
          return (
            <Link className="item" to={"/drive/"+item.id}>
              <span className="icon">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              {item.title}
            </Link>
          );
        })}
        {/* [id: {this.props.path}] */}
      </div>
    );
  }
}
