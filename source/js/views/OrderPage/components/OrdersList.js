import React, { Component } from 'react'
import OrderListItem from './OrderListItem'
import '@sass/OrdersPage/OrdersList.scss'

class OrdersList extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.ordersType !== this.props.ordersType) {
      this.props.unmountOrderDetail()
      // TODO: fetch orders list and filters (if required) based on ordersType (assigned, history etc.)
    }
  }
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
    const { ordersType } = this.props
    const loadingOrdersList = true
    const orders = [
      {
        id: 1,
        customer: {
          name: 'John'
        }
      },
      {
        id: 2,
        customer: {
          name: 'John'
        }
      },
      {
        id: 3,
        customer: {
          name: 'John'
        }
      },
      {
        id: 4,
        customer: {
          name: 'John'
        }
      },
      {
        id: 5,
        customer: {
          name: 'John'
        }
      },
      {
        id: 6,
        customer: {
          name: 'John'
        }
      }
    ]
    return (
      <div className='orders-list' onClick={this.handleClick}>
        {
          loadingOrdersList
          ? (
            orders.map((item, i) => {
              return <OrderListItem
                key={item.id}
                order={item}
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
