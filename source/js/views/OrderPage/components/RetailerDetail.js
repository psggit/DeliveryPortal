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
    const { retailer, actions, orderId } = this.props

    actions.confirmRetailer({
      retailer_id: retailer.id,
      delivery_order_id: orderId
    }, )
    unMountModal()
    actions.setLoading('loadingOrderDetail')
    // actions.fetchOrderDetail(orderId)
  }
  handleSkipRetailer() {
    const { orderId, actions, retailer, orders } = this.props

    actions.skipRetailer({
      order_id: orderId,
      retailer_id: retailer.id
    })

    unMountModal()
    actions.setLoading('loadingOrderDetail')
    // actions.fetchOrderDetail(orderId)
  }
  render() {
    const { isOrderConfirmed, ordersType, retailer, dpConfirmationTime } = this.props
    return (
      <div className='card'>
        <div className='card-head'>
          <h4>Retailer</h4>
          { retailer.confirmationTime ? getIcon('confirmed') : '' }
        </div>
        <div className='card-body'>
          <p>
            <span><b>Name: </b></span>
            <span>{retailer.name}</span>
          </p>
          {
            retailer.phone
            ? <p>
                <span><b>Phone: </b></span>
                <span>{retailer.phone}</span>
              </p>
            : ''
          }
        </div>
        {
          ordersType !== 'history' && this.props.canAccess('action-buttons')
          ? (
            <div className='card-footer'>
              <button className='btn btn-red' onClick={this.openSkipRetailer}>Skip</button>
              { !retailer.confirmationTime ? <button className='btn btn-green' onClick={this.openConfirmRetailer}>Confirm</button> : '' }
            </div>
          )
          : ''
        }
      </div>
    )
  }
}

export default RetailerDetail
