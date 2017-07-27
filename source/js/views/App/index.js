import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// import DashBoard from 'views/DashBoard';
import Gmap from './../OrderPage/components/Gmap'
import NotFound from 'views/NotFound';
import OrderPage from './../OrderPage';
import OrderList from './../OrderList';
import Menu from 'components/Global/Menu';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  gmap: `${ publicPath }order/:id`,
  DASHBOARD: `${ publicPath }dashboard`,
  orders: `${ publicPath }orders`,
  assigned: `${ publicPath }assigned`,
  history: `${ publicPath }history`
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
              {/* <Route exact path={ publicPath } component={ DashBoard } /> */}
              <Route path={ routeCodes.orders} component={ OrderPage } />
              <Route path={ routeCodes.gmap} component={ Gmap } />
              {/* <Route path={ routeCodes.DASHBOARD} component={ DashBoard } /> */}
              <Route path='*' component={ NotFound } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
