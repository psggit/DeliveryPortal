import React from 'react'
import Moment from 'moment'

const SearchOrdersListItem = ({ data, handleClick }) => {
  return (
    <tr className='orders-list-item' onClick={(e) => {handleClick(data.order_id, e)} }>
      <td>{ data.order_id }</td>
      <td>{ data.status }</td>
      <td>{ data.consumer_id }</td>
      <td>{ data.consumer_name }</td>
      <td>{ data.consumer_phone }</td>
      <td>{ data.dp_name }</td>
      <td>{ data.assigned_to_id }</td>
      <td>{ Moment(data.order_placed_time).format('MMM Do YY, h:mm a') }</td>
    </tr>
  )
}


export default SearchOrdersListItem
