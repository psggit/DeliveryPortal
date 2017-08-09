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
  handleClick(e) {
    const target = e.target
    const orderId = target.id
    if (target.className === 'orders-list-item') {
      this.props.mountOrderDetail(parseInt(orderId))
    }
  }
  render() {
    const { orders, titleMap, articleMap, timeMap, epilogueMap, state } = this.props
    const loadingOrdersList = true
    const orderStatus = `${titleMap[state]}${articleMap[state]}${timeMap[state]}${epilogueMap[state]}`

    return (
      <div className='orders-list' onClick={this.handleClick}>
        {
          loadingOrdersList
          ? (
            orders.map((item, i) => {
              return <OrderListItem
                key={item.id}
                order={item}
                orderStatus={orderStatus}
              />
            })
          )
          : <div className='loader'></div>
        }
      </div>
    )
  }
}

export default OrdersList
