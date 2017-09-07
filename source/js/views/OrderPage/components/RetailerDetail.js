import React, { Component } from 'react'
import { getIcon } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'

class RetailerDetail extends Component {
  constructor() {
    super()
    this.handleSkipRetailer = this.handleSkipRetailer.bind(this)
    this.openSkipRetailer = this.openSkipRetailer.bind(this)
    this.handleConfirmRetailer = this.handleConfirmRetailer.bind(this)
    this.openConfirmRetailer = this.openConfirmRetailer.bind(this)
  }
  openSkipRetailer() {
    mountModal(ConfirmModal({
      heading: 'Skip retailer',
      confirmMessage: 'Are you sure you want to skip the retailer?',
      handleConfirm: this.handleSkipRetailer
    }))
  }
  openConfirmRetailer() {
    mountModal(ConfirmModal({
      heading: 'Confirm retailer',
      confirmMessage: 'Are you sure you want to confirm the retailer?',
      handleConfirm: this.handleConfirmRetailer
    }))
  }
  handleConfirmRetailer() {
    const { retailer, actions } = this.props

    actions.confirmRetailer({
      retailer_id: retailer.id
    })
  }
  handleSkipRetailer() {
    const { orderId, actions, retailer, orders } = this.props

    actions.skipRetailer({
      order_id: orderId,
      retailer_id: retailer.id
    })
    
    unMountModal()
    actions.fetchOrderDetail(orderId)
  }
  render() {
    const { isOrderConfirmed, ordersType, retailer } = this.props
    return (
      <div className='card'>
        <div className='card-head'>
          <h4>Retailer</h4>
        </div>
        <div className='card-body'>
          <p>
            <span><b>Name: </b></span>
            <span>{retailer.name}</span>
          </p>
          <p>
            <span><b>Phone: </b></span>
            <span>{retailer.phone}</span>
          </p>
        </div>
        {
          ordersType !== 'history'
          ? (
            <div className='card-footer'>
              <button onClick={this.openSkipRetailer}>Skip</button>
              <button onClick={this.openConfirmRetailer}>Confirm</button>
            </div>
          )
          : ''
        }
      </div>
    )
  }
}

export default RetailerDetail
