import React, { Component } from 'react'
import { getIcon } from './../utils'
import styled from 'styled-components'
import { validateNumType, checkCtrlA } from './../utils'

class ConsumerDetail extends Component {
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
    const { isOrderAssigned, deliveryCharge, ordersType, openAssignOrderModal } = this.props
    const isKYCconfirmed = true
    const isDeliveryVerified = true

    const DigitInput = styled.input`
      height: 32px;
      width: 32px;
      border-style: none;
      margin-right: 10px;
      border: 1px solid #D0D0D0;
      border-radius: 6px;	background-color: #F7F7F7;
      box-shadow: inset 0 2px 2px 0 rgba(188,188,188,0.5);
      text-align: center;
      &:focus {
        outline: 0;
      }
    `

    return (
      <div className='order detail-card'>
        <h4>Consumer</h4>
        <div className='personal-info'>
          <p className='name'>John Carter</p>
          <p className='address'>
            H.No.191, Rua de Ourém, Fontainhas, Altinho, Patto Centre, Panjim, Goa 403001
          </p>
          <div className='chips'>
            { isKYCconfirmed ? getIcon('kyc_confirmed') : '' }
            { isDeliveryVerified ? getIcon('delivery_verified') : '' }
          </div>
          <p className='phone'>09857189185</p>
          <p className='order-status'>
            Awaiting retailer confirmation for
            { ' 54 mins.' }
          </p>
        </div>

        <div className='order-info'>
          <p><b>Items (4)</b></p>
          <ul>
            {
              [1, 2, 3, 4].map((item, i) => {
                return (
                  <li key={`alco-item-${i}`}>
                    <span>[2] Jack Daniels - 180ml</span>
                    <span>INR 750</span>
                  </li>
                )
              })
            }
          </ul>
          {
            deliveryCharge
            ? (
              <p className='delivery-charge'>
                Delievery fee: <span>{deliveryCharge}</span>
              </p>
            )
            : ''
          }
          <div>
            <DigitInput
              maxLength='1'
              onKeyDown={this.handleChange}
            />
            <DigitInput
              maxLength='1'
              onKeyDown={this.handleChange}
            />
            <DigitInput
              maxLength='1'
              onKeyDown={this.handleChange}
            />
            <DigitInput
              maxLength='1'
              onKeyDown={this.handleChange}
            />
            <button
              onClick={this.handleForceRedeem}
              className='btn btn-black'>
              Force redeem
            </button>
          </div>
        </div>

        <hr />
        <div>
          <button className='btn btn-blue'>Skip order</button>
          <button
            className='btn btn-green'
            disabled={isOrderAssigned}
            onClick={openAssignOrderModal}>
            { isOrderAssigned ? 'Assigned' : 'Assign me' }
          </button>
        </div>
      </div>
    )
  }
}

export default ConsumerDetail
