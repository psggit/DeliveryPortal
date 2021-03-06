import React, { Component, Fragment } from 'react'
import { getIcon, getHasuraId } from './../utils'
import { validateNumType, checkCtrlA } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import '@sass/components/_spinner.scss'
import showCatalogue from './ShowCatalogue'

class Order extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleForceRedeem = this.handleForceRedeem.bind(this)
    this.handleCancelOrder = this.handleCancelOrder.bind(this)
    this.openCancelOrder = this.openCancelOrder.bind(this)
    this.validateForceRedeem = this.validateForceRedeem.bind(this)
    this.showCatalogue = this.showCatalogue.bind(this)
    this.increaseProductQuantity = this.increaseProductQuantity.bind(this)
    this.decreaseProductQuantity = this.decreaseProductQuantity.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)

    this.state = {
      forceRedeemKey: 0,
      canChangeQuantity: true
    }
  }

  handleChange(e) {
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
    unMountModal()
  }

  openCancelOrder() {
    const { order } = this.props
    mountModal(ConfirmModal({
      heading: `Cancel order (#${order.id})`,
      confirmMessage: 'Are you sure you want to cancel this order?',
      handleConfirm: this.handleCancelOrder,
    }))
  }

  handleCancelOrder() {
    const { actions, order, unmountOrderDetail } = this.props
    actions.cancelOrder({ order_id: order.id })
    unMountModal()
    unmountOrderDetail()
  }

  increaseProductQuantity(item) {
    const { actions, order } = this.props
    mountModal(ConfirmModal({
      heading: 'Add item to cart',
      confirmMessage: 'Are you sure you want to add this product?',
      handleConfirm: () => {
        this.setState({ canChangeQuantity: false })
        actions.addItemToCart({
          delivery_order_id: order.id,
          product_id: item.id ? item.id : item.product_id,
          type : item.type
        }, this.callbackUpdate)
        unMountModal()
      }
    }))
  }

  callbackUpdate() {
    this.setState({ canChangeQuantity: true })
  }

  decreaseProductQuantity(id, type) {
    const { actions, order } = this.props

    mountModal(ConfirmModal({
      heading: 'Delete item from cart',
      confirmMessage: 'Are you sure you want to delete this product?',
      handleConfirm: () => {
        this.setState({ canChangeQuantity: false })
        actions.deleteItemFromCart({
          delivery_order_id: order.id,
          product_id: id,
          type
        }, this.callbackUpdate)
        unMountModal()
      }
    }))
  }

  showCatalogue() {
    const { order, actions, gps } = this.props
    mountModal(showCatalogue({
      heading: 'Browse catalogue',
      gps,
      id: order.id,
      addItemToCart: this.increaseProductQuantity
    }))
  }

  render() {
    const {
      ordersType,
      openAssignOrderModal,
      order,
      isOrderAssigned,
      actions
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
          <p className='subhead'>Ordered items ({ order.cartItems.length })</p>

          {
            ordersType !== 'history' && this.props.canAccess('action-buttons') &&
            <button
              onClick={this.showCatalogue}
              title="Show catalogue"
              style={{
                float: 'right',
                cursor: 'pointer',
                padding: '2px 20px'
              }}>
              Add Item
            </button>
          }
          <hr />
          <table>
            <thead>
              <tr>
                <td>Brand</td>
                <td>Volume</td>
                <td>Price</td>
                <td>Quantity</td>
              </tr>
            </thead>
            <tbody>
              {
                order.cartItems.map((item, i) => {
                  return (
                    <tr key={item.product_id}>
                      <td>{item.brand_name}</td>
                      <td>{`${item.total_volume} ml`}</td>
                      <td>{`INR ${item.total_price}`}</td>
                      <td style={{ width: '80px' }}>
                        {
                          this.state.canChangeQuantity
                          ? (
                            <Fragment>
                              {
                                ordersType !== 'history' && this.props.canAccess('action-buttons') &&
                                <span
                                  onClick={() => { this.decreaseProductQuantity(item.product_id, item.type) }}
                                  style={{
                                    cursor: 'pointer'
                                  }}>
                                  {getIcon('minus')}
                                </span>
                              }

                              <span
                                style={{
                                  display: 'inline-block',
                                  verticalAlign: 'top',
                                  padding: '0 10px' }}>
                                  {item.count}
                              </span>

                              {
                                ordersType !== 'history' && this.props.canAccess('action-buttons') &&
                                <span
                                  onClick={() => { this.increaseProductQuantity(item) }}
                                  style={{
                                    cursor: 'pointer'
                                  }}>{
                                    getIcon('plus')}
                                </span>
                              }
                            </Fragment>
                          )
                          : <div className='rolling-loader'></div>
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {
            order.deliveryFee
            ? <p
              style={{fontStyle: 'italic',
              color: '#ff3b34',
              marginTop: '10px'}}>
              Delivery fee: {order.deliveryFee}
            </p>
            : ''
          }
        </div>

        {
          ordersType !== 'history' && this.props.canAccess('action-buttons')
          ? (
            <div className='card-footer'>
              <button className='btn btn-green' onClick={openAssignOrderModal}>Assign to me</button>
              <button className='btn btn-red' onClick={this.openCancelOrder}>Cancel order</button>
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
                    <button className='btn btn-blue' onClick={this.validateForceRedeem}>
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
