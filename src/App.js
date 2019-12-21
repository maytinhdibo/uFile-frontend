import React from 'react';
import './styles/app.scss';
import './styles/responsive.scss';
import './styles/grid.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import AccountRouter from './pages/account/AccountRouter';
import Account from './pages/account/Account';
import Main from './pages/main/Main';
import Dashboard from './pages/admin/Dashboard';
import Viewer from './pages/viewer/Viewer';
import { Alert, setAlert } from './components/common/Alert';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.alert = React.createRef();
  }
  componentDidMount() {
    setAlert(this.alert);
  }
  render() {
    return (
      <div className="app">
        <Alert ref={this.alert} />
        <Router>
          <Route path="/admin/dashboard" component={Dashboard} />

          <Route exact path="/drive/:path" component={Main} />
          <Route path="/viewer/:id" component={Viewer} />

          <Route exact path="/" component={AccountRouter} />
          <Route exact path="/signup" component={AccountRouter} />

          <Route exact path="/account" component={Account} />
        </Router>
      </div>
    );
  }
}

export default App;
