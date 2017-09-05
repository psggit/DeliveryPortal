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

export const setLoadingOrderDetail = (data) => ({
  type: ActionTypes.REQUEST_SET_LOADING_ORDER_DETAIL
})
