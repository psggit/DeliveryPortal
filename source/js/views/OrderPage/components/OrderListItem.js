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

    const { consumerName, id, orderStatus } = this.props
    // console.log(order);
    return (
      <div className='orders-list-item' id={id} style={orderItemStyle}>
        <div style={itemStyle}>
          <p><b>{`#${id}`}</b></p>
          <p>{consumerName}</p>
        </div>
        <p className='order-status'>
          {orderStatus}
        </p>
      </div>
    )
  }
}

export default OrderListItem
