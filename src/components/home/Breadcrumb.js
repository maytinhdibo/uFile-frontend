import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
  render() {
    const data = [
      {
        name: 'picture',
        path: '/picture',
      },
      {
        name: 'summer',
        path: '/picture',
      },
    ];
    return (
      <div className="path-breadcrumb block">
        <Link to="/drive/home">My drive</Link>
        {data.map(item => {
          return (
            <Link className="item" to={item.path}>
              <span className="icon">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              {item.name}
            </Link>
          );
        })}
        {this.props.path}
      </div>
    );
  }
}
