import React from 'react'
import Moment from 'moment'

const AttemptedOrdersListItem = ({ data }) => {
  return (
    <tr style={{ cursor: 'auto' }} className='orders-list-item'>
      <td style={{ color: '#4a4a4a', textDecoration: 'unset', cursor: 'auto' }}>{ data.cart_value }</td>
      <td>{ data.consumer_id }</td>
      <td>{ data.consumer_name }</td>
      <td>{ data.consumer_phone }</td>
      <td>{ data.consumer_address }</td>
      <td>{ data.reason }</td>
      <td>{ data.cart_details }</td>
      <td>{ data.retailer_list}</td>
      <td>{ data.unavailable_product }</td>
      <td>{ data.prime_retailer }</td>
      <td>{ data.locality_name }</td>
      <td>{ Moment(data.order_attempted_time).format('MMM Do YY, h:mm a') }</td>
    </tr>
  )
}


export default AttemptedOrdersListItem
