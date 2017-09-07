import React, { Component } from 'react'
import { getIcon } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'

class DelivererDetail extends Component {
  constructor() {
    super()
    this.handleSkipDeliverer = this.handleSkipDeliverer.bind(this)
    this.openSkipDeliverer = this.openSkipDeliverer.bind(this)
    this.handleConfirmDeliverer = this.handleConfirmDeliverer.bind(this)
    this.openConfirmDeliverer = this.openConfirmDeliverer.bind(this)
  }
  openSkipDeliverer() {
    mountModal(ConfirmModal({
      heading: 'Skip deliverer',
      confirmMessage: 'Are you sure you want to skip the deliverer?',
      handleConfirm: this.handleSkipDeliverer
    }))
  }

  openConfirmDeliverer() {
    mountModal(ConfirmModal({
      heading: 'Confirm deliverer',
      confirmMessage: 'Are you sure you want to confirm the deliverer?',
      handleConfirm: this.handleConfirmDeliverer
    }))
  }

  handleConfirmDeliverer() {
    const { deliverer, actions } = this.props
    
    actions.confirmDeliverer({
      retailer_id: deliverer.id
    })
  }
  handleSkipDeliverer() {
    const { orderId, actions, deliverer, ordersType } = this.props

    actions.skipDeliverer({
      order_id: orderId,
    })
    
    unMountModal()
    actions.fetchOrderDetail(orderId)
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
        {
          ordersType !== 'history'
          ? (
            <div className='card-footer'>
              <button onClick={this.openSkipDeliverer}>Skip</button>
              <button onClick={this.openConfirmDeliverer}>Confirm</button>
            </div>
          )
          : ''
        }
      </div>
    )
  }
}

export default DelivererDetail
