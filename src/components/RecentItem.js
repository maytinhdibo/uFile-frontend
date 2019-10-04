import React from 'react';
import '../styles/loader.scss';

class RecentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      class: '',
      thumbmail: '',
    };
  }

  componentDidMount() {
    const { type } = this.props.data;
    if (type === 'image' || type === 'video') {
      this.setState({ class: 'media', thumbmail: this.props.data.thumbmail });
    } else if (type === 'audio') {
      this.setState({ class: 'audio' });
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div
        style={this.state.class === 'media' ? { backgroundImage: `url(${this.state.thumbmail})` } : {}}
        className={['recent-item', this.state.class].join(' ')}
      >
        <div className="info">
          <div className="name">{data.name}</div>
          <div className="size">{data.size}</div>
        </div>
      </div>
    );
  }
}

export default RecentItem;
