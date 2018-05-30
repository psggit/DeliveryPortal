import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { routeCodes } from './../../App';
import '@sass/components/_SideMenu.scss'

class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      ordersType: 'all'
    }
  }

  handleClick(ordersType) {
    // this.setState({ ordersType })
    location.href = `/orders/${ordersType}`
    this.props.resetPagination()
    this.props.handleRouteChange(ordersType)
    this.props.unmountOrderDetail()
  }

  render() {
    const { isOpen } = this.props
    const menuItems = [
      { value: 'all', label: 'in progress orders' },
      { value: 'assigned', label: 'assigned orders'},
      { value: 'unassigned', label: 'unassigned orders'},
      { value: 'history', label: 'order history' },
      { value: 'unavailable-deliverers', label: 'Unavailable delivery agents'},
      { value: 'need-to-be-cancelled', label: 'Need to be cancelled'},
      { value: 'attempted', label: 'Attempted orders'}
    ]
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
                  <NavLink key={`nav-link-${i}`} exact to={ routeCodes.all }>
                    <li className={`menu-item ${this.props.ordersType === item.value ? 'active' : ''}`} onClick={() => { this.handleClick(item.value) }}>
                      { item.label }
                    </li>
                  </NavLink>
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
