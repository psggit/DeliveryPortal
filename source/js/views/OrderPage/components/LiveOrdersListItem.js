import React from 'react'
import moment from 'moment'
import { getHasuraRole } from './../utils'
import { getIcon } from './../utils'
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

//getTotalDuration - Return the time intervel between order placed time and current time
function getTotalDuration(orderPlacedTime) {

  let millisec, seconds = 0, minutes = 0, hours = 0
  const defaultDuration = '0.00 secs'

  const date1 = new Date(orderPlacedTime);
  const date2 = new Date();

  if(date1 && date2) {

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

class LiveOrdersListItem extends React.Component {

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
          <td onClick={(e) => {this.toggleProgressBar(e)} }>
              <span
                className={`orders-list-item__info ${showProgressBar ? 'rotate-icon' : ''}`}
              >
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
          <td colSpan="11">

            <div title="Total Duration" className={`total-duration ${showProgressBar ? 'show' : ''}`}> 
                
                  Total Duration : { getTotalDuration(data.order_placed_time) } 
                
            </div>
            
            <ProgressBar data={data}></ProgressBar>
          
          </td>
        </tr>
      </React.Fragment>
    )
  }

}


export default LiveOrdersListItem
