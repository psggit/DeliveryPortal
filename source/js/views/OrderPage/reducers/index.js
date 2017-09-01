// import { Map } from 'immutable';

/*
  Event Map
  -*-*-*-*-
  Order Placed: STATE_FINDING_RETAILER,
  Searching for compatible Retailer: STATE_AWAITING_RETAILER_CONFIRMATION,
  Order Confirmed by Retailer: STATE_AWAITING_DELIVERER_CONFIRMATION,
  Searching for compatible Deliverer: STATE_FINDING_DELIVERER,
  Order Confirmed bt Deliverer: STATE_AWAITING_DELIVERY_PICK_UP,
  Order Picked Up: STATE_ON_ROUTE,
  Order Delivered: STATE_DELIVERED,
  Order Cancelled: STATE_CANCELLED,
  Order Returning: STATE_RETURNING

  Object States
  -*-*-*-*-*-*-
  Order:     placed > placed > placed > placed > placed > placed > completed/cancelled > returning
  Customer:  placed > placed > placed > placed > placed > placed > completed/cancelled
  Retailer:  searching > waiting > confirmed > confirmed > confirmed > dispatched > dispatched > awaiting_return
  Deliverer: null > null > null > searching > confirmed > picked > delivered > returning
*/

import * as ActionTypes from './../constants/actions'

// Initial Order State
const initialOrderState = {
    state: '',
    loadingOrderDetail: true,
    state: 'SearchingRetailer',
    loadingOrdersList: true,
    orders: [],
    ordersCount: 0,
    order: {
      id: '',
      status: '',
      cancellationFee: '',
      cancelledTime: '',
      cancellationReturnTime: '',
      deliveredTime: '',
      pickedUpTime: '',
      landmark: '',
      deliveryFee: '',
      assignedTo: '',
      assignedToId: '',
      isFreelancer: '',
      cartItems: '',
      retailers: [],
      deliverers: [],
      orderPlacedTime: ''
    },
    retailer: {
      id: '',
      name: '',
      phone: '',
      gps: '',
      address: '',
      confirmationTime: '',
      notifiedTime: ''
    },
    deliverer: {
      id: '',
      name: '',
      phone: '',
      confirmationTime: '',
      reachedToConsumerTime: '',
      notifiedTime: '',
    },
    customer: {
      id: '',
      address: '',
      name: '',
      gps: '',
      isAgeVerified: '',
      phone: ''
    }
}



const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_ORDERS_DATA]: (state, action) => {
    return Object.assign({}, state, {
      state: 'SearchingRetailer',
      loadingOrdersList: false,
      orders: action.data.orders,
      ordersCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_ORDER_DETAIL]: (state, action) => {
    const { orderStatus } = action.data

    return Object.assign({}, state, {
      state: 'SearchingDeliverer',
      loadingOrderDetail: false,
      order: {
        id: orderStatus.order_id,
        status: orderStatus.status,
        cancellationFee: orderStatus.cancellation_fee,
        cancelledTime: orderStatus.cancelled_time,
        cancellationReturnTime: orderStatus.cancellation_return_time,
        deliveredTime: orderStatus.dp_delivered_time,
        pickedUpTime: orderStatus.dp_picked_up_time,
        landmark: orderStatus.landmark,
        deliveryFee: orderStatus.delivery_fee,
        assignedTo: orderStatus.assigned_to,
        assignedToId: orderStatus.assigned_to_id,
        isFreelancer: orderStatus.is_freelancer,
        cartItems: orderStatus.cart_items,
        retailers: orderStatus.retailers,
        deliverers: orderStatus.deliverers,
        orderPlacedTime: orderStatus.order_placed_time
      },
      retailer: {
        id: orderStatus.retailer_id,
        name: orderStatus.retailer_name,
        phone: orderStatus.retailer_phone,
        gps: orderStatus.retailer_gps,
        address: orderStatus.retailer_address,
        confirmationTime: orderStatus.retailer_confirmation_time,
        notifiedTime: orderStatus.retailer_notified_time
      },
      deliverer: {
        id: orderStatus.dp_id,
        name: orderStatus.dp_name,
        phone: orderStatus.dp_contact_number,
        confirmationTime: orderStatus.dp_confirmation_time,
        reachedToConsumerTime: orderStatus.dp_reached_to_consumer_time,
        notifiedTime: orderStatus.dp_notified_time,
      },
      customer: {
        id: orderStatus.consumer_id,
        address: orderStatus.consumer_address,
        name: orderStatus.consumer_name,
        gps: orderStatus.consumer_gps,
        isAgeVerified: true,
        phone: orderStatus.contact_number
      }
    })
  },

  [ActionTypes.REQUEST_ASSIGN_ORDER]: (state, action) => {
    return Object.assign({}, state, {
      order: Object.assign({}, state.order, {
        assignedTo: 1
      })
    })
  },

  [ActionTypes.SUCCESS_FORCE_REDEEM]: (state, action) => {
    return state
  }
};

export default function reducer(state = initialOrderState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
