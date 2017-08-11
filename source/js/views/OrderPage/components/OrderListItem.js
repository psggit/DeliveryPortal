import React, { Component } from 'react'

class OrderListItem extends Component {
  render() {
    const orderState = 'AwaitingRetailerConfirmation'
    const stateColorMap = {
      'AwaitingRetailerConfirmation': '#ffebea',
      // 'AwaitingRetailerConfirmation': '#ff3b34',
      // 'AwaitingRetailerConfirmation': '#ff3b34',
    }
    const itemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    }

    const orderItemStyle = {
      background: stateColorMap[orderState],
      border: `1px solid ${'#ff3b34'}`,
      borderRadius: '2px'
    }

    const { order, orderStatus } = this.props
    // console.log(order);
    return (
      <div className='orders-list-item' id={order.id} style={orderItemStyle}>
        <div style={itemStyle}>
          <p><b>{`#${order.id}`}</b></p>
          <p>{order.customer.name}</p>
        </div>
        <p className='order-status'>
          {orderStatus}
        </p>
      </div>
    )
  }
}

export default OrderListItem
