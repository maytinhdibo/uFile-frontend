import React from 'react';
import './styles/app.scss';
import './styles/responsive.scss';
import './styles/grid.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import AccountRouter from './pages/account/AccountRouter';
import Main from './pages/main/Main';
import Dashboard from './pages/admin/Dashboard';
import Viewer from './pages/viewer/Viewer';
import Account from 'pages/account/Account';

function App() {
  return (
    <div className="app">
      <Router>
        <Route exact path="/" component={AccountRouter} />
        <Route exact path="/signup" component={AccountRouter} />

        <Route exact path="/account" component={Account} />

        <Route path="/main" component={Main} />
        <Route path="/viewer" component={Viewer} />

        <Route path="/main" component={Main} />

        <Route path="/admin/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
