/*
This file contains only action creators.
Action creator is a pure function that just return
plain JavaScript object (action).
Don't do any side-effect.
*/

import * as ActionTypes from './../constants/actions'

export const filterOrdersList = (filter) => ({
  type: ActionTypes.REQUEST_FILTER_ORDERS_DATA,
  data: filter
})

export const fetchOrderDetail = (orderId) => ({
  type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL,
  data: { id: orderId }
})

export const fetchOrdersData = (data, api = '/deliveryStatus/liveOrders') => ({
  type: ActionTypes.REQUEST_FETCH_ORDERS_DATA,
  data: data,
  api: api
})

export const fetchLiveOrders = (data) => ({
  type: ActionTypes.REQUEST_FETCH_LIVE_ORDERS,
  data
})

export const fetchLiveAssignedOrders = (data) => ({
  type: ActionTypes.REQUEST_FETCH_LIVE_ASSIGNED_ORDERS,
  data
})

export const fetchLiveUnassignedOrders = (data) => ({
  type: ActionTypes.REQUEST_FETCH_LIVE_UNASSIGNED_ORDERS,
  data
})

export const fetchHistoryOrders = (data) => ({
  type: ActionTypes.REQUEST_FETCH_HISTORY_ORDERS,
  data
})

export const fetchNeedToBeCancelledOrders = (data) => ({
  type: ActionTypes.REQUEST_FETCH_NEED_TO_BE_CANCELLED_ORDERS,
  data
})

export const fetchAttemptedOrders = (data) => ({
  type: ActionTypes.REQUEST_FETCH_ATTEMPTED_ORDERS,
  data
})

export const searchLiveOrders = (data) => ({
  type: ActionTypes.REQUEST_SEARCH_LIVE_ORDERS,
  data
})

export const searchLiveAssignedOrders = (data) => ({
  type: ActionTypes.REQUEST_SEARCH_LIVE_ASSIGNED_ORDERS,
  data
})

export const searchLiveUnassignedOrders = (data) => ({
  type: ActionTypes.REQUEST_SEARCH_LIVE_UNASSIGNED_ORDERS,
  data
})

export const searchHistoryOrders = (data) => ({
  type: ActionTypes.REQUEST_SEARCH_HISTORY_ORDERS,
  data
})

export const assignOrder = (data) => ({
  type: ActionTypes.REQUEST_ASSIGN_ORDER,
  data: data
})

export const skipRetailer = (data) => ({
  type: ActionTypes.REQUEST_SKIP_RETAILER,
  data: data
})

export const skipDeliverer = (data) => ({
  type: ActionTypes.REQUEST_SKIP_DELIVERER,
  data: data
})

export const cancelOrder = (data) => ({
  type: ActionTypes.REQUEST_CANCEL_ORDER,
  data: data
})

export const forceRedeem = (data) => ({
  type: ActionTypes.REQUEST_FORCE_REDEEM,
  data: data
})

export const confirmRetailer = (data) => ({
  type: ActionTypes.REQUEST_CONFIRM_RETAILER,
  data: data
})

export const confirmDeliverer = (data) => ({
  type: ActionTypes.REQUEST_CONFIRM_DELIVERER,
  data: data
})

export const setLoading = (data) => ({
  type: ActionTypes.REQUEST_SET_LOADING,
  data
})

export const setLoadingAll = (data) => ({
  type: ActionTypes.REQUEST_SET_LOADING_ALL,
  data
})

export const autoPilot = (data, CB) => ({
  type: ActionTypes.REQUEST_AUTO_PILOT,
  data: data,
  CB: CB
})

export const fetchAutoPilotStatus = (data) => ({
  type: ActionTypes.REQUEST_FETCH_AUTO_PILOT_STATUS,
  data
})

export const fetchPlotData = (data) => ({
  type: ActionTypes.REQUEST_FETCH_PLOT_DATA,
  data
})

export const deleteItemFromCart = (data, CB) => ({
  type: ActionTypes.REQUEST_DELETE_ITEM_FROM_CART,
  data,
  CB
})

export const addItemToCart = (data, CB) => ({
  type: ActionTypes.REQUEST_ADD_ITEM_TO_CART,
  data,
  CB
})

export const assignNewRetailerToOrder = (data) => ({
  type: ActionTypes.REQUEST_ASSIGN_NEW_RETAILER_TO_ORDER,
  data
})

export const assignNewDeliveryAgentToOrder = (data) => ({
  type: ActionTypes.REQUEST_ASSIGN_NEW_DP_TO_ORDER,
  data
})

export const createNote = (data, postAction) => ({
  type: ActionTypes.REQUEST_CREATE_NOTE,
  data,
  postAction
})

export const fetchNotes = data => ({
  type: ActionTypes.REQUEST_FETCH_NOTES,
  data
})

export const fetchUnavailableDp = data => ({
  type: ActionTypes.REQUEST_FETCH_UNAVAILABLE_DP,
  data
})

export const fetchReturningOrders = data => ({
  type: ActionTypes.REQUEST_FETCH_RETURNING_ORDERS,
  data
})

export const restockOrder = data => ({
  type: ActionTypes.REQUEST_RESTOCK_ORDER,
  data
})

export const fetchCustomerDetails = data => ({
  type: ActionTypes.REQUEST_FETCH_CUSTOMER_DETAILS,
  data
})

// export const validateGeolocation = data => ({
//   type: ActionTypes.REQUEST_VALIDATE_GEOLOCATION,
//   data
// })

// export const fetchInventoryList = data => ({
//   type: ActionTypes.REQUEST_FETCH_INVENTORY_LIST,
//   data
// })

export const placeOrder = data => ({
  type: ActionTypes.REQUEST_PLACE_ORDER,
  data
})


