import React from 'react'
import { getIcon } from './../utils'
import '@sass/OrdersPage/ProgressDetail.scss'

function getTimeDiff(d1, d2) {

    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let millisec, seconds, minutes = 0;

    if(date1 && date2) {
        millisec = date2.getTime() - date1.getTime();
        seconds =  millisec / 1000;
        minutes = seconds * ( 1/60 );
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
                        className='progress-bar'
                        onClick={(e) => {handleClick(e, data.order_id)} }>
                        { getIcon('back') }
                    </span>
                </td>
                <td className="table-col">
                    <span style={{ border : getBeforeStyle(data.order_placed_time,data.retailer_notified_time) }} className="before" ></span>
                    <span style={{ background : getAfterStyle(data.order_placed_time,data.retailer_notified_time) }} className="after">RNT</span>
                </td>
                <td className="table-col">
                    <span style={{ border : getBeforeStyle(data.retailer_notified_time, data.retailer_confirmation_time) }} className="before"></span>
                    <span style={{ background : getAfterStyle(data.retailer_notified_time, data.retailer_confirmation_time) }} className="after">RCT</span>
                </td>
                <td className="table-col">
                    <span style={{ border : getBeforeStyle(data.retailer_confirmation_time, data.dp_notified_time) }} className="before"></span>
                    <span style={{ background : getAfterStyle(data.retailer_confirmation_time, data.dp_notified_time) }} className="after">DPNT</span>
                </td>
                <td className="table-col">
                    <span style={{ border : getBeforeStyle(data.dp_notified_time, data.dp_confirmation_time) }} className="before"></span>
                    <span style={{ background : getAfterStyle(data.dp_notified_time, data.dp_confirmation_time) }} className="after">DPCT</span>
                </td>
                <td className="table-col"> 
                    <span style={{ border : getBeforeStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time) }} className="before"></span>
                    <span style={{ background : getAfterStyle(data.dp_confirmation_time, data.dp_arrived_at_store_time) }} className="after">AST</span>
                </td>
                <td className="table-col">
                    <span style={{ border : getBeforeStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time) }} className="before"></span>
                    <span style={{ background : getAfterStyle(data.dp_arrived_at_store_time, data.dp_picked_up_time) }} className="after">PCT</span>
                </td>
                <td className="table-col">
                    <span style={{ border : getBeforeStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time) }} className="before"></span>
                    <span style={{ background : getAfterStyle(data.dp_picked_up_time, data.dp_reached_to_consumer_time) }} className="after">ACL</span>
                </td>
                <td className="table-col">
                    <span style={{ border : getBeforeStyle(data.dp_reached_to_consumer_time, data.dp_delivered_time) }} className="before"></span>
                    <span style={{ background : getAfterStyle(data.dp_reached_to_consumer_time, data.dp_delivered_time) }} className="after">DD</span>
                </td>
                <td className="table-col">
                    <span style={{ border : getBeforeStyle(data.dp_reached_to_consumer_time, data.dp_delivered_time) }} className="before"></span>
                </td>
        
        </tr>
    )
}

export default ProgressBar