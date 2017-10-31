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
        </div>
        <div className='card-body'>
          {
            customer.id
            ? <p>
                <span><b>ID: </b></span>
                <span>{customer.id}</span>
              </p>
            : ''  
          }
          {
            customer.name
            ? <p>
                <span><b>Name: </b></span>
                <span>{customer.name}</span>
              </p>
            : ''  
          }
          {
            customer.phone
            ? <p>
                <span><b>Phone: </b></span>
                <span>{customer.phone}</span>
              </p>
            : ''  
          }
          {
            customer.flatNo
            ? <p>
                <span><b>Flat no: </b></span>
                <span>{customer.flatNo}</span>
              </p>
            : ''  
          }
          {
            customer.landmark
            ? <p>
                <span><b>Landmark: </b></span>
                <span>{customer.landmark}</span>
              </p>
            : ''  
          }
          <p className='subhead'>Address:</p>
          <p>{customer.address}</p>
        </div>
      </div>
    )
  }
}

export default ConsumerDetail
