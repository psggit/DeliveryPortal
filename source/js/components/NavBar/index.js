import React, { Component } from 'react'
import { getIcon } from './../utils'
import SearchInput from './../SearchInput'
import ToggleButton from './../ToggleButton'
import { NavLink } from 'react-router-dom'
import { Api } from './../../utils/config'
// import { routeCodes } from './../../App';

import './index.scss'

class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      shouldDeliever: true,
      ordersType: 'all'
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleNavigation = this.handleNavigation.bind(this)
  }

  handleLogout() {
    localStorage.clear()
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }

    fetch(`${Api.authUrl}/user/logout`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          return
        }
        response.json().then((data) => {
          localStorage.clear()
          location.href = '/login'
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        localStorage.clear()
        location.href = '/login'
      })
  }

  handleClick() {
    const { shouldDeliever } = this.state
    this.setState({ shouldDeliever: !shouldDeliever })
  }

  handleNavigation(ordersType) {
    $('body').animate({
      scrollTop: 0
    }, 500)
    this.setState({ ordersType })
    this.props.resetPagination()
    this.props.handleRouteChange(ordersType, 0)
    this.props.unmountOrderDetail()
  }

  render() {
    const { shouldDeliever } = this.state
    const menuItems = [
      { value: '', label: 'in progress' },
      { value: 'assigned', label: 'assigned'},
      { value: 'unassigned', label: 'unassigned'},
      { value: 'history', label: 'history' },
      { value: 'cancellation', label: 'Need to be cancelled'},
      { value: 'attempted', label: 'Attempted'}
    ]
    if (!this.props.canAccess('other-orders')) {
      menuItems.splice(1, 2)
      menuItems.pop()
    }
    return (
      <header>
        <ul>
          <li className="logo">
            <a href='/orders'>
              <img src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAA1JAAAAJGI0MjhiMjNhLTcyYzctNGQyYi1hNjlmLTM5MTU0MWZmMzA4MQ.png" />
            </a>
          </li>
          {
            this.props.canAccess('resume-pause')
            ? (
              <li className="resume-pause">
                <span>
                  {
                    shouldDeliever
                    ? 'Pause Deliveries'
                    : 'Continue Deliveries'
                  }
                </span>
                <span onClick={this.handleClick}>
                  {
                    shouldDeliever
                    ? getIcon('pause')
                    : getIcon('play')
                  }
                </span>
            </li>
            )
            : ''
          }
          {
            this.props.canAccess('auto-pilot')
            ? (
              <li>
                <span style={{color: '#FFF', fontSize: '16px'}}>Autopilot</span>
                <ToggleButton
                  autoPilotStatus={this.props.autoPilotStatus}
                  autoPilot={this.props.autoPilot}
                />
              </li>
            )
            : ''
          }
          {
            menuItems.map((item, i) => {
              return (
                <a key={`nav-link-${i}`} href={`/orders/${item.value}`}>
                  <li className={`menu-item ${this.state.ordersType === item.value ? 'active' : ''}`}>
                    { item.label }
                  </li>
                </a>
              )
            })
          }
          <li className='user' onClick={this.handleLogout}>Logout</li>
        </ul>
      </header>
    )
  }
}

export default NavBar
