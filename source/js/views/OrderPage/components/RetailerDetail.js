import React, { Component } from 'react'
import { getIcon } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ShowNotified from './showNotified'
import ConfirmModal from '@components/ModalBox/ConfirmModal'

class RetailerDetail extends Component {
  constructor() {
    super()
    this.showNotified = this.showNotified.bind(this)
    this.handleSkipRetailer = this.handleSkipRetailer.bind(this)
    this.openSkipRetailer = this.openSkipRetailer.bind(this)
  }
  showNotified() {
    const { notifiedRetailers } = this.props
    mountModal(ShowNotified({
      heading: 'Notified retailers',
      content: notifiedRetailers
    }))
  }
  openSkipRetailer() {
    mountModal(ConfirmModal({
      heading: 'Skip retailer',
      confirmMessage: 'Are you sure you want to skip the retailer?',
      handleConfirm: this.handleSkipRetailer
    }))
  }
  handleSkipRetailer() {
    const { orderId, actions } = this.props
    actions.skipRetailer(orderId)
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
        <div className='card-footer'>
          <button onClick={this.openSkipRetailer}>Skip</button>
          <button>Confirm</button>
          <button onClick={this.showNotified}>Show notified retailers</button>
        </div>
      </div>
    )
  }
}

export default RetailerDetail
