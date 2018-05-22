import React, { Component } from 'react';
import { unmountComponentAtNode } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Api } from './../../utils/config'
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
  history: `${ publicPath }orders/history`,
  LOGIN: `${ publicPath }login`
};


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  componentWillMount() {
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }
    // https://auth.hipbar-dev.com/user/account/info
    fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          if (location.pathname !== '/login') {
            location.href = '/login'
          }
          return
        }
        response.json().then((data) => {
          if (!location.pathname.includes('orders')) {
            // createSession(data)
            location.href = '/orders'
          }
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        if (location.pathname !== '/login') {
          location.href = '/login'
        }
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <div className='Page'>
            <Switch>
              <Route exact path={ publicPath } component={ OrderPage } />
              <Route exact path={ routeCodes.LOGIN } component={ Login } />
              <Route exact path={ routeCodes.all } component={ OrderPage } />
              <Route exact path='/orders/:ordersType' component={ OrderPage } />
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
