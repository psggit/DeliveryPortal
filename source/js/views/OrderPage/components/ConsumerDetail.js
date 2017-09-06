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
      </div>
    )
  }
}

export default ConsumerDetail
