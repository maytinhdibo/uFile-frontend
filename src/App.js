import React from 'react';
import logo from './logo.svg';
import './styles/app.scss';
import './styles/responsive.scss';
import './styles/grid.scss';

import AccountRouter from './pages/account/AccountRouter';
import Main from './pages/main/Main';

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Router>
      <Route exact path="/" component={AccountRouter} />
      <Route exact path="/signup" component={AccountRouter} />
      <Route path="/main" component={Main} />
      </Router>
    </div>
  );
}

export default App;
