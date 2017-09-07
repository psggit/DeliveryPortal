import React, { Component } from 'react'
import { getIcon } from './../utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ShowNotified from './showNotified'
import Order from './Order'
import ConsumerDetail from './ConsumerDetail'
import RetailerDetail from './RetailerDetail'
import DelivererDetail from './DelivererDetail'
import Gmap from './Gmap'
import '@sass/OrdersPage/OrderDetail.scss'

function getTimeDiff(d2) {
  const d1 = new Date()
  return Math.round(
    (d1 - new Date(d2)) / 60000
  )
}

class OrderDetail extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.openAssignOrderModal = this.openAssignOrderModal.bind(this)
    this.handleConfirmAssign = this.handleConfirmAssign.bind(this)
    this.openGmap = this.openGmap.bind(this)
    this.showNotified = this.showNotified.bind(this)
    this.state = {
      shouldOpenGmap: false
    }
  }

  handleClick() {
    this.props.unmountOrderDetail()
  }

  openGmap() {
    const { shouldOpenGmap } = this.state
    this.setState({ shouldOpenGmap: !shouldOpenGmap })
  }

  showNotified(e) {
    const { order } = this.props
    mountModal(ShowNotified({
      heading: e.target.id === 'show-retailers'? 'Notified retailers' : 'Notified deliverers',
      content: e.target.id === 'show-retailers' ? order.retailers : order.deliverers
    }))
  }

  openAssignOrderModal() {
    mountModal(ConfirmModal({
      heading: 'Assign order',
      confirmMessage: 'Are your sure you want to assign this order?',
      handleConfirm: this.handleConfirmAssign
    }))
  }

  handleConfirmAssign(id) {
    const { currentOrderId, actions } = this.props
    const postData = {
      support_id: 1,
      order_id: currentOrderId
    }
    actions.assignOrder(postData)
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
      marginLeft: '20px'
    }

    const delivererStatus = 'confirmed'
    const {
      ordersType,
      currentOrderId,
      order,
      customer, 
      deliverer,
      retailer,
      loadingOrderDetail
    } = this.props

    const isOrderConfirmed = false
    const supportId = 1
    const isOrderAssigned = supportId == order.assignedToId

    const { actions } = this.props
    const { shouldOpenGmap } = this.state

    // if (order) {
      const orderChar = order.status.split('::')[0]
      const formula = order.status.split('::')[1]
      const article = order.status.split('::')[2]
  
      const dp_delivered_time = order.deliveredTime
      const dp_reached_to_consumer_time = deliverer.reachedToConsumerTime
      const cancellation_time = order.cancellationTime
      const orderPlacedTime = order.orderPlacedTime
      const cancellation_return_time = order.cancellationReturnTime
      const dp_picked_up_time = order.pickedUpTime
      const dp_notified_time = deliverer.notifiedTime
      const dp_arrived_at_store_time = deliverer.arrivedAtStoreTime
      const dp_accepted_time = deliverer.acceptedTime
    // }

    // if (retailer) {
      const retailer_accepted_time = retailer.confirmationTime
      const retailer_notified_time = retailer.notifiedTime
    // }

    return (
      <div className='order-detail'>
        <div className='order-detail-head'>
          <span
            className='return-to-list'
            onClick={this.handleClick}>
            { getIcon('back') }
          </span>
          <span style={{color: '#4a4a4a', fontSize: '18px', marginRight: '20px'}}>Order Id: <b>{`#${currentOrderId}`}</b></span>
          <span style={{color: '#4a4a4a', fontStyle: 'italic', fontSize: '16px'}}>
          {
            order && retailer
            ? `${orderChar} ${eval(formula) ? eval(formula) : ''} ${article ? article : ''}`
            : ''
          }
          </span>
          <div style={{marginLeft: '20px'}}>
            {
              deliverer.confirmationTime && ordersType !== 'history'
              ? <button
                  style={trackBtnStyle}
                  onClick={this.openGmap}
                  className=''>
                  { shouldOpenGmap ? 'Close Map' : 'Track this order' }
                </button>
              : '' 
            }
            {
              order.retailers.length
              ? <button id='show-retailers' style={{marginLeft: '20px'}} onClick={this.showNotified}>Show notified retailers</button>
              : ''
            }
            {
              order.deliverers.length
              ? <button id='show-deliverers' style={{marginLeft: '20px'}} onClick={this.showNotified}>Show notified deliverers</button>
              : ''
            }
            </div>
        </div>
        {/* <hr /> */}

        {
          !loadingOrderDetail
          ? (
            <div className='container'>
              <div className='left'>
                {
                  order
                  ? <Order
                      canAccess={this.props.canAccess} 
                      order={order}
                      actions={actions}
                      openAssignOrderModal={this.openAssignOrderModal}
                      isOrderAssigned={isOrderAssigned}
                      ordersType={ordersType}
                      unmountOrderDetail={this.props.unmountOrderDetail}
                    />
                  : ''
                }
              </div>
              <div className='right'>
                {
                  customer && this.props.canAccess('consumer')
                  ? <ConsumerDetail
                      ordersType={ordersType}
                      customer={customer}
                      actions={actions}
                      isOrderAssigned={isOrderAssigned}
                      openAssignOrderModal={this.openAssignOrderModal}
                    />
                  : ''
                }
  
                {
                  retailer.id && this.props.canAccess('retailer')
                  ? <RetailerDetail
                      ordersType={ordersType}
                      actions={actions}
                      notifiedRetailers={order.retailers}
                      retailer={retailer}
                      isOrderConfirmed={isOrderConfirmed}
                      orderId={order.id}
                    />
                  : ''  
                }
                {
                  deliverer.id && this.props.canAccess('deliverer')
                  ? <DelivererDetail
                      ordersType={ordersType}
                      actions={actions}                      
                      notifiedDeliverers={order.deliverers}
                      deliverer={deliverer}
                      isOrderConfirmed={isOrderConfirmed}
                      orderId={order.id}
                    />
                  : ''
                }
                
              </div>
              {
                shouldOpenGmap
                ? <Gmap
                  orderId={order.id}
                  customer={customer}
                  deliverer={deliverer}
                  retailer={retailer}
                />
                : ''
              }
            </div>
          )
          : <div className='loader'></div>
        }

      </div>
    )
  }
}

export default OrderDetail
