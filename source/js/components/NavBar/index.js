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
    this.handleSideMenuToggle = this.handleSideMenuToggle.bind(this)
  }

  handleLogout() {
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
          localStorage.clear()
          location.href = '/login'
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

  componentDidMount() {
    document.addEventListener('click', (e) => {
      if (e.target.className === 'side-menu-overlay') {
        this.props.setSideMenuToggle()
      }
    })
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27 && this.props.isSideMenuOpen) {
        this.props.setSideMenuToggle()
      }
    })
  }

  handleClick(route) {
    this.props.history.push(`/home/orders/${route}`, null)
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

  handleSideMenuToggle() {
    this.props.setSideMenuToggle()
  }

  render() {
    const { shouldDeliever } = this.state
    return (
      <header>
        <ul>
          <li style={{ cursor: 'pointer' }} onClick={this.handleSideMenuToggle}>
            { getIcon('menu')}
          </li>

          <li className='resume-pause'>
            <span>
              Pause deliveries
            </span>
            <span>
              {getIcon('pause')}
            </span>
          </li>

          <li>
            <span style={{color: '#FFF', fontSize: '16px'}}>Autopilot</span>
            <ToggleButton
              autoPilotStatus={this.props.autoPilotStatus}
              autoPilot={this.props.autoPilot}
            />
          </li>

          <li onClick={() => { this.handleClick('live') }} style={{ color: '#fff', fontSize: '16px', cursor: 'pointer', padding: '0 20px', borderRight: '2px solid #fff' }}>
            In-progress orders
          </li>

          <li onClick={() => { this.handleClick('attempted') }} style={{ color: '#fff', fontSize: '16px', padding: '0 20px', cursor: 'pointer' }}>
            Attempted orders
          </li>

          <li className='user' onClick={this.handleLogout}>Logout</li>
        </ul>
      </header>
    )
  }
}

export default NavBar
