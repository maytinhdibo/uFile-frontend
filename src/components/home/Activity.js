import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import bytes from 'bytes';

import NotiItem from '../activity/NotiItem';

import filesServices from '../../services/files';
import moment from 'moment';
import { iconParse } from 'helpers/iconParse';

export default class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailTab: false,
      detailData: {
        file_title: 'Hoang Bao Long.png',
        file_type: 'image/png',
        file_tag: [],
        size: 0,
        updated_at: '',
        owner:{
          id:"",
          fullname:""
        }
      },
    };
  }
  componentDidMount() {
    this.props.openDetailTab(this.openDetailTab);
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.detailTab!=this.state.detailTab && this.props.folder){
      filesServices.searchDetails({ file_id: this.props.folder}).then(data => {
        this.setState({
          detailData: data.result.files[0],
        });
      });
    }
  }
  openDetailTab = () => {
    this.setState({ detailTab: true });
    filesServices.searchDetails({ file_id: this.props.selectedEntry[0].id }).then(data => {
      this.setState({
        detailData: data.result.files[0],
      });
      console.log(this.state.detailData);
    });
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
            <div style={{
              backgroundImage: "url("+iconParse(this.state.detailData.file_title)+")"
            }} className="preview"></div>
        <span className="file-name">{this.state.detailData.file_title}</span>
          </div>
          <div className="file-fulldetail">
            <table>
              <tr>
                <th>Update at:</th>
                <td>
                {this.state.detailData.updated_at}
                </td>
                {/* <td>{moment(this.state.detailData.updated_at).format('DD/MM/YYYY')}</td> */}
              </tr>
              <tr>
                <th>Size:</th>
                <td>{bytes(this.state.detailData.size, { decimalPlaces: 0 })}</td>
              </tr>
              <tr>
                <th>File type:</th>
                <td>{this.state.detailData.file_type}</td>
              </tr>
              {/* <tr>
                <th>Location:</th>
                <td>Drive/Shared with me</td>
              </tr> */}
              <tr>
                <th>Owner:</th>
                <td>{this.state.detailData.owner.fullname}</td>
              </tr>
              <tr>
                <th>Keyword:</th>
                <td>{this.state.detailData.file_tag && this.state.detailData.file_tag.join(", ")}</td>
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
