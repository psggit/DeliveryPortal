import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { routeCodes } from './../../App';
import '@sass/components/_SideMenu.scss'

class SideMenu extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      ordersType: 'all'
    }
  }

  handleClick(ordersType) {
    this.setState({ ordersType })
    this.props.handleRouteChange(ordersType)
    this.props.unmountOrderDetail()
  }

  render() {
    const menuItems = [
      { value: 'all', label: 'in progress orders' },
      { value: 'assigned', label: 'assigned orders'},
      { value: 'history', label: 'order history' }
    ]
    return (
      <div className='side-menu'>
        <ul>
          {
            menuItems.map((item, i) => {
              return (
                <NavLink key={`nav-link-${i}`} exact to={ routeCodes.all }>
                  <li className={`menu-item ${this.state.ordersType === item.value ? 'active' : ''}`} onClick={() => { this.handleClick(item.value) }}>
                    { item.label }
                  </li>
                </NavLink>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default SideMenu
