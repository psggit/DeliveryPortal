import React from 'react'
import moment from 'moment'
import { getHasuraRole } from './../utils'
import { getIcon } from './../utils'
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

function getProgressDuration(d1, d2) {

  let date1 = new Date(d1);
  let date2 = new Date(d2);
  let millisec, seconds, minutes = 0

  if(d1 && d2) {
      millisec = date2.getTime() - date1.getTime()
      seconds =  millisec / 1000
      minutes = seconds * ( 1/60 )
  }

  return minutes;
}

function getBeforeStyle(date1, date2) {

  if(getProgressDuration(date1, date2) > 60) {
    return {
      border : '3px solid red',
      background : 'red'
    }
  } else if (getProgressDuration(date1, date2) === 0) {
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

function getAfterStyle(date1, date2) {

  if(getProgressDuration(date1, date2) > 60) {
      return 'red'
  } else if (getProgressDuration(date1, date2) === 0) {
      return 'grey'
  } else {
      return 'green'
  }

}

class LiveOrdersListItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showProgressBar : false
    }
    this.toggleProgressBar = this.toggleProgressBar.bind(this)
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
              <div class="progress-bar">
                  <div className="progress-bar-container__column">
                      <span style={{ border : '3px solid green', background : 'green'}} className="before" ></span>
                      <div title="Order Placed" className="progress-bar-container__column--node-title">OP</div>
                      <span style={{ background : getAfterStyle(data.order_placed_time,data.retailer_notified_time) }} className="after"></span>
                  </div>
                  <div className="progress-bar-container__column">
                      <span style={ getBeforeStyle(data.order_placed_time,data.retailer_notified_time) } className="before"></span>
                      <div title="Retailer Notified" className="progress-bar-container__column--node-title">RN</div>
                      <span style={{ background : getAfterStyle(data.retailer_notified_time, data.retailer_confirmation_time) }} className="after"></span>
                  </div>
                  <div className="progress-bar-container__column">
                      <span style={ getBeforeStyle(data.retailer_notified_time, data.retailer_confirmation_time) } className="before"></span>
                      <div title="Retailer Confirmed" className="progress-bar-container__column--node-title">RC</div>
                      <span style={{ background : getAfterStyle(data.retailer_confirmation_time, data.dp_notified_time) }} className="after"></span>
                  </div>
                  <div className="progress-bar-container__column">
                      <span style={ getBeforeStyle(data.retailer_confirmation_time, data.dp_notified_time) } className="before"></span>
                      <div title="Delivery Person Notified" className="progress-bar-container__column--node-title">DPN</div>
                      <span style={{ background : getAfterStyle(data.dp_notified_time, data.dp_confirmation_time) }} className="after"></span>
                  </div>
                  <div className="progress-bar-container__column">
                      <span style={ getBeforeStyle(data.dp_notified_time, data.dp_confirmation_time) } className="before"></span>
                      <div title="Delivery Person Confirmed" className="progress-bar-container__column--node-title">DPC</div>
                      <span style={{ background : getAfterStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time) }} className="after"></span>
                  </div>
                  <div className="progress-bar-container__column">
                      <span style={ getBeforeStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time) } className="before"></span>
                      <div title="Arrived Store Location" className="progress-bar-container__column--node-title">ASL</div>
                      <span style={{ background : getAfterStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time) }} className="after"></span>
                  </div>
                  <div className="progress-bar-container__column">
                      <span style={ getBeforeStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time) } className="before"></span>
                      <div title="Pickedup Product" className="progress-bar-container__column--node-title">PP</div>
                      <span style={{ background : getAfterStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time) }} className="after"></span>
                  </div>
                  <div className="progress-bar-container__column">
                      <span style={ getBeforeStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time) } className="before"></span>
                      <div title="Arrived Consumer Location" className="progress-bar-container__column--node-title">ACL</div>
                      <span style={{ background : getAfterStyle(data.dp_reached_to_consumer_time, data.dp_delivered_time) }} className="after"></span>
                  </div>
                  <div className="progress-bar-container__column">
                      <span style={ getBeforeStyle(data.dp_delivered_time, null) } className="before"></span>
                      <div title="Delivered" className="progress-bar-container__column--node-title">DD</div>
                  </div>
                </div>
              </td>
        </tr>
      </React.Fragment>
    )
  }

}


export default LiveOrdersListItem
