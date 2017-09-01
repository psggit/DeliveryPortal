import React, { Component } from 'react'
import { getIcon } from './../utils'
import styled from 'styled-components'
import { validateNumType, checkCtrlA } from './../utils'

class Order extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleForceRedeem = this.handleForceRedeem.bind(this)
  }

  handleChange(e) {
    if (!(validateNumType(e.keyCode) || checkCtrlA(e))) {
      e.preventDefault()
    }
  }

  handleForceRedeem() {
    const { actions } = this.props
    actions.forceRedeem()
  }

  render() {
    const {
      isOrderAssigned,
      ordersType,
      openAssignOrderModal,
      order
    } = this.props

    const isKYCconfirmed = true
    const isDeliveryVerified = true

    const DigitInput = styled.input`
      height: 30px;
      width: 80px;
      padding: 0 20px;
      border-style: none;
      margin-right: 10px;
      vertical-align: middle;
      border: 1px solid #D0D0D0;
      &:focus {
        outline: 0;
      }
    `

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

        <div className='card-footer'>
          <button disabled={isOrderAssigned} onClick={openAssignOrderModal}>Assign to me</button>
          <button>Cancel order</button>
          <div style={{float: 'right'}}>
            <DigitInput
              maxLength='4'
              onKeyDown={this.handleChange}
            />
            <button
              onClick={this.handleForceRedeem}
              >
              Force redeem
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Order
