import React, { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// import NotFound from 'views/NotFound';
import OrderPage from './../OrderPage';
import Login from './../Login';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  gmap: `${ publicPath }orders/track/:id`,
  DASHBOARD: `${ publicPath }dashboard`,
  all: `${ publicPath }orders`,
  assigned: `${ publicPath }orders/assigned`,
  history: `${ publicPath }orders/history`,OrderPage,
  LOGIN: `${ publicPath }login`
};


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <div className='Page'>
            <Switch>
              <Route exact path={ publicPath } component={ Login } />
              <Route exact path={ routeCodes.LOGIN } component={ Login } />
              <Route exact path={ routeCodes.all } component={ OrderPage } />
              {/* <Route exact path={ routeCodes.assigned } component={ OrderPage } />
              <Route exact path={ routeCodes.history } component={ OrderPage } />
              <Route exact path={ routeCodes.gmap } component={ Gmap } /> */}
              {/* <Route path={ routeCodes.DASHBOARD} component={ DashBoard } /> */}
              {/* <Route path='*' component={ NotFound } /> */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
