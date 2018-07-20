import React from 'react'
import moment from 'moment'
import { getIcon, getReadableTimeFormat } from './../utils'
import '@sass/OrdersPage/ProgressDetail.scss'

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

//getProgressDurationInMinutes - Returns the difference of given time in minutes
function getProgressDurationInMinutes(d1, d2) {

  const date1 = new Date(d1);
  const date2 = new Date(d2);
  let millisec, seconds, minutes = 0

  if(d1 && d2) {
      millisec = date2.getTime() - date1.getTime()
      seconds =  millisec / 1000
      minutes = seconds * ( 1/60 )
      minutes = minutes.toFixed(2)
  }

  return minutes;
}

// function getProgressDurationInSeconds(d1, d2) {

//   let date1 = new Date(d1);
//   let date2 = new Date(d2);
//   let millisec, seconds = 0, minutes = 0

//   if(d1 && d2) {
//       millisec = date2.getTime() - date1.getTime()
//       seconds =  millisec / 1000
//       seconds = seconds.toFixed(2);
//   }

//   return seconds;
// }

//getProgressDuration - Returns the time difference between given time
function getProgressDuration(d1, d2) {

  const date1 = new Date(d1);
  const date2 = new Date(d2);
  let millisec, seconds = 0, minutes = 0, hours = 0
  const defaultDuration = '0.00 secs'

  if(d1 && d2) {
      millisec = date2.getTime() - date1.getTime()
      seconds =  millisec / 1000
      minutes = seconds * ( 1/60 )
      hours = minutes / 60

      if(minutes > 60) {
        return `${hours.toFixed(2)} hours`
      } else if(seconds > 60) {
        return `${minutes.toFixed(2)} mins`
      } else if (seconds < 60){
        return `${seconds.toFixed(2)} secs`
      }
  } 
  
  return defaultDuration
}

//getBeforeStyle - Based on the progress duration time, returns the style 
function getBeforeStyle(date1, date2, threshold, orderStatus) {
  
  if(getProgressDurationInMinutes(date1, date2) > threshold) {
    return {
      border : '3px solid #ff3b34',
      // background : '#ff3b34'
    }
  } else if (getProgressDurationInMinutes(date1, date2) === 0 && orderStatus === "force_redeemed") {
    return {
      border : '3px solid #4caf50'
    }
  } else if (getProgressDurationInMinutes(date1, date2) === 0) {
    return {
      border : '3px solid #dfdfdf'
    }
  } else {
    return {
      border : '3px solid #4caf50',
      // background : '#4caf50'
    }
  }
  
}

//getAfterStyle - Based on the progress duration time, returns the style 
function getAfterStyle(date1, date2, threshold, orderStatus) {

  if(getProgressDurationInMinutes(date1, date2) > threshold) {
      return '#ff3b34'
  } else if (getProgressDurationInMinutes(date1, date2) === 0 && orderStatus === "force_redeemed") {
      return '#4caf50'
  } else if (getProgressDurationInMinutes(date1, date2) === 0) {
      return '#dfdfdf'
  } else {
      return '#4caf50'
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

            <div className="progress-bar">

              <div className="progress-bar-container__column">

                <span style={{ border : '3px solid #4caf50' }} className="before"></span>
                <div title="Order Placed" className="progress-bar-container__column--node-title">OP <br/>
                  ({getReadableTimeFormat(data.order_placed_time)})
                </div>
                <span style={
                          { background : getAfterStyle(data.order_placed_time,data.retailer_notified_time, retailerNotificationThreshold, data.order_status) }
                        } 
                      className="after">
                </span>
              
              </div>

              <div className="progress-bar-container__column">

                <span style={ 
                        getBeforeStyle(data.order_placed_time,data.retailer_notified_time, retailerNotificationThreshold, data.order_status) 
                      } 
                      className="before">
                </span>
                <div title="Retailer Notified" className="progress-bar-container__column--node-title">RN <br/> 
                  {
                    data.retailer_notified_time ? `(${getProgressDuration(data.order_placed_time,data.retailer_notified_time)})` : ''
                  }
                </div>
                <span style={
                          { background : getAfterStyle(data.retailer_notified_time, data.retailer_confirmation_time, retailerConfirmationThreshold, data.order_status) }
                        } 
                      className="after">
                </span>
              
              </div>

              <div className="progress-bar-container__column">
                
                <span style={ 
                        getBeforeStyle(data.retailer_notified_time, data.retailer_confirmation_time, retailerConfirmationThreshold, data.order_status) 
                      } 
                      className="before">
                </span>
                <div title="Retailer Confirmed" className="progress-bar-container__column--node-title">RC <br/>
                  {
                    data.retailer_confirmation_time ? `(${getProgressDuration(data.retailer_notified_time, data.retailer_confirmation_time)})` : ''
                  }
                </div>
                <span style={
                              { background : getAfterStyle(data.retailer_confirmation_time, data.dp_notified_time, deliveryNotificationThreshold, data.order_status) }
                            } 
                      className="after">
                </span>
              
              </div>

              <div className="progress-bar-container__column">

                <span style={ 
                        getBeforeStyle(data.retailer_confirmation_time, data.dp_notified_time, deliveryNotificationThreshold, data.order_status) 
                      } 
                      className="before">
                </span>
                <div title="Delivery Person Notified" className="progress-bar-container__column--node-title">DPN <br/>
                  {
                    data.dp_notified_time ? `(${getProgressDuration(data.retailer_confirmation_time, data.dp_notified_time)})` : ''
                  }
                </div>
                <span style={{ background : getAfterStyle(data.dp_notified_time, data.dp_confirmation_time, deliveryConfirmationThreshold, data.order_status) }} className="after"></span>
              
              </div>

              <div className="progress-bar-container__column"> 

                <span style={ 
                        getBeforeStyle(data.dp_notified_time, data.dp_confirmation_time, deliveryConfirmationThreshold, data.order_status) 
                      } 
                      className="before">
                </span>
                <div title="Delivery Person Confirmed" className="progress-bar-container__column--node-title">DPC <br/>
                  {
                    data.dp_confirmation_time ? `(${getProgressDuration(data.dp_notified_time, data.dp_confirmation_time)})` : ''
                  }
                </div>
                <span style={{ background : getAfterStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time, arriveStoreThreshold, data.order_status) }} className="after"></span>
              
              </div>

              <div className="progress-bar-container__column">

                <span style={ 
                        getBeforeStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time, arriveStoreThreshold, data.order_status) 
                      } 
                      className="before">
                </span>
                <div title="Arrived Store Location" className="progress-bar-container__column--node-title">ASL <br/>
                  {
                    data.dp_arrived_at_store_time ? `(${getProgressDuration(data.dp_confirmation_time, data.dp_arrived_at_store_time)})` : ''
                  }
                </div>
                <span style={
                        { background : getAfterStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time, productPickupThreshold, data.order_status) }
                      } 
                      className="after">
                </span>
              
              </div>

              <div className="progress-bar-container__column">

                <span style={ 
                        getBeforeStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time, productPickupThreshold, data.order_status) 
                      } 
                      className="before">
                </span>
                <div title="Pickedup Product" className="progress-bar-container__column--node-title">PP <br/>
                  {
                    data.dp_picked_up_time ? `(${getProgressDuration(data.dp_arrived_at_store_time, data.dp_picked_up_time)})` : ''
                  }
                </div>
                <span style={
                        { background : getAfterStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time, arriveConsumerThreshold, data.order_status) }
                      } 
                      className="after">
                </span>
              
              </div>

              <div className="progress-bar-container__column">

                <span style={ 
                        getBeforeStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time, arriveConsumerThreshold, data.order_status) 
                      } 
                      className="before">
                </span>
                <div title="Arrived Consumer Location" className="progress-bar-container__column--node-title">ACL <br/>
                  {
                    data.dp_reached_to_consumer_time || data.order_status === "force_redeemed" ? `(${getProgressDuration(data.dp_picked_up_time, data.dp_reached_to_consumer_time)})` : ''
                  }
                </div>
                <span style={
                        { background : getAfterStyle(data.dp_reached_to_consumer_time, data.dp_delivered_time, deliverProductThreshold, data.order_status) }
                      } 
                      className="after">
                </span>
              
              </div>

              <div className="progress-bar-container__column">

                <span style={ 
                        getBeforeStyle(data.dp_reached_to_consumer_time, data.dp_delivered_time, deliverProductThreshold, data.order_status)
                      } 
                      className="before">
                </span>
                <div title="Delivered" className="progress-bar-container__column--node-title">DD <br/>
                  {
                    data.dp_delivered_time ? `(${getReadableTimeFormat(data.dp_delivered_time)})` : ''
                  }
                </div>

              </div>
              
            </div>
          </td>
        </tr>
      </React.Fragment>
    )
  }

}


export default HistoryOrdersListItem
