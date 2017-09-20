import React, { Component } from 'react'
import { getIcon } from './../utils'
import SearchInput from './../SearchInput'
import ToggleButton from './../ToggleButton'
import { NavLink } from 'react-router-dom'
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
    location.href = '/login'
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
      { value: 'all', label: 'in progress' },
      { value: 'assigned', label: 'assigned'},
      { value: 'unassigned', label: 'unassigned'},
      { value: 'history', label: 'history' },
      { value: 'cancellation', label: 'Need to be canelled'}
    ]
    if (!this.props.canAccess('other-orders')) {
      menuItems.splice(1, 2)
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
                <NavLink key={`nav-link-${i}`} exact to={ 'orders' }>
                  <li className={`menu-item ${this.state.ordersType === item.value ? 'active' : ''}`} onClick={() => { this.handleNavigation(item.value) }}>
                    { item.label }
                  </li>
                </NavLink>
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
