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
    const {
      isOrderAssigned,
      deliveryCharge,
      ordersType,
      openAssignOrderModal,
      customer
    } = this.props

    const isKYCconfirmed = true
    const isDeliveryVerified = true

    const DigitInput = styled.input`
      height: 32px;
      width: 80px;
      padding: 0 20px;
      border-style: none;
      margin-right: 10px;
      border: 1px solid #D0D0D0;
      &:focus {
        outline: 0;
      }
    `

    return (
      <div className='card'>
        <div className='card-head'>
          <h4>Consumer</h4>
          { customer.isAgeVerified ? getIcon('kyc_confirmed') : '' }
        </div>
        <div className='card-body'>
          <p>
            <span><b>Name: </b></span>
            <span>{customer.name}</span>
          </p>
          <p>
            <span><b>Phone: </b></span>
            <span>{'0987655698'}</span>
          </p>
          <p className='subhead'>Address:</p>
          <p>{customer.address}</p>
        </div>
        {/* <h4>Consumer</h4>
        <div className='personal-info'>
          <p className='name'>{customer.name}</p>
          <p className='address'>
            {customer.address}
          </p>
          <div className='chips'>
            { customer.isAgeVerified ? getIcon('kyc_confirmed') : '' }
            { isDeliveryVerified ? getIcon('delivery_verified') : '' }
          </div>
          {customer.phone ? <p className='phone'>{customer.phone}</p> : ''}
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
              maxLength='4'
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
        </div> */}
      </div>
    )
  }
}

export default ConsumerDetail
