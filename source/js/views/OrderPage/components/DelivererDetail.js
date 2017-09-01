import React, { Component } from 'react'
import { getIcon } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ShowNotified from './showNotified'
import ConfirmModal from '@components/ModalBox/ConfirmModal'

class DelivererDetail extends Component {
  constructor() {
    super()
    this.showNotified = this.showNotified.bind(this)
    this.handleSkipDeliverer = this.handleSkipDeliverer.bind(this)
    this.openSkipDeliverer = this.openSkipDeliverer.bind(this)
  }
  showNotified() {
    const { notifiedDeliverers } = this.props
    mountModal(ShowNotified({
      heading: 'Notified deliverers',
      content: notifiedDeliverers
    }))
  }
  openSkipDeliverer() {
    mountModal(ConfirmModal({
      heading: 'Skip deliverer',
      confirmMessage: 'Are you sure you want to skip the deliverer?',
      handleConfirm: this.handleSkipDeliverer
    }))
  }
  handleSkipDeliverer() {
    const { orderId, actions } = this.props
    actions.skipDeliverer(orderId)
  }
  render() {
    const { isOrderConfirmed, ordersType, deliverer } = this.props
    return (
      <div className='card'>
        <div className='card-head'>
          <h4>Deliverer</h4>
        </div>
        <div className='card-body'>
          <p>
            <span><b>Name: </b></span>
            <span>{deliverer.name}</span>
          </p>
          <p>
            <span><b>Phone: </b></span>
            <span>{deliverer.phone}</span>
          </p>
        </div>
        <div className='card-footer'>
          <button onClick={this.openSkipDeliverer}>Skip</button>
          <button>Confirm</button>
          <button onClick={this.showNotified}>Show notified deliverers</button>
        </div>
      </div>
    )
  }
}

export default DelivererDetail
