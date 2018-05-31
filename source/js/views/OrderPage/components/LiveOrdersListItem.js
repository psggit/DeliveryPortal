import React from 'react'
import moment from 'moment'
function getTimeDiff(d2) {
  const d1 = new Date()
  return Math.round(
    (d1 - new Date(d2)) / 60000
  )
}

function Moment(time) {
  return {
    format: function(format) {
      return moment(time).format('MMM Do YY, h:mm a')
    }
  }
}

const LiveOrdersListItem = ({ data, handleClick }) => {
  const {retailer_notified_time} = data
  const {dp_delivered_time } = data
  const {retailer_accepted_time} = data
  const {cancellation_time} = data
  const {cancellation_return_time} = data
  const {dp_reached_to_consumer_time} = data
  const {dp_arrived_at_store_time} = data
  const {dp_accepted_time} = data
  const {dp_notified_time} = data
  const {dp_picked_up_time} = data
  const { dp_confirmation_time } = data

  const orderStatusArr = data.status.split('::')
  const status = orderStatusArr[0]
  const time = eval(orderStatusArr[1])
  const article = orderStatusArr[2]
  const orderStatus = `${status}${time}${article}`
  
  return (
    <tr className='orders-list-item' onClick={(e) => {handleClick(data.order_id, e)} }>
      <td>{ data.order_id }</td>
      <td>{ orderStatus }</td>
      <td>{ data.consumer_id }</td>
      <td>{ data.consumer_name }</td>
      <td>{ data.dp_name }</td>
      <td>{ data.assigned_to_id }</td>
      <td>{ moment(data.order_placed_time).format('MMM Do YY, h:mm a') }</td>
    </tr>
  )
}


export default LiveOrdersListItem
