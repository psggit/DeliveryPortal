import React, { Component } from 'react'
import { getIcon } from './../utils'

class RetailerDetail extends Component {
  render() {
    const { isOrderConfirmed, ordersType } = this.props
    return (
      <div className='retailer detail-card'>
        <h4>Retailer</h4>
             <div>
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
      </div>
    )
  }
}

export default RetailerDetail
