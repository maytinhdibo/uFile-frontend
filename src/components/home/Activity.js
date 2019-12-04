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
        time: '12 minutes ago',
      },
      {
        type: 'CONFIRM',
        user: {
          id: 1,
          name: 'Ngoc Dang',
        },
        action: 'shared',
        suffix: 'a file with you',
        time: '4 weeks ago',
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
          <div className="noti-item">
            <div
              className="noti-thumb"
              style={{
                backgroundImage: 'url(https://c.tribune.com.pk/2018/10/1830234-emmadirfani-1540029568.png)',
              }}
            />
            <span>
              Cuong Tran <b>added</b> new file to your folder last day
            </span>
            <span className="time">12 mins ago</span>
          </div>
          {notiData.map(item => {
            return <NotiItem data={item} />;
          })}
        </div>
      </div>
    );
  }
}
