import React, { Component } from 'react'
import OrderListItem from './OrderListItem'
import '@sass/OrdersPage/OrdersList.scss'

class OrdersList extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    console.log(e.target);
    this.props.mountOrderDetail()
  }
  render() {
    const { ordersType } = this.props
    return (
      <div className='orders-list' onClick={this.handleClick}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => {
            return <OrderListItem />
          })
        }
      </div>
    )
  }
}

export default OrdersList
