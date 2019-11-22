import React from 'react';

export default class NotiItem extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="noti-item">
        <div
          className="noti-thumb"
          style={{
            backgroundImage: 'url(https://c.tribune.com.pk/2018/10/1830234-emmadirfani-1540029568.png)',
          }}
        />
        <span>
          {data.user && data.user.name} <b>{data.action}</b> {data.suffix}
          <span className="time">{data.time}</span>
        </span>
        {data.type == 'CONFIRM' ? (
          <div className="noti-action">
            <button className="confirm">Accept</button>
            <button>Decline</button>
          </div>
        ) : null}
      </div>
    );
  }
}
