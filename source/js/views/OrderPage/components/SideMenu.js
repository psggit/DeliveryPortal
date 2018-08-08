import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { routeCodes } from './../../App';
import { menuItems } from './../constants/strings'
import '@sass/components/_SideMenu.scss'

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      currentRoute: 'live'
    }
  }

  handleClick(nextroute) {
    // history.pushState(null, null, `/orders/${ordersType}`)
    this.setState({ currentRoute: nextroute })
    // location.href = `/orders/${ordersType}`
    // this.props.resetPagination()
    this.props.handleRouteChange(nextroute)
    // this.props.unmountOrderDetail()
    this.props.setSideMenuToggle()
  }

  render() {
    const { isOpen } = this.props

    return (
      <Fragment>
        <div
          className={`side-menu ${isOpen ? 'side-menu--open' : 'side-menu--close'}`}
          style={{ boxShadow: '0px 0px 10px 2px #333'}}
        >
          <ul>
            <li style={{
              background: '#333',
              color: '#fff',
              height: '65px'
            }} className='menu-item'>DELIVERY SUPPORT</li>
            {
              menuItems.map((item, i) => {
                return (
                  <Fragment>
                    {
                      item.value !== 'all' &&
                      <NavLink key={`nav-link-${i}`} exact to={ routeCodes[item.value] }>
                        <li className={`menu-item ${this.props.currentRoute === item.value ? 'active' : ''}`} onClick={() => { this.handleClick(item.value) }}>
                          { item.label }
                        </li>
                      </NavLink>
                    }
                  </Fragment>
                )
              })
            }
          </ul>
        </div>
        <div
          className='side-menu-overlay'
          style={{
            display: isOpen ? 'block' :'none',
            background: 'rgba(0, 0, 0, 0.4)',
            height: '100vh',
            width: '100%',
            zIndex: 3,
            position: 'fixed',
            top: '0',
            left: '0'
          }}
        />
      </Fragment>
    )
  }
}

export default SideMenu
