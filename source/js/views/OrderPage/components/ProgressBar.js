import React from 'react'
import { getIcon } from './../utils'
import '@sass/OrdersPage/ProgressDetail.scss'

function getTimeDiff(d1, d2) {

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

const ProgressBar = ({handleClick, data}) => {

    function getBeforeStyle(date1, date2) {

        if(getTimeDiff(date1, date2) > 60) {
            return '3px solid red'
        } else if (getTimeDiff(date1, date2) === 0) {
            return '3px solid grey'
        } else {
            return '3px solid green'
        }
        
    }

    function getAfterStyle(date1, date2) {

        if(getTimeDiff(date1, date2) > 60) {
            return 'red'
        } else if (getTimeDiff(date1, date2) === 0) {
            return 'grey'
        } else {
            return 'green'
        }

    }

    return (
        <tr className="progress-bar-container" >
            <td> 
                <span
                    className='progress-bar-container__info'
                    onClick={(e) => {handleClick(e, data.order_id)} }>
                    { getIcon('back') }
                </span>
            </td>
            <td className="progress-bar-container__column">
                <span style={{ border : '3px solid green'}} className="before" ></span>
                <div title="Order Placed" className="progress-bar-container__column--node-title">OP</div>
                <span style={{ background : getAfterStyle(data.order_placed_time,data.retailer_notified_time) }} className="after"></span>
            </td>
            <td className="progress-bar-container__column">
                <span style={{ border : getBeforeStyle(data.order_placed_time,data.retailer_notified_time) }} className="before"></span>
                <div title="Retailer Nofified" className="progress-bar-container__column--node-title">RN</div>
                <span style={{ background : getAfterStyle(data.retailer_notified_time, data.retailer_confirmation_time) }} className="after"></span>
            </td>
            <td className="progress-bar-container__column">
                <span style={{ border : getBeforeStyle(data.retailer_notified_time, data.retailer_confirmation_time) }} className="before"></span>
                <div title="Retailer Confirmed" className="progress-bar-container__column--node-title">RC</div>
                <span style={{ background : getAfterStyle(data.retailer_confirmation_time, data.dp_notified_time) }} className="after"></span>
            </td>
            <td className="progress-bar-container__column">
                <span style={{ border : getBeforeStyle(data.retailer_confirmation_time, data.dp_notified_time) }} className="before"></span>
                <div title="Delivery Person Notified" className="progress-bar-container__column--node-title">DPN</div>
                <span style={{ background : getAfterStyle(data.dp_notified_time, data.dp_confirmation_time) }} className="after"></span>
            </td>
            <td className="progress-bar-container__column"> 
                <span style={{ border : getBeforeStyle(data.dp_notified_time, data.dp_confirmation_time) }} className="before"></span>
                <div title="Delivery Person Confirmed" className="progress-bar-container__column--node-title">DPC</div>
                <span style={{ background : getAfterStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time) }} className="after"></span>
            </td>
            <td className="progress-bar-container__column">
                <span style={{ border : getBeforeStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time) }} className="before"></span>
                <div title="Arrived Store Location" className="progress-bar-container__column--node-title">ASL</div>
                <span style={{ background : getAfterStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time) }} className="after"></span>
            </td>
            <td className="progress-bar-container__column">
                <span style={{ border : getBeforeStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time) }} className="before"></span>
                <div title="Pickedup Product" className="progress-bar-container__column--node-title">PP</div>
                <span style={{ background : getAfterStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time) }} className="after"></span>
            </td>
            <td className="progress-bar-container__column">
                <span style={{ border : getBeforeStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time) }} className="before"></span>
                <div title="Arrived Consumer Location" className="progress-bar-container__column--node-title">ACL</div>
                <span style={{ background : getAfterStyle(data.dp_reached_to_consumer_time, data.dp_delivered_time) }} className="after"></span>
            </td>
            <td className="progress-bar-container__column">
                <span style={{ border : getBeforeStyle(data.dp_delivered_time, null) }} className="before"></span>
                <div title="Delivered" className="progress-bar-container__column--node-title">DD</div>
            </td>
        </tr>
    )
}

export default ProgressBar