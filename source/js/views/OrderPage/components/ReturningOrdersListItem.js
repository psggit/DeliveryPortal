import React from 'react'
import Moment from 'moment'

const UnavailableDpListItem = ({ data, handleClick, handleRestock }) => {
  return (
    <tr className='orders-list-item' onClick={(e) => {handleClick(data.order_id, e)} }>
      <td>{ data.dp_id }</td>
      <td style={{ textAlign: 'center' }}>{ data.status }</td>
      <td>{ data.order_id }</td>
      <td><button onClick={(e) => { handleRestock(data.order_id, data.dp_id)}}>Re-stock</button></td>
      {/* <td style={{ textAlign: 'center' }}>{ Moment(data.order_placed_time).format('MMM Do YY, h:mm a') }</td> */}
    </tr>
  )
}


export default UnavailableDpListItem
