import React, { Component } from 'react'
import { getIcon } from './../utils'

class ConsumerDetail extends Component {
  render() {
    const { isOrderAssigned, deliveryCharge, ordersType, openAssignOrderModal } = this.props
    return (
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
                  <li key={`alco-item-${i}`}>
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
                onClick={openAssignOrderModal}>
                { isOrderAssigned ? 'Assigned' : 'Assign me' }
              </button>
            </div>
          )
          : ''
        }
      </div>
    )
  }
}

export default ConsumerDetail
