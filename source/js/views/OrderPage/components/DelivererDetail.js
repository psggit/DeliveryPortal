import React, { Component } from 'react'
import { getIcon } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ShowNotified from './showNotified'

class DelivererDetail extends Component {
  constructor() {
    super()
    this.showNotified = this.showNotified.bind(this)
  }
  showNotified() {
    const { notifiedDeliverers } = this.props
    mountModal(ShowNotified({
      heading: 'Notified deliverers',
      content: notifiedDeliverers
    }))
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
          <button>Skip</button>
          <button>Confirm</button>
          <button onClick={this.showNotified}>Show notified deliverers</button>
        </div>
            {/* <div>
              <div className='personal-info'>
                <p className='name'>{deliverer.name}</p>
                <p className='address'>
                  H.No.191, Rua de Ourém, Fontainhas, Altinho, Patto Centre, Panjim, Goa 403001
                </p>
                <div className='chips'>
                  { getIcon('retailer_confirmed') }
                </div>
                <p className='phone'>09857189185</p>
                <p className='order-status'>Awaiting for customer to handover</p>
              </div>
              <hr />
              <div>
                <button className='btn btn-red'>Cancel</button>
                <button
                  className='btn btn-green'
                  disabled={isOrderConfirmed}
                  onClick={this.openAssignOrderModal}>
                  { isOrderConfirmed ? 'Confirmed' : 'Confirm' }
                </button>
              </div>
            </div> */}
      </div>
    )
  }
}

export default DelivererDetail
