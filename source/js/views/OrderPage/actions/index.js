/*
This file contains only action creators.
Action creator is a pure function that just return
plain JavaScript object (action).
Don't do any side-effect.
*/

import * as ActionTypes from './../constants/actions'

export function getDashboardStatus() {
  // TODO: Get deliverer Status
  // TODO: Get Outlet Status
  // TODO: Get Todays Status ORder
  console.log('Delivery Status');
}
export function stateChange(value) {
  return {
    type: value,
  }
  // return callApi(url).then(res => {
  //   dispatch(dispatchFetch(res.data))
  // })
}

export const filterOrdersList = (filter) => ({
  type: ActionTypes.REQUEST_FILTER_ORDERS_DATA,
  data: filter
})

export const fetchOrdersData = (routeName) => ({
  type: ActionTypes.REQUEST_FETCH_ORDERS_DATA,
  data: routeName
})

export const assignOrder = (id) => ({
  type: ActionTypes.REQUEST_ASSIGN_ORDER,
  data: id
})

export const forceRedeem = () => ({
  type: ActionTypes.REQUEST_FORCE_REDEEM
})
