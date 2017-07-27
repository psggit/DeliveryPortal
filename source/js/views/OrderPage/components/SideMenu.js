import React, { Component } from 'react'
import '@sass/components/_SideMenu.scss'

class SideMenu extends Component {
  render() {
    const menuItems = [
      'in progress orders',
      'assigned orders',
      'order history'
    ]
    return (
      <div className='side-menu'>
        <ul>
          {
            menuItems.map((item, i) => {
              return (
                <li className='menu-item'>
                  { item }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default SideMenu
