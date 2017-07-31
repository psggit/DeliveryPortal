import React, { Component } from 'react'
import { getIcon } from './../utils'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import { mountModal, unMountModal } from '@components/ModalBox/utils'

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
    window.open(`/orders/${1}`, '_blank')
  }

  openAssignOrderModal(e) {
    // e.target.className = ''
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
    const deliveryCharge = 'INR 30'
    const { ordersType, currentOrderId, order } = this.props
    const assignedTo = order.get('assignedTo')
    const isOrderConfirmed = false
    const isOrderAssigned = assignedTo === currentOrderId

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

              <div className='order detail-card'>
                <h4>Consumer</h4>
                <div className='personal-info'>
                  <p className='name'>John Carter</p>
                  <p className='address'>
                    H.No.191, Rua de Ourém, Fontainhas, Altinho, Patto Centre, Panjim, Goa 403001
                  </p>
                  <div className='chips'>
                    { getIcon('kyc_confirmed') }
                    { getIcon('delivery_verified') }
                  </div>
                  <p className='phone'>09857189185</p>
                  <p className='order-status'>
                    Awaiting retailer confirmation for
                    { ' 54 mins.' }
                  </p>
                </div>

                <div className='order-info'>
                  <p><b>Items (4)</b></p>
                  <ul>
                    {
                      [1, 2, 3, 4].map((item, i) => {
                        return (
                          <li>
                            <span>[2] Jack Daniels - 180ml</span>
                            <span>INR 750</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                  {
                    deliveryCharge
                    ? (
                      <p className='delivery-charge'>
                        Delievery fee: <span>{deliveryCharge}</span>
                      </p>
                    )
                    : ''
                  }
                </div>

                <hr />
                {
                  ordersType !== 'history'
                  ? (
                    <div>
                      <button className='btn btn-blue'>Skip order</button>
                      <button
                        className='btn btn-green'
                        disabled={isOrderAssigned}
                        onClick={this.openAssignOrderModal}>
                        { isOrderAssigned ? 'Assigned' : 'Assign me' }
                      </button>
                    </div>
                  )
                  : ''
                }
              </div>


              <div className='retailer detail-card'>
                <h4>Retailer</h4>
                <div className='personal-info'>
                  <p className='name'>Khal drogo</p>
                  <p className='address'>
                    H.No.191, Rua de Ourém, Fontainhas, Altinho, Patto Centre, Panjim, Goa 403001
                  </p>
                  <div className='chips'>
                    { getIcon('retailer_confirmed') }
                  </div>
                  <p className='phone'>09857189185</p>
                  <p className='order-status'>Awaiting deliverer confirmation</p>
                </div>
                <hr />
                {
                  ordersType !== 'history'
                  ? (
                    <div>
                      <button className='btn btn-red'>Cancel</button>
                      <button
                        className='btn btn-green'
                        disabled={isOrderConfirmed}
                        onClick={this.openAssignOrderModal}>
                        { isOrderConfirmed ? 'Confirmed' : 'Confirm' }
                      </button>
                    </div>
                  )
                  : ''
                }
              </div>


              <div className='deliverer detail-card'>
                <h4>Deliverer</h4>
                <div className='personal-info'>
                  <p className='name'>Khal drogo</p>
                  {/* <p className='address'>
                    H.No.191, Rua de Ourém, Fontainhas, Altinho, Patto Centre, Panjim, Goa 403001
                  </p> */}
                  <div className='chips'>
                    { getIcon('retailer_confirmed') }
                  </div>
                  <p className='phone'>09857189185</p>
                  <p className='order-status'>Awaiting for customer to handover</p>
                </div>
                <hr />
                {
                  ordersType !== 'history'
                  ? (
                    <div>
                      <button className='btn btn-red'>Cancel</button>
                      <button
                        className='btn btn-green'
                        disabled={isOrderConfirmed}
                        onClick={this.openAssignOrderModal}>
                        { isOrderConfirmed ? 'Confirmed' : 'Confirm' }
                      </button>
                    </div>
                  )
                  : ''
                }
              </div>

              {
                ordersType !== 'history'
                ? <button
                  style={trackBtnStyle}
                  onClick={this.openGmap}
                  className='btn btn-black btn-lg'>
                  Track the order
                </button>
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
