import React, { Component } from 'react'
import OrderListItem from './OrderListItem'
import '@sass/OrdersPage/OrdersList.scss'

class OrdersList extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(orderId, e) {
    if (e.target.nodeName !== 'BUTTON' && this.props.ordersType !== 'attempted') {
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
            <td>{ this.props.ordersType === 'attempted' ? 'Cart value' : 'Order Id' }</td>
            { this.props.ordersType !== 'attempted' ? <td>Order status</td> : '' }
            <td>Consumer Id</td>
            { this.props.canAccess('consumer-col') ? <td>Consumer name</td> : '' }
            { this.props.canAccess('consumer-col') ? <td>Consumer phone</td> : '' }
            { this.props.ordersType == 'attempted' ? <td>Consumer Address</td> : '' }
            { this.props.ordersType == 'attempted' ? <td>Reason</td> : '' }
            { this.props.ordersType == 'attempted' ? <td>Cart Details</td> : '' }
            { this.props.ordersType == 'attempted' ? <td>Nearby retailers</td> : '' }
            { this.props.ordersType == 'attempted' ? <td>Unavailable product</td> : '' }
            { this.props.ordersType == 'attempted' ? <td>Prime retailer</td> : '' }
            { this.props.ordersType == 'attempted' ? <td>Locality name</td> : '' }
            { this.props.canAccess('consumer-col') && this.props.ordersType !== 'attempted' ? <td>Assigned to</td> : '' }
            <td>{ this.props.ordersType !== 'attempted' ? 'Order placed time' : 'Order attempted time' }</td>
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
                    reason={item.reason}
                    cartDetails={item.cart_details}
                    retailer_accepted_time={item.retailer_confirmation_time}
                    cancellation_time={item.cancelled_time}
                    orderPlacedTime={item.order_placed_time}
                    orderAttemptedTime={item.order_attempted_time}
                    consumerAddress={item.consumer_address}
                    cartValue={item.cart_value}
                    cancellation_return_time={item.cancellation_return_time}
                    orderStatus={item.status}
                    handleClick={this.handleClick}
                    assignedTo={item.assigned_to}
                    assignedToId={item.assigned_to_id}
                    consumerPhone={item.consumer_phone}
                    consumerAddress={item.consumer_address}
                    closestRetailers={item.retailer_list}
                    unavailableProduct={item.unavailable_product}
                    primeRetailer={item.prime_retailer}
                    localityName={item.locality_name}
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
