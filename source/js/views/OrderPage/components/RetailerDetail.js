import React, { Component } from 'react'
import { getIcon } from './../utils'

class RetailerDetail extends Component {
  render() {
    const { isOrderConfirmed, ordersType, retailer } = this.props
    return (
      <div className='retailer detail-card'>
        <h4>Retailer</h4>
             <div>
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
             </div>
      </div>
    )
  }
}

export default RetailerDetail
