import React from 'react';
import moment from 'moment';
import { iconParse } from 'helpers/iconParse';
import { BASE_API_URL } from 'services/requests';
// id: 1,
// viewed: false,
// owner: 2,
// file_id: '2AC4AC4E86A0C46F7AA7FAE55409B7FBA',
// file_title: 'uFile .pptx',
// file_type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
// owner_avatar: 'http://bit.ly/defaultAvatar',
// created_at: 1577120846,

export default class NotiItem extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="noti-item" onClick={() => window.open('/viewer/' + data.file_id)}>
        <div
          className="noti-thumb"
          style={{
            backgroundImage: 'url(' + iconParse(data.file_title, data.file_type == 'folder') + ')',
          }}
        />
        <span>
          {/* {data.user && data.user.name} <b>{data.action}</b> {data.suffix} */}
          {data.owner && data.owner.fullname} shared <b>{data.file_title}</b> with you
          <span className="time">{moment(data.created_at * 1000).fromNow()}</span>
        </span>
        {/* {data.type == 'CONFIRM' ? (
          <div className="noti-action">
            <button className="confirm">Accept</button>
            <button>Decline</button>
          </div>
        ) : null} */}
      </div>
    );
  }
}
