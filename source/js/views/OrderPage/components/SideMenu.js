import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { routeCodes } from './../../App';
import '@sass/components/_SideMenu.scss'

class SideMenu extends Component {
  render() {
    const menuItems = [
      { value: 'orders', label: 'in progress orders' },
      { value: 'assigned', label: 'assigned orders'},
      { value: 'history', label: 'order history' }
    ]
    return (
      <div className='side-menu'>
        <ul>
          {
            menuItems.map((item, i) => {
              return (
                <NavLink exact to={ routeCodes[item.value] }>
                  <li className='menu-item'>
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
