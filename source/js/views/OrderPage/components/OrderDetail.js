import React, { Component } from 'react'
import { getIcon } from './../utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConsumerDetail from './ConsumerDetail'
import RetailerDetail from './RetailerDetail'
import DelivererDetail from './DelivererDetail'

class OrderDetail extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.openAssignOrderModal = this.openAssignOrderModal.bind(this)
    this.handleConfirmAssign = this.handleConfirmAssign.bind(this)
  }

  handleClick() {
    this.props.unmountOrderDetail()
  }

  openGmap() {
    window.open(`/orders/track/${1}`, '_blank')
  }

  openAssignOrderModal(e) {
    mountModal(ConfirmModal({
      confirmMessage: 'Are your sure you want to assign this order?',
      handleConfirmAssign: this.handleConfirmAssign
    }))
  }

  handleConfirmAssign(id) {
    const { dispatch, currentOrderId, actions } = this.props
    dispatch(actions.assignOrder(currentOrderId))
    unMountModal()
  }

  componentDidMount() {
    // console.log(confirmModal());
  }

  render() {
    const itemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px'
    }

    const trackBtnStyle = {
      display: 'block',
      margin: '0 auto'
    }

    const loadingOrderDetail = true
    const { retailer } = this.props
    const delivererStatus = 'confirmed'
    const deliveryCharge = 'INR 30'
    const { ordersType, currentOrderId, order } = this.props
    const isOrderConfirmed = false
    const isOrderAssigned = order.assignedTo === currentOrderId

    return (
      <div className='order-detail'>
        <span
          className='return-to-list'
          onClick={this.handleClick}>
          { getIcon('back') }
        </span>

        {
          loadingOrderDetail
          ? (
            <div>
              <h4>Order detail: {`#${currentOrderId}`}</h4>

              <ConsumerDetail
                isOrderAssigned={isOrderAssigned}
                deliveryCharge={deliveryCharge}
                openAssignOrderModal={this.openAssignOrderModal}
              />

              <RetailerDetail
                isOrderConfirmed={isOrderConfirmed}
              />

              <DelivererDetail
                isOrderConfirmed={isOrderConfirmed}
               />
               <button
                 style={trackBtnStyle}
                 onClick={this.openGmap}
                 className='btn btn-black btn-lg'>
                 Track the order
               </button>
            </div>
          )
          : <div className='loader'></div>
        }

      </div>
    )
  }
}

export default OrderDetail
