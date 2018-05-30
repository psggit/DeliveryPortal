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
  live: `${ publicPath }orders`,
  unassigned: `${ publicPath }orders/unassigned`,
  assigned: `${ publicPath }orders/assigned`,
  'busy-delivery-agents': `${ publicPath }orders/busy-delivery-agents`,
  'need-to-be-cancelled': `${ publicPath }orders/need-to-be-cancelled`,
  attempted: `${ publicPath }orders/attempted`,
  returning: `${ publicPath }orders/returning`,
  history: `${ publicPath }orders/history`,
  LOGIN: `${ publicPath }login`
};


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      key: 0
    }
    this.changeAppKey = this.changeAppKey.bind(this)
  }

  changeAppKey() {
    const { key } = this.state
    this.setState({ key: key + 1})
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
    const { key } = this.state
    return (
      <BrowserRouter>
        <div className='App'>
          <div className='Page'>
            <Switch>
              <Route exact path={ publicPath } render={ props => <OrderPage key={key} changeAppKey={this.changeAppKey} {...props} /> } />
              <Route exact path={ routeCodes.LOGIN } component={ Login } />
              <Route exact path={ routeCodes.live } render={ props => <OrderPage key={key} changeAppKey={this.changeAppKey} {...props} /> } />
              <Route exact path='/orders/:ordersType' render={ props => <OrderPage key={key} changeAppKey={this.changeAppKey} {...props} /> } />
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
