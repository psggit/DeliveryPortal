import React from 'react'
import moment from 'moment'
import { getHasuraRole } from './../utils'
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

function  getProgressDurationInMinutes(d1, d2) {

  let date1 = new Date(d1);
  let date2 = new Date(d2);
  let millisec, seconds, minutes = 0

  if(d1 && d2) {
      millisec = date2.getTime() - date1.getTime()
      seconds =  millisec / 1000
      minutes = seconds * ( 1/60 )
      minutes = minutes.toFixed(2)
  }

  return minutes;
}

function getProgressDurationInSeconds(d1, d2) {

  let date1 = new Date(d1);
  let date2 = new Date(d2);
  let millisec, seconds = 0, minutes = 0

  if(d1 && d2) {
      millisec = date2.getTime() - date1.getTime()
      seconds =  millisec / 1000
      seconds = seconds.toFixed(2);
  }

  return seconds;
}


class LiveOrdersListItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showProgressBar : false
    }
    this.toggleProgressBar = this.toggleProgressBar.bind(this)
    this.totalDuration = 0;
  }

  resetTotalDuration() {
    this.totalDuration = 0;
  }
  
  getBeforeStyle(date1, date2, threshold) {
    
    this.totalDuration += parseFloat(getProgressDurationInMinutes(date1, date2))
   
    if(getProgressDurationInMinutes(date1, date2) > threshold) {
      return {
        border : '3px solid red',
        background : 'red'
      }
    } else if (getProgressDurationInMinutes(date1, date2) === 0) {
      return {
        border : '3px solid grey'
      }
    } else {
      return {
        border : '3px solid green',
        background : 'green'
      }
    }
  
  }
  
  getAfterStyle(date1, date2, threshold) {
  
    if(getProgressDurationInMinutes(date1, date2) > threshold) {
        return 'red'
    } else if (getProgressDurationInMinutes(date1, date2) === 0) {
        return 'grey'
    } else {
        return 'green'
    }
  
  }
  
  getTotalDuration() {
  
    return this.totalDuration.toFixed(2);
    
  }

  toggleProgressBar(e) {
    e.stopPropagation()
    const {showProgressBar} = this.state;
    this.setState({ showProgressBar : !showProgressBar})
  }

  render() {
    const { data, handleClick, handleOrderAssign, handleShowNotes } = this.props
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

    let orderPlacedWaitingTime = null
    if (data.order_placed_time) {
      orderPlacedWaitingTime = getTimeDiff(data.order_placed_time)
    }

    let statusStyle = { fontStyle: 'italic' }
    if (cancellation_time) {
      statusStyle = {
        color: time >= 5 && !cancellation_time && getHasuraRole() !== 'excise_person' ? '#ff3b34' : ''
      }
    }

    //defining threshold (2 mins)
    const retailerNotificationThreshold = 2;
    const retailerConfirmationThreshold = 2;
    const deliveryNotificationThreshold = 2;
    const deliveryConfirmationThreshold = 2;
    const arriveStoreThreshold = 2;
    const productPickupThreshold = 2;
    const arriveConsumerThreshold = 2;
    const deliverProductThreshold = 2;


    return (
      <React.Fragment>
        <tr className='orders-list-item' onClick={ (e) => {handleClick(data.order_id, e)} }>
          <td>
              <span
                className='orders-list-item__info'
                onClick={(e) => {this.toggleProgressBar(e)} }>
                { getIcon('down-arrow') }
              </span>
          </td>
          <td
            className={
              orderPlacedWaitingTime >= 60 && getHasuraRole() !== 'excise_person'
              ? 'danger'
              : ''
            }
          >
            { data.order_id }
          </td>
          <td style={statusStyle}>{ orderStatus }</td>
          <td>{ data.consumer_id }</td>
          <td>{ data.consumer_name }</td>
          <td>{ data.consumer_phone }</td>
          <td>{ data.dp_name }</td>
          <td>{ data.assigned_to_id }</td>
          <td>{ moment(data.order_placed_time).format('MMM Do YY, h:mm a') }</td>
          <td><button onClick={(e) => { handleOrderAssign(data.order_id, e)}} style={{ fontSize: '12px', padding: '5px 10px', borderRadius: '4px' }}>Assign</button></td>
          <td><button onClick={(e) => { handleShowNotes(e, data.order_id) }} style={{ fontSize: '12px', padding: '5px 10px', borderRadius: '4px' }}>Notes</button></td>
        </tr>
        <tr className={`progress-bar-container ${showProgressBar ? 'active' : ''}`} >
          <td colspan="11">
            <div title="Total Duration" class={`total-duration ${showProgressBar ? 'show' : ''}`}> 
                
                  Total Duration : { this.getTotalDuration() } mins
                
            </div>
            <div class="progress-bar">
              <div className="progress-bar-container__column">   
                <span style={{ border : '3px solid green', background : 'green' }} className="before">{this.resetTotalDuration()}</span>
                <div title="Order Placed" className="progress-bar-container__column--node-title">OP <br/>({getReadableTimeFormat(data.order_placed_time)})</div>
                <span style={{ background : this.getAfterStyle(data.order_placed_time, data.retailer_notified_time, retailerNotificationThreshold) }} className="after"></span>
              </div>
              <div className="progress-bar-container__column">
                <span style={ this.getBeforeStyle(data.order_placed_time, data.retailer_notified_time, retailerNotificationThreshold) } className="before"></span>
                <div title="Retailer Notified" className="progress-bar-container__column--node-title">RN <br/> 
                  {
                    data.retailer_notified_time ? `(${getProgressDurationInSeconds(data.order_placed_time, data.retailer_notified_time)} secs)` : ''
                  }
                </div>
                <span style={{ background : this.getAfterStyle(data.retailer_notified_time, data.retailer_confirmation_time, retailerConfirmationThreshold) }} className="after"></span>
              </div>
              <div className="progress-bar-container__column">
                <span style={ this.getBeforeStyle(data.retailer_notified_time, data.retailer_confirmation_time, retailerConfirmationThreshold) } className="before"></span>
                <div title="Retailer Confirmed" className="progress-bar-container__column--node-title">RC <br/>
                  {
                    data.retailer_confirmation_time ? `(${getProgressDurationInSeconds(data.retailer_notified_time, data.retailer_confirmation_time)} secs)` : ''
                  }
                </div>
                <span style={{ background : this.getAfterStyle(data.retailer_confirmation_time, data.dp_notified_time, deliveryNotificationThreshold) }} className="after"></span>
              </div>
              <div className="progress-bar-container__column">
                <span style={ this.getBeforeStyle(data.retailer_confirmation_time, data.dp_notified_time, deliveryNotificationThreshold) } className="before"></span>
                <div title="Delivery Person Notified" className="progress-bar-container__column--node-title">DPN <br/>
                  {
                    data.dp_notified_time ? `(${getProgressDurationInSeconds(data.retailer_confirmation_time, data.dp_notified_time)} secs)` : ''
                  }
                </div>
                <span style={{ background : this.getAfterStyle(data.dp_notified_time, data.dp_confirmation_time, deliveryConfirmationThreshold) }} className="after"></span>
              </div>
              <div className="progress-bar-container__column"> 
                <span style={ this.getBeforeStyle(data.dp_notified_time, data.dp_confirmation_time, deliveryConfirmationThreshold) } className="before"></span>
                <div title="Delivery Person Confirmed" className="progress-bar-container__column--node-title">DPC <br/>
                  {
                    data.dp_confirmation_time ? `(${getProgressDurationInSeconds(data.dp_notified_time, data.dp_confirmation_time)} secs)` : ''
                  }
                </div>
                <span style={{ background : this.getAfterStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time, arriveStoreThreshold) }} className="after"></span>
              </div>
              <div className="progress-bar-container__column">
                <span style={ this.getBeforeStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time, arriveStoreThreshold) } className="before"></span>
                <div title="Arrived Store Location" className="progress-bar-container__column--node-title">ASL <br/>
                  {
                    data.dp_arrived_at_store_time ? `(${getProgressDurationInSeconds(data.dp_confirmation_time, data.dp_arrived_at_store_time)} secs)` : ''
                  }
                </div>
                <span style={{ background : this.getAfterStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time, productPickupThreshold) }} className="after"></span>
              </div>
              <div className="progress-bar-container__column">
                <span style={ this.getBeforeStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time, productPickupThreshold) } className="before"></span>
                <div title="Pickedup Product" className="progress-bar-container__column--node-title">PP <br/>
                  {
                    data.dp_picked_up_time ? `(${getProgressDurationInSeconds(data.dp_arrived_at_store_time, data.dp_picked_up_time)} secs)` : ''
                  }
                </div>
                <span style={{ background : this.getAfterStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time, arriveConsumerThreshold) }} className="after"></span>
              </div>
              <div className="progress-bar-container__column">
                  <span style={ this.getBeforeStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time, arriveConsumerThreshold) } className="before"></span>
                  <div title="Arrived Consumer Location" className="progress-bar-container__column--node-title">ACL <br/>
                    {
                      data.dp_reached_to_consumer_time ? `(${getProgressDurationInSeconds(data.dp_picked_up_time, data.dp_reached_to_consumer_time)} secs)` : ''
                    }
                  </div>
                  <span style={{ background : this.getAfterStyle(data.dp_reached_to_consumer_time, data.dp_delivered_time, deliverProductThreshold) }} className="after"></span>
              </div>
              <div className="progress-bar-container__column">
                <span style={ this.getBeforeStyle(data.dp_reached_to_consumer_time, data.dp_delivered_time, deliverProductThreshold) }  className="before"></span>
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


export default LiveOrdersListItem
