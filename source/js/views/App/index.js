import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Api } from './../../utils/config'
import Login from './../Login'
import { createSession } from './../Login/utils'
import Home from './../OrderPage'

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  gmap: `${ publicPath }orders/track/:id`,
  live: `${ publicPath }home/orders/live`,
  unassigned: `${ publicPath }home/orders/unassigned`,
  assigned: `${ publicPath }home/orders/assigned`,
  'busy-delivery-agents': `${ publicPath }home/orders/busy-delivery-agents`,
  'need-to-be-cancelled': `${ publicPath }home/orders/need-to-be-cancelled`,
  attempted: `${ publicPath }home/orders/attempted`,
  returning: `${ publicPath }home/orders/returning`,
  history: `${ publicPath }home/orders/history`,
  LOGIN: `${ publicPath }login`
};


export default class App extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.menuItemsMap = {}
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
          createSession(data)
          if (!location.pathname.includes('orders')) {
            location.href = '/home/orders/live'
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
              <Route exact path='/login' component={ Login } />
              <Route path='/home/*' component={ Home } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
