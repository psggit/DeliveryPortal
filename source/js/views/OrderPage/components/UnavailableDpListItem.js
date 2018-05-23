import React from 'react'
import Moment from 'moment'

const UnavailableDpListItem = ({ data }) => {
  return (
    <tr className='orders-list-item' onClick={(e) => {this.props.handleClick(data.order_id, e)} }>
      <td>{ data.dp_id }</td>
      <td>{ data.order_status }</td>
      <td>{ data.dp_name }</td>
      <td style={{ textAlign: 'center' }}>{ data.contact_number }</td>
      <td>{ data.locality_name }</td>
      <td>{ data.order_id }</td>
      <td style={{ textAlign: 'center' }}>{ Moment(data.order_placed_time).format('MMM Do YY, h:mm a') }</td>
    </tr>
  )
}


export default UnavailableDpListItem
