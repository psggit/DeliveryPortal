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

// retailer_notified_time,
// dp_delivered_time,
// retailer_accepted_time,
// cancellation_time,
// cancellation_return_time,
// dp_reached_to_consumer_time,
// dp_arrived_at_store_time,
// dp_accepted_time,
// dp_notified_time,
// dp_picked_up_time,
// dp_confirmation_time,

import * as ActionTypes from './../constants/actions'

// Initial Order State
const initialOrderState = {
    state: '',
    loadingOrderDetail: true,
    state: 'SearchingRetailer',
    loadingOrdersList: true,
    loadingGenres: true,
    loadingNotes: true,
    loadingLiveOrders: true,
    loadingLiveAssignedOrders: true,
    loadingLiveUnassignedOrders: true,
    loadingHistoryOrders: true,
    loadingNeedToBeCancelledOrders: true,
    loadingAttemptedOrders: true,
    loadingUnavailableDp: true,
    loadingReturningOrders: true,
    loadingSearchOrders: true,
    autoPilotStatus: false,
    liveOrdersData: [],
    liveAssignedOrdersData: [],
    liveUnassignedOrdersData: [],
    historyOrdersData: [],
    needToBeCancelledOrdersData: [],
    attemptedOrdersData: [],
    unavailableDpsData: [],
    returningOrders: [],
    searchOrdersData: [],
    orders: [],
    plotData: [],
    notesData: [],
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
      cartItems: [],
      notes: [],
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
  [ActionTypes.SUCCESS_FETCH_LIVE_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingLiveOrders: false,
      liveOrdersData: action.data.orders,
      liveOrdersCount: action.data.count,
    })
  },

  [ActionTypes.SUCCESS_FETCH_LIVE_ASSIGNED_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingLiveAssignedOrders: false,
      liveAssignedOrdersData: action.data.orders,
      liveAssignedOrdersCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_LIVE_UNASSIGNED_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingLiveUnassignedOrders: false,
      liveUnassignedOrdersData: action.data.orders,
      liveUnassignedOrdersCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_HISTORY_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingHistoryOrders: false,
      historyOrdersData: action.data.orders,
      historyOrdersCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_NEED_TO_BE_CANCELLED_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingNeedToBeCancelledOrders: false,
      needToBeCancelledOrdersData: action.data.orders,
      needToBeCancelledOrdersCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_ATTEMPTED_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingAttemptedOrders: false,
      attemptedOrdersData: action.data.orders,
      attemptedOrdersCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_UNAVAILABLE_DP]: (state, action) => {
    return Object.assign({}, state, {
      unavailableDpsData: action.data.dps.dps,
      unavailableDpsDataCount: action.data.dps.count,
      loadingUnavailableDp: false
    })
  },

  [ActionTypes.SUCCESS_FETCH_RETURNING_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      returningOrders: action.data.orderDetails,
      returningOrdersCount: action.data.count,
      loadingReturningOrders: false
    })
  },

  [ActionTypes.SUCCESS_SEARCH_LIVE_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingSearchOrders: false,
      searchOrdersData: action.data.orders,
      searchOrdersCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_AUTO_PILOT_STATUS]: (state, action) => {
    return Object.assign({}, state, {
      autoPilotStatus: action.data.status
    })
  },

  [ActionTypes.SUCCESS_FETCH_PLOT_DATA]: (state, action) => {
    const plotData = action.data.location_history.snappedPoints.map(item => {
      return {
        lat: item.location.latitude,
        lng: item.location.longitude
      }
    })
    return Object.assign({}, state, {
      plotData: plotData
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
        cancellationTime: orderStatus.cancellation_time,
        cancellationReturnTime: orderStatus.cancellation_return_time,
        deliveredTime: orderStatus.dp_delivered_time,
        pickedUpTime: orderStatus.dp_picked_up_time,
        landmark: orderStatus.landmark,
        deliveryFee: orderStatus.delivery_fee,
        assignedTo: orderStatus.assigned_to,
        assignedToId: orderStatus.assigned_to_id,
        isFreelancer: orderStatus.is_freelancer,
        cartItems: orderStatus.cart_items,
        notes: orderStatus.notes,
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
        arrivedAtStoreTime: orderStatus.dp_arrived_at_store_time,
        acceptedTime: orderStatus.dp_accepted_time
      },
      customer: {
        id: orderStatus.consumer_id,
        address: orderStatus.consumer_address,
        landmark: orderStatus.landmark,
        flatNo: orderStatus.flat_number,
        name: orderStatus.consumer_name,
        gps: orderStatus.consumer_gps,
        isAgeVerified: true,
        phone: orderStatus.consumer_phone
      }
    })
  },

  [ActionTypes.SUCCESS_SET_LOADING]: (state, action) => {
    return Object.assign({}, state, {
      [action.data]: true
    })
  },

  [ActionTypes.SUCCESS_SET_LOADING_ALL]: (state, action) => {
    return Object.assign({}, state, {
      loadingLiveOrders: true,
      loadingHistoryOrders: true,
      loadingLiveAssignedOrders: true,
      loadingLiveUnassignedOrders: true,
      loadingNeedToBeCancelledOrders: true,
      loadingAttemptedOrders: true,
      loadingUnavailableDp: true,
      loadingReturningOrders: true,
      loadingGenres: true,
      loadingNotes: true,
    })
  },

  [ActionTypes.SUCCESS_FETCH_GENRES]: (state, action) => {
    return Object.assign({}, state, {
      genres: action.data.map(item => item.genre_name),
      loadingGenres: false
    })
  },

  [ActionTypes.SUCCESS_FETCH_NOTES]: (state, action) => {
    return Object.assign({}, state, {
      notesData: action.data.Notes,
      loadingNotes: false
    })
  }
};

export default function reducer(state = initialOrderState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
