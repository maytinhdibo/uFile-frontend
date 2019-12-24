import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import fileServices from '../../services/files';

import bytes from 'bytes';

import '../../styles/viewer.scss';
import Media from './Media';
import Office from './Office';

import { faInfoCircle, faShare, faTimes, faChevronRight, faDownload } from '@fortawesome/free-solid-svg-icons';
import Zip from './Zip';
import { BASE_API_URL } from 'services/requests';

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetail: false,
      fileId: '',
      fileName: '',
      fileStream: 'https://analyticsindiamag.com/wp-content/uploads/2019/07/image_rec_lib_banner.jpg',
      detailData: {
        updated_at: '',
        file_title: '',
        file_type: '',
        size: 0,
        owner: {
          id: '',
          fullname: '',
        },
      },
    };
  }
  componentDidMount() {
    var id;
    if (this.props.modal) {
      id = this.props.file.id;
      this.setState({
        fileId: id,
        fileStream: BASE_API_URL + 'preview/' + this.props.file.id,
        dataZip: [],
      });
    } else {
      id = this.props.match.params.id;
      this.setState({
        fileId: id,
        fileStream: BASE_API_URL + 'preview/' + this.props.match.params.id,
        dataZip: [],
      });
    }
    fileServices.searchDetails({ file_id: id }).then(data => {
      this.setState({
        detailData: data.result.files[0],
      });
      this.setState({
        fileName: data.result.files[0].file_title,
      });

      if (data.result.files[0].file_type == 'folder')
        window.location.href = window.location.origin + '/drive/' + data.result.files[0].file_id;

      if (this.state.fileName.toLowerCase().indexOf('.zip') != -1) {
        fileServices.preview(this.state.fileId).then(data => {
          // console.log(data.files);
          this.setState({ dataZip: data.files });
        });
      }
    });
  }
  viewerRender = () => {
    const name = this.props.file ? this.props.file.name : this.state.fileName;

    const ext = name.split('.').pop().toLowerCase();

    if (['mp4', 'ogg'].indexOf(ext) != -1) {
      return <Media src={this.state.fileStream} type="video" />;
    } else if (ext == 'mp3') {
      return <Media src={this.state.fileStream} type="audio" />;
    } else if (['docx', 'doc', 'ppt', 'pptx', 'xls', 'xlsx'].indexOf(ext) != -1) {
      return <iframe className="viewer" src={this.state.fileStream}></iframe>;
    } else if (['png', 'jpg', 'svg', 'jpeg'].indexOf(ext) != -1) {
      return <img className="viewer" src={this.state.fileStream} />;
    } else if (ext == 'pdf') {
      return <iframe className="viewer" src={this.state.fileStream}></iframe>;
    } else if (['zip', 'tar', 'gtar'].indexOf(ext) != -1) {
      return <Zip data={this.state.dataZip} />;
    } else {
      return <h2 className="alert">This type can not preview! Please download the file.</h2>;
    }
  };
  render() {
    return (
      <div className="me-viewer">
        <header>
          {this.props.modal ? (
            <div className="tools">
              <span onClick={this.props.closeModal}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
          ) : null}
          <b>{this.props.modal ? this.props.file.name : this.state.fileName}</b>
          <div className="tools">
            <a href={BASE_API_URL + 'download/' + this.state.fileId} target="_blank">
              <span>
                <FontAwesomeIcon icon={faDownload} />
              </span>
            </a>
            <span
              onClick={() => {
                this.setState({ openDetail: true });
              }}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>
            {/* <span>
              <FontAwesomeIcon icon={faShare} />
            </span> */}
          </div>
        </header>

        <div className="viewer-block">
          {this.viewerRender()}
          {/* mp3, mp4, ogg */}
          {/* <Media src="https://www.w3schools.com/html/mov_bbb.mp4" /> */}
          {/* <Media src="https://www.w3schools.com/TagS/horse.ogg" type="audio"/> */}

          {/* office for docx, doc, ppt, pptx, xls, xlsx*/}
          {/* <Office src="https://easychair.org/publications/easychair.docx" /> */}

          {/*txt, pdf*/}
          {/* <iframe src=""></iframe> */}

          {/*Image*/}
          {/* <img className="viewer" src="https://analyticsindiamag.com/wp-content/uploads/2019/07/image_rec_lib_banner.jpg"/> */}

          {/*Zip*/}
          {/* <Zip
            data={[
              {
                name: 'hello',
                isFolder: true,
              },
              {
                name: 'a.mp4',
                isFolder: false,
              },
            ]}
          /> */}
        </div>

        <div
          style={{
            right: this.state.openDetail ? 0 : '-100%',
          }}
          className="info"
        >
          <header>
            <div className="tools">
              <span
                onClick={() => {
                  this.setState({ openDetail: false });
                }}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              <b>&nbsp;Details</b>
            </div>
          </header>
          <table>
            <tr>
              <th>Update at:</th>
              <td>{this.state.detailData && this.state.detailData.updated_at}</td>
            </tr>
            <tr>
              <th>Size:</th>
              <td>{this.state.detailData && bytes(this.state.detailData.size, { decimalPlaces: 0 })}</td>
            </tr>
            <tr>
              <th>File type:</th>
              <td>{this.state.detailData && this.state.detailData.file_type}</td>
            </tr>
            <tr>
              <th>Location:</th>
              <td>Drive/</td>
            </tr>
            <tr>
              <th>Owner:</th>
              <td>{this.state.detailData && this.state.detailData.owner.fullname}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
