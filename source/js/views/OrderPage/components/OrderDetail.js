import React, { Component } from 'react'
import { getIcon } from './../utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ShowNotifiedRetailers from './ShowNotifiedRetailers'
import ShowNotifiedDeliverers from './ShowNotifiedDeliverers'
import Order from './Order'
import ConsumerDetail from './ConsumerDetail'
import RetailerDetail from './RetailerDetail'
import DelivererDetail from './DelivererDetail'
import ShowGmap from './ShowGmap'
import moment from 'moment'
import { getHasuraId } from './../utils'
import '@sass/OrdersPage/OrderDetail.scss'

function getTimeDiff(d2) {
  const d1 = new Date()
  return Math.round(
    (d1 - new Date(d2)) / 60000
  )
}
function Moment(time) {
  return {
    format: function(format) {
      return moment(time).format('MMM Do YY, h:mm a')
    }
  }
}


class OrderDetail extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.openAssignOrderModal = this.openAssignOrderModal.bind(this)
    this.handleConfirmAssign = this.handleConfirmAssign.bind(this)
    this.openGmap = this.openGmap.bind(this)
    this.showNotifiedDeliverers = this.showNotifiedDeliverers.bind(this)
    this.showNotifiedRetailers = this.showNotifiedRetailers.bind(this)
  }

  handleClick() {
    this.props.unmountOrderDetail()
  }

  openGmap() {
    const { order, retailer, deliverer, customer } = this.props
    mountModal(ShowGmap({
      id: order.id,
      retailer,
      deliverer,
      customer
    }))
  }

  showNotifiedRetailers(e) {
    const { order } = this.props
    mountModal(ShowNotifiedRetailers({
      heading: 'Notified retailers',
      content: order.retailers
    }))
  }

  showNotifiedDeliverers(e) {
    const { order } = this.props
    mountModal(ShowNotifiedDeliverers({
      heading: 'Notified deliverers',
      content: order.deliverers
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
      support_id: getHasuraId(),
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
    const supportId = getHasuraId()
    const isOrderAssigned = supportId == order.assignedToId

    const { actions } = this.props

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
          {/* <div style={{marginLeft: '20px'}}> */}
            {
              deliverer.confirmationTime && ordersType !== 'history' && this.props.canAccess('map')
              ? <button
                  style={trackBtnStyle}
                  onClick={this.openGmap}
                  className=''>
                  Track this order
                </button>
              : '' 
            }
            {
              order.retailers.length
              ? <button id='show-retailers' style={{marginLeft: '20px'}} onClick={this.showNotifiedRetailers}>Show notified retailers</button>
              : ''
            }
            {
              order.deliverers.length
              ? <button id='show-deliverers' style={{marginLeft: '20px'}} onClick={this.showNotifiedDeliverers}>Show notified deliverers</button>
              : ''
            }
            {/* </div> */}
        </div>
        {/* <hr /> */}

        {
          !loadingOrderDetail
          ? (
            <div className='order-detail-container'>
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
                      canAccess={this.props.canAccess} 
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
                      canAccess={this.props.canAccess} 
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
                      canAccess={this.props.canAccess}
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
            </div>
          )
          : <div className='loader'></div>
        }

      </div>
    )
  }
}

export default OrderDetail
