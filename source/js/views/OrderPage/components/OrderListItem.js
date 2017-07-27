import React, { Component } from 'react'

class OrderListItem extends Component {
  render() {
    const itemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px'
    }
    return (
      <div className='orders-list-item'>
        <div style={itemStyle}>
          <p><b>#2323</b></p>
          <p>John Carter</p>
        </div>
        <p className='order-status'>Awaiting retailer confirmation</p>
      </div>
    )
  }
}

export default OrderListItem
