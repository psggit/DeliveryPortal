import React, { Component } from 'react'
import OrderListItem from './OrderListItem'
import '@sass/OrdersPage/OrdersList.scss'

class OrdersList extends Component {
  render() {
    return (
      <div className='orders-list'>
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
