import React, { Component } from 'react'
import OrderListItem from './OrderListItem'
import '@sass/OrdersPage/OrdersList.scss'

class OrdersList extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(orderId, e) {
    if (e.target.nodeName !== 'BUTTON') {
      this.props.mountOrderDetail(orderId)
    }
  }
  render() {
    const { orders, state, loadingOrdersList } = this.props
    // const orderStatus = `${titleMap[state]}${articleMap[state]}${timeMap[state]}${epilogueMap[state]}`

    return (
      <div className='order-list-container'>
        <table className='orders-list'>
        <thead>
          <tr>
            <td>Order Id</td>
            <td>Order status</td>
            <td>Consumer Id</td>
            { this.props.canAccess('consumer-col') ? <td>Consumer name</td> : '' }
            { this.props.canAccess('consumer-col') ? <td>Consumer phone</td> : '' }
            { this.props.canAccess('consumer-col') ? <td>Assigned to</td> : '' }
            <td>Order placed time</td>
          </tr>
        </thead>
        <tbody>
          {
            !loadingOrdersList
            ? (
              orders.map((item, i) => {
                return (
                  <OrderListItem
                    unmountOrderDetail={this.props.unmountOrderDetail}
                    ordersType={this.props.ordersType}
                    key={`order-list-item-${i}`}
                    id={item.order_id}
                    consumerName={item.consumer_name}
                    consumerId={item.consumer_id}
                    retailer_notified_time={item.retailer_notified_time}
                    dp_delivered_time={item.dp_delivered_time}
                    dp_picked_up_time={item.dp_picked_up_time}
                    dp_notified_time={item.dp_notified_time}
                    dp_arrived_at_store_time={item.dp_arrived_at_store_time}
                    dp_accepted_time={item.dp_accepted_time}
                    dp_confirmation_time={item.dp_confirmation_time}
                    dp_reached_to_consumer_time={item.dp_reached_to_consumer_time}
                    retailer_accepted_time={item.retailer_confirmation_time}
                    cancellation_time={item.cancelled_time}
                    orderPlacedTime={item.order_placed_time}
                    cancellation_return_time={item.cancellation_return_time}
                    orderStatus={item.status}
                    handleClick={this.handleClick}
                    assignedTo={item.assigned_to}
                    assignedToId={item.assigned_to_id}
                    consumerPhone={item.consumer_phone}
                    actions={this.props.actions}
                    canAccess={this.props.canAccess}
                />
                )
              })
            )
            : <tr className='loader'></tr>
          }
        </tbody>
      </table>
      </div>
    )
  }
}

export default OrdersList
