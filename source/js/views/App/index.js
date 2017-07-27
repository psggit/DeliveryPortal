import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// import DashBoard from 'views/DashBoard';
import NotFound from 'views/NotFound';
import OrderPage from './../OrderPage';
import OrderList from './../OrderList';
import Menu from 'components/Global/Menu';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  ORDERPAGE: `${ publicPath }order/:id`,
  DASHBOARD: `${ publicPath }dashboard`,
  ORDERLISTING: `${ publicPath }orders`,
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
              <Route path={ routeCodes.ORDERPAGE} component={ OrderPage } />
              <Route path={ routeCodes.ORDERLISTING} component={ OrderList } />
              {/* <Route path={ routeCodes.DASHBOARD} component={ DashBoard } /> */}
              <Route path='*' component={ NotFound } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
