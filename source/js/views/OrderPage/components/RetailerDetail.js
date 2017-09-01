import React, { Component } from 'react'
import { getIcon } from './../utils'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ShowNotified from './showNotified'

class RetailerDetail extends Component {
  constructor() {
    super()
    this.showNotified = this.showNotified.bind(this)
  }
  showNotified() {
    const { notifiedRetailers } = this.props
    mountModal(ShowNotified({
      heading: 'Notified retailers',
      content: notifiedRetailers
    }))
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
          <button>Skip</button>
          <button>Confirm</button>
          <button onClick={this.showNotified}>Show notified retailers</button>
        </div>
             {/* <div>
               <div className='personal-info'>
                 <p className='name'>{retailer.name}</p>
                 <p className='address'>
                   {retailer.address}
                 </p>
                 <div className='chips'>
                   { getIcon('retailer_confirmed') }
                 </div>
                 <p className='phone'>{retailer.phone}</p>
                 <p className='order-status'>Awaiting deliverer confirmation</p>
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

export default RetailerDetail
