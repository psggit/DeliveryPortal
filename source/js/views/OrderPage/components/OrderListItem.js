import React, { Component } from 'react'

class OrderListItem extends Component {
  render() {
    const orderState = 'AwaitingRetailerConfirmation'
    const stateColorMap = {
      'AwaitingRetailerConfirmation': 'rgba(255, 9, 0, 0.11)',
      // 'AwaitingRetailerConfirmation': '#ff3b34',
      // 'AwaitingRetailerConfirmation': '#ff3b34',
    }
    const itemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    }

    const orderItemStyle = {
      background: stateColorMap[orderState]
    }

    const { order } = this.props
    return (
      <div className='orders-list-item' id={order.id} style={orderItemStyle}>
        <div style={itemStyle}>
          <p><b>{`#${order.id}`}</b></p>
          <p>{order.customer.name}</p>
        </div>
        <p className='order-status'>Awaiting retailer confirmation</p>
      </div>
    )
  }
}

export default OrderListItem
