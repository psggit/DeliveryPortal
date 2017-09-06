import React, { Component } from 'react'
import OrderListItem from './OrderListItem'
import '@sass/OrdersPage/OrdersList.scss'

class OrdersList extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.ordersType !== this.props.ordersType) {
  //     this.props.unmountOrderDetail()
  //     // TODO: fetch orders list and filters (if required) based on ordersType (assigned, history etc.)
  //   }
  // }
  componentDidMount() {

  }
  handleClick(orderId) {
    this.props.mountOrderDetail(parseInt(orderId))
  }
  render() {
    const { orders, state, loadingOrdersList } = this.props
    // const orderStatus = `${titleMap[state]}${articleMap[state]}${timeMap[state]}${epilogueMap[state]}`

    return (
      <table className='orders-list'>
        <thead>
          <tr>
            <td>Order Id</td>
            <td>Order status</td>
            <td>Consumer Id</td>
            <td>Consumer name</td>
            <td>Consumer phone</td>
            <td>Assigned to</td>
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
                    key={`order-list-item-${i}`}
                    id={item.order_id}
                    consumerName={item.consumer_name}
                    consumerId={item.consumer_id}
                    retailer_notified_time={item.retailer_notified_time}
                    dp_delivered_time={item.dp_delivered_time}
                    dp_reached_to_consumer_time={item.dp_reached_to_consumer_time}
                    retailer_accepted_time={item.retailer_confirmation_time}
                    cancellation_time={item.cancellation_time}
                    orderPlacedTime={item.order_placed_time}
                    cancellation_return_time={item.cancellation_return_time}
                    orderStatus={item.status}
                    handleClick={this.handleClick}
                    assignedTo={item.assigned_to}
                    consumerPhone={item.consumer_phone}
                />
                )
              })
            )
            : <tr className='loader'></tr>
          }
        </tbody>
      </table>
    )
  }
}

export default OrdersList
