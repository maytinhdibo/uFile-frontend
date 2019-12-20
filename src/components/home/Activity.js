import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import NotiItem from '../activity/NotiItem';

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailTab: false,
    };
  }
  componentDidMount() {
    this.props.openDetailTab(this.openDetailTab);
 }
  openDetailTab = () => {
    this.setState({ detailTab: true });
  };
  render() {
    const notiData = [
      {
        type: 'TEXT',
        user: {
          id: 1,
          name: 'Hoang Bao Long',
        },
        action: 'added',
        suffix: 'new file to your folder',
        time: '2019-12-20T07:20:00.000Z',
      },
      {
        type: 'CONFIRM',
        user: {
          id: 1,
          name: 'Ngoc Dang',
        },
        action: 'shared',
        suffix: 'a file with you',
        time: '2015-03-04T00:00:00.000Z',
      },
    ];
    return (
      <div className={this.props.notiOpen ? 'notibar opened' : 'notibar'}>
        <div className="noti-tab">
          <span
            className={!this.state.detailTab ? 'actived' : null}
            onClick={() => this.setState({ detailTab: false })}
          >
            Activity
          </span>
          <span className={this.state.detailTab ? 'actived' : null} onClick={() => this.setState({ detailTab: true })}>
            Detail
          </span>
          <button type="button" onClick={this.props.closeNoti} className="noti-close">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div
          style={{
            display: this.state.detailTab ? 'block' : 'none',
          }}
          className="detail tab"
        >
          <div className="file-info">
            <div className="preview"></div>
            <span className="file-name">phongcanh.jpg</span>
          </div>
          <div className="file-fulldetail">
            <table>
              <tr>
                <th>Create at:</th>
                <td>12/11/2019 8:23</td>
              </tr>
              <tr>
                <th>File type:</th>
                <td>document/PDF</td>
              </tr>
              <tr>
                <th>Location:</th>
                <td>Drive/Shared with me</td>
              </tr>
              <tr>
                <th>Owner:</th>
                <td>Hoang Bao Long</td>
              </tr>
            </table>
          </div>
        </div>

        <div
          style={{
            display: !this.state.detailTab ? 'block' : 'none',
          }}
          className="noti tab"
        >
          {notiData.map(item => {
            return <NotiItem data={item} />;
          })}
        </div>
      </div>
    );
  }
}
