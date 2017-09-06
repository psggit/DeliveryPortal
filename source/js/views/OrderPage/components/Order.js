import React, { Component } from 'react'
import { getIcon } from './../utils'
import { validateNumType, checkCtrlA } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
// import Notify from '@components/Notification'

class Order extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleForceRedeem = this.handleForceRedeem.bind(this)
    this.handleCancelOrder = this.handleCancelOrder.bind(this)
    this.openCancelOrder = this.openCancelOrder.bind(this)
    this.validateForceRedeem = this.validateForceRedeem.bind(this)
    this.state = {
      forceRedeemKey: 0
    }
  }

  handleChange(e) {
    console.log(e.target.value)
    if (validateNumType(e.keyCode) || checkCtrlA(e)) {
      this.setState({ forceRedeemKey: parseInt(e.target.value) })
    } else {
      e.preventDefault()
    }
  }

  validateForceRedeem() {
    const { forceRedeemKey } = this.state
    // console.log(forceRedeemKey.toString())
    if (forceRedeemKey.toString().length === 4) {
      mountModal(ConfirmModal({
        heading: 'Force redeem',
        confirmMessage: 'Are you sure you want to force redeem this order?',
        handleConfirm: this.handleForceRedeem,
      }))
    }
  }

  handleForceRedeem() {
    const { actions, order } = this.props
    const { forceRedeemKey } = this.state
    actions.forceRedeem({ order_id: order.id,  last_four_digits: forceRedeemKey })
  }

  openCancelOrder() {
    const { order } = this.props
    mountModal(ConfirmModal({
      heading: `Cancel order #${order.id}`,
      confirmMessage: 'Are you sure you want to cancel this order?',
      handleConfirm: this.handleCancelOrder,
    }))
  }

  handleCancelOrder() {{
    const { actions, order, unmountOrderDetail } = this.props
    actions.cancelOrder({ order_id: order.id })
    unMountModal()
    unmountOrderDetail()
  }}

  render() {
    const {
      isOrderAssigned,
      ordersType,
      openAssignOrderModal,
      order
    } = this.props

    const isKYCconfirmed = true
    const isDeliveryVerified = true

    const DigitInput = {
      height: '30px',
      width: '80px',
      padding: '0 20px',
      borderStyle: 'none',
      marginRight: '10px',
      verticalAlign: 'middle',
      border: '1px solid #D0D0D0'
    }

    return (
      <div className='card'>
        <div className='card-head'>
          <h4>Order</h4>
        </div>
        <div className='card-body'>
          <p className='subhead'>Ordered items (4)</p>
          <table>
            <thead>
              <tr>
                <td>Brand</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {
                order.cartItems.map((item, i) => {
                  return (
                    <tr key={item.product_id}>
                      <td>{item.brand_name}</td>
                      <td>{item.total_volume}</td>
                      <td>{item.total_price}</td>
                      <td>{item.count}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <p
            style={{fontStyle: 'italic',
            color: '#ff3b34',
            marginTop: '10px'}}>
            Delivery fee: {order.deliveryFee}
          </p>
        </div>

        {
          ordersType !== 'history'
          ? (
            <div className='card-footer'>
              <button disabled={isOrderAssigned} onClick={openAssignOrderModal}>Assign to me</button>
              <button onClick={this.openCancelOrder}>Cancel order</button>
              {
                this.props.canAccess('force-redeem')
                ? (
                  <div style={{float: 'right'}}>
                    <input
                      style={DigitInput}
                      maxLength='4'
                      onKeyDown={this.handleChange}
                      onKeyUp={this.handleChange}
                    />
                    <button onClick={this.validateForceRedeem}>
                      Force redeem
                    </button>
                  </div>
                )
                : ''
              }
            </div>
          )
          : ''
        }
      </div>
    )
  }
}

export default Order
