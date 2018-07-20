import React from 'react'
import moment from 'moment'
import { getIcon, getReadableTimeFormat } from './../utils'
import '@sass/OrdersPage/ProgressDetail.scss'
import ProgressBar from './progressBar'

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

//getTotalDuration - Based on the order status returns the time intervel between given time
function getTotalDuration(orderPlacedTime, orderDeliveredTime, orderCancelledTime) {

  let millisec, seconds = 0, minutes = 0, hours = 0
  const defaultDuration = '0.00 secs'

  if(orderPlacedTime && orderDeliveredTime) {

    const date1 = new Date(orderPlacedTime);
    const date2 = new Date(orderDeliveredTime);
    millisec = date2.getTime() - date1.getTime()
    seconds =  millisec / 1000
    minutes = seconds * ( 1/60 )
    hours = minutes / 60

  } else if(orderPlacedTime && orderCancelledTime) {

    const date1 = new Date(orderPlacedTime);
    const date2 = new Date(orderCancelledTime);
   
    millisec = date2.getTime() - date1.getTime()
    seconds =  millisec / 1000
    minutes = seconds * ( 1/60 )
    hours = minutes / 60

  }

  if(minutes > 60) {
    return `${hours.toFixed(2)} hours`
  } else if(seconds > 60) {
    return `${minutes.toFixed(2)} mins`
  } else if (seconds < 60){
    return `${seconds.toFixed(2)} secs`
  }

  return defaultDuration
}


// const HistoryOrdersListItem = ({ data, handleClick }) => {
//   const {retailer_notified_time} = data
//   const {dp_delivered_time } = data
//   const {retailer_accepted_time} = data
//   const {cancellation_time} = data
//   const {cancelled_time} = data
//   const {cancellation_return_time} = data
//   const {dp_reached_to_consumer_time} = data
//   const {dp_arrived_at_store_time} = data
//   const {dp_accepted_time} = data
//   const {dp_notified_time} = data
//   const {dp_picked_up_time} = data
//   const { dp_confirmation_time } = data

//   const orderStatusArr = data.status ? data.status.split('::') : ''
//   const status = orderStatusArr[0] || ''
//   const time = eval(orderStatusArr[1]) || ''
//   const article = orderStatusArr[2] || ''
//   const orderStatus = `${status}${time}${article}`
//   return (
//     <tr className='orders-list-item' onClick={(e) => {handleClick(data.order_id, e)} }>
//       <td>{ data.order_id }</td>
//       <td>{ orderStatus }</td>
//       <td>{ data.consumer_id }</td>
//       <td>{ data.consumer_name }</td>
//       <td>{ data.consumer_phone }</td>
//       <td>{ data.dp_name }</td>
//       <td>{ data.assigned_to_id }</td>
//       <td>{ moment(data.order_placed_time).format('MMM Do YY, h:mm a') }</td>
//     </tr>
//   )
// }

class HistoryOrdersListItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showProgressBar : false
    }
    this.toggleProgressBar = this.toggleProgressBar.bind(this)
  }

  //toggleProgressBar - toggles the progress bar on click
  toggleProgressBar(e) {
    e.stopPropagation()
    const {showProgressBar} = this.state;
    this.setState({ showProgressBar : !showProgressBar});
  }

  render() {
    const { data, handleClick } = this.props
    const { showProgressBar } = this.state

    const {retailer_notified_time} = data
    const {dp_delivered_time } = data
    const {retailer_accepted_time} = data
    const {cancellation_time} = data
    const {cancelled_time} = data
    const {cancellation_return_time} = data
    const {dp_reached_to_consumer_time} = data
    const {dp_arrived_at_store_time} = data
    const {dp_accepted_time} = data
    const {dp_notified_time} = data
    const {dp_picked_up_time} = data
    const { dp_confirmation_time } = data
  
    const orderStatusArr = data.status ? data.status.split('::') : ''
    const status = orderStatusArr[0] || ''
    const time = eval(orderStatusArr[1]) || ''
    const article = orderStatusArr[2] || ''
    const orderStatus = `${status}${time}${article}`
   

    //defining threshold (in mins)
    const retailerNotificationThreshold = 2;
    const retailerConfirmationThreshold = 5;
    const deliveryNotificationThreshold = 2;
    const deliveryConfirmationThreshold = 5;
    const arriveStoreThreshold = 2;
    const productPickupThreshold = 15;
    const arriveConsumerThreshold = 2;
    const deliverProductThreshold = 30;


    return (
      <React.Fragment>
        <tr className='orders-list-item' onClick={(e) => {handleClick(data.order_id, e)} }>
          <td onClick={(e) => {this.toggleProgressBar(e)} }>
            <span
              className={`orders-list-item__info ${showProgressBar ? 'rotate-icon' : ''}`}
            >
              { getIcon('down-arrow') }
            </span>
          </td>
          <td>{ data.order_id }</td>
          <td>{ orderStatus }</td>
          <td>{ data.consumer_id }</td>
          <td>{ data.consumer_name }</td>
          <td>{ data.consumer_phone }</td>
          <td>{ data.dp_name }</td>
          <td>{ data.assigned_to_id }</td>
          <td>{ moment(data.order_placed_time).format('MMM Do YY, h:mm a') }</td>
          <td></td>
          <td></td>
        </tr>
        <tr className={`progress-bar-container ${showProgressBar ? 'active' : ''}`} >
          <td colSpan="11">

            <div title="Total Duration" className={`total-duration ${showProgressBar ? 'show' : ''}`}> 
      
              Total Duration : { data.order_status === "cancelled" ? getTotalDuration(data.order_placed_time, data.dp_delivered_time, data.cancelled_time) : getTotalDuration(data.order_placed_time, data.dp_delivered_time, null) } 
              
            </div>

            <ProgressBar data={data}></ProgressBar>
            
          </td>
        </tr>
      </React.Fragment>
    )
  }

}


export default HistoryOrdersListItem
