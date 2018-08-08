import React from 'react'
import { getReadableTimeFormat } from './../utils'
import Node from './node'
import LineBar from './lineBar'


//getProgressDuration - Returns the time difference between two given time
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
      } else {
        return `${seconds.toFixed(2)} secs`
      }
  }

  return defaultDuration
}

const ProgressBar = ({data}) => {

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
    <div className="progress-bar">
      <div className="progress-bar-container__column">  

        <span style={{ border : '3px solid #4caf50' }} className="before"></span>

        <div title="Order Placed" className="progress-bar-container__column--node-title">OP <br/>
          ({getReadableTimeFormat(data.order_placed_time)})
        </div>

        <LineBar date1={data.order_placed_time} date2={data.retailer_notified_time} threshold={retailerNotificationThreshold} orderStatus={data.order_status}></LineBar>
      
      </div>

      <div className="progress-bar-container__column">

        <Node date1={data.order_placed_time} date2={data.retailer_notified_time} threshold={retailerNotificationThreshold} orderStatus={data.order_status}></Node>
        
        <div title="Retailer Notified" className="progress-bar-container__column--node-title">RN <br/> 
          {
            data.retailer_notified_time ? `(${getProgressDuration(data.order_placed_time, data.retailer_notified_time)})` : ''
          }
        </div>
      
        <LineBar date1={data.retailer_notified_time} date2={data.retailer_confirmation_time} threshold={retailerConfirmationThreshold} orderStatus={data.order_status}></LineBar>
      
      </div>

      <div className="progress-bar-container__column">

        <Node date1={data.retailer_notified_time} date2={data.retailer_confirmation_time} threshold={retailerConfirmationThreshold} orderStatus={data.order_status}></Node>
        
        <div title="Retailer Confirmed" className="progress-bar-container__column--node-title">RC <br/>
          {
            data.retailer_confirmation_time ? `(${getProgressDuration(data.retailer_notified_time, data.retailer_confirmation_time)})` : ''
          }
        </div>
      
        <LineBar date1={data.retailer_confirmation_time} date2={data.dp_notified_time} threshold={deliveryNotificationThreshold} orderStatus={data.order_status}></LineBar>
      
      </div>

      <div className="progress-bar-container__column">

        <Node date1={data.retailer_confirmation_time} date2={data.dp_notified_time} threshold={deliveryNotificationThreshold} orderStatus={data.order_status}></Node>
        
        <div title="Delivery Person Notified" className="progress-bar-container__column--node-title">DPN <br/>
          {
            data.dp_notified_time ? `(${getProgressDuration(data.retailer_confirmation_time, data.dp_notified_time)})` : ''
          }
        </div>
    
        <LineBar date1={data.dp_notified_time} date2={data.dp_confirmation_time} threshold={deliveryConfirmationThreshold} orderStatus={data.order_status}></LineBar>
      
      </div>

      <div className="progress-bar-container__column"> 

        <Node date1={data.dp_notified_time} date2={data.dp_confirmation_time} threshold={deliveryConfirmationThreshold} orderStatus={data.order_status}></Node>
        
        <div title="Delivery Person Confirmed" className="progress-bar-container__column--node-title">DPC <br/>
          {
            data.dp_confirmation_time ? `(${getProgressDuration(data.dp_notified_time, data.dp_confirmation_time)})` : ''
          }
        </div>
      
        <LineBar date1={data.dp_confirmation_time} date2={data.dp_arrived_at_store_time} threshold={arriveStoreThreshold} orderStatus={data.order_status}></LineBar>
      
      </div>

      <div className="progress-bar-container__column">

        <Node date1={data.dp_confirmation_time} date2={data.dp_arrived_at_store_time} threshold={arriveStoreThreshold} orderStatus={data.order_status}></Node>
        
        <div title="Arrived Store Location" className="progress-bar-container__column--node-title">ASL <br/>
          {
            data.dp_arrived_at_store_time ? `(${getProgressDuration(data.dp_confirmation_time, data.dp_arrived_at_store_time)})` : ''
          }
        </div>
      
        <LineBar date1={data.dp_arrived_at_store_time} date2={data.dp_picked_up_time} threshold={productPickupThreshold} orderStatus={data.order_status}></LineBar>
      
      </div>

      <div className="progress-bar-container__column">

        <Node date1={data.dp_arrived_at_store_time} date2={data.dp_picked_up_time} threshold={productPickupThreshold} orderStatus={data.order_status}></Node>
        
        <div title="Pickedup Product" className="progress-bar-container__column--node-title">PP <br/>
          {
            data.dp_picked_up_time ? `(${getProgressDuration(data.dp_arrived_at_store_time, data.dp_picked_up_time)})` : ''
          }
        </div>
      
        <LineBar date1={data.dp_picked_up_time} date2={data.dp_reached_to_consumer_time} threshold={arriveConsumerThreshold} orderStatus={data.order_status}></LineBar>
      
      </div>

      <div className="progress-bar-container__column">

        <Node date1={data.dp_picked_up_time} date2={data.dp_reached_to_consumer_time} threshold={arriveConsumerThreshold} orderStatus={data.order_status}></Node>
        
        <div title="Arrived Consumer Location" className="progress-bar-container__column--node-title">ACL <br/>
          {
            data.dp_reached_to_consumer_time ? `(${getProgressDuration(data.dp_picked_up_time, data.dp_reached_to_consumer_time)})` : ''
          }
        </div>

        <LineBar date1={data.dp_reached_to_consumer_time} date2={data.dp_delivered_time} threshold={deliverProductThreshold} orderStatus={data.order_status}></LineBar>
      
      </div>

      <div className="progress-bar-container__column">

        <Node date1={data.dp_reached_to_consumer_time} date2={data.dp_delivered_time} threshold={deliverProductThreshold} orderStatus={data.order_status}></Node>
        
        <div title="Delivered" className="progress-bar-container__column--node-title">DD <br/>
          {
            data.dp_delivered_time ? `(${getReadableTimeFormat(data.dp_delivered_time)})` : ''
          }
        </div>
        
      </div>
    </div>
  )

}

export default ProgressBar