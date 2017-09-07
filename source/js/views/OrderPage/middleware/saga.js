/*
This is your saga file, which containes generator functions.
This is a side-effect container. Do all your side-effect here only.
*/

import { takeLatest, delay } from 'redux-saga'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import * as Api from './api'
import Notify from '@components/Notification'


/**
 * Handlers
 */
function* fetchLiveOrders(action) {
  try {
    const data = yield call(Api.fetchLiveOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_LIVE_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchLiveAssignedOrders(action) {
  try {
    const data = yield call(Api.fetchLiveAssignedOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_LIVE_ASSIGNED_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchLiveUnassignedOrders(action) {
  try {
    const data = yield call(Api.fetchLiveUnassignedOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_LIVE_UNASSIGNED_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchHistoryOrders(action) {
  try {
    const data = yield call(Api.fetchHistoryOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_HISTORY_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* searchLiveOrders(action) {
  try {
    const data = yield call(Api.searchLiveOrders, action)
    yield put({type: ActionTypes.SUCCESS_SEARCH_LIVE_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* searchLiveAssignedOrders(action) {
  try {
    const data = yield call(Api.searchLiveAssignedOrders, action)
    yield put({type: ActionTypes.SUCCESS_SEARCH_LIVE_ASSIGNED_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* searchLiveUnassignedOrders(action) {
  try {
    const data = yield call(Api.searchLiveUnassignedOrders, action)
    yield put({type: ActionTypes.SUCCESS_SEARCH_LIVE_UNASSIGNED_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* searchHistoryOrders(action) {
  try {
    const data = yield call(Api.searchHistoryOrders, action)
    yield put({type: ActionTypes.SUCCESS_SEARCH_HISTORY_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchOrderDetail(action) {
  try {
    const data = yield call(Api.fetchOrderDetail, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_ORDER_DETAIL, data})
  } catch (err) {
    console.log(err)
  }
}


function* forceRedeem(action) {
  try {
    const data = yield call(Api.forceRedeem, action)
    yield put({type: ActionTypes.SUCCESS_FORCE_REDEEM, data})
    Notify("Successfully redeemed the order", "success")
  } catch (err) {
    console.log(err)
    Notify("Something went wrong", "warning")
  }
}


function* filterOrdersData(action) {
  try {
    // const { data, meta } = yield call(utils.getData, action)
    const data = {}
    const meta = {}
    yield put({type: ActionTypes.SUCCESS_FILTER_ORDERS_DATA, data, meta})
  } catch (err) {
    console.log(err)
  }
}


function* assignOrder(action) {
  try {
    const data = yield call(Api.assignOrder, action)
    yield put({type: ActionTypes.SUCCESS_ASSIGN_ORDER, data})
    Notify("Successfully assigned the order", "success")
  } catch (err) {
    console.log(err)
    Notify("Something went wrong", "warning")
  }
}

function* skipRetailer(action) {
  try {
    const data = yield call(Api.skipRetailer, action)
    yield put({type: ActionTypes.SUCCESS_SKIP_RETAILER, data})
    Notify("Successfully skipped the retailer", "success")
  } catch (err) {
    console.log(err)
    Notify("Something went wrong", "warning")
  }
}

function* skipDeliverer(action) {
  try {
    const data = yield call(Api.skipDeliverer, action)
    yield put({type: ActionTypes.SUCCESS_SKIP_DELIVERER, data})
    Notify("Successfully skipped the retailer", "success")
  } catch (err) {
    console.log(err)
    Notify("Something went wrong", "warning")
  }
}

function* cancelOrder(action) {
  try {
    const data = yield call(Api.cancelOrder, action)
    yield put({type: ActionTypes.SUCCESS_CANCEL_ORDER, data})
    Notify("Successfully cancelled the order", "success")
  } catch (err) {
    console.log(err)
    Notify("Something went wrong", "warning")
  }
}

function* confirmRetailer(action) {
  try {
    const data = yield call(Api.confirmRetailer, action)
    yield put({type: ActionTypes.SUCCESS_CONFIRM_RETAILER, data})
    Notify("Successfully confirmed the retailer", "success")
  } catch (err) {
    console.log(err)
    Notify("Something went wrong", "warning")
  }
}

function* confirmDeliverer(action) {
  try {
    const data = yield call(Api.confirmDeliverer, action)
    yield put({type: ActionTypes.SUCCESS_CONFIRM_DELIVERER, data})
    Notify("Successfully confirmed the deliverer", "success")
  } catch (err) {
    console.log(err)
    Notify("Something went wrong", "warning")
  }
}

function* setLoadingOrderDetail() {
  try {
    yield put({type: ActionTypes.SUCCESS_SET_LOADING_ORDER_DETAIL})
  } catch (err) {
    console.log(err)
  }
}

/**
 * Watchers
 */
// export function* watchFetchOrdersData() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_FETCH_ORDERS_DATA, fetchOrdersData)
//   }
// }

export function* watchFetchLiveOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_LIVE_ORDERS, fetchLiveOrders)
  }
}

export function* watchFetchLiveAssignedOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_LIVE_ASSIGNED_ORDERS, fetchLiveAssignedOrders)
  }
}

export function* watchFetchLiveUnassignedOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_LIVE_UNASSIGNED_ORDERS, fetchLiveUnassignedOrders)
  }
}

export function* watchFetchHistoryOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_HISTORY_ORDERS, fetchHistoryOrders)
  }
}

export function* watchSearchLiveOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SEARCH_LIVE_ORDERS, searchLiveOrders)
  }
}

export function* watchSearchLiveAssignedOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SEARCH_LIVE_ASSIGNED_ORDERS, searchLiveAssignedOrders)
  }
}

export function* watchSearchLiveUnassignedOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SEARCH_LIVE_UNASSIGNED_ORDERS, searchLiveUnassignedOrders)
  }
}

export function* watchSearchHistoryOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SEARCH_HISTORY_ORDERS, searchHistoryOrders)
  }
}

export function* watchFilterOrdersData() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FILTER_ORDERS_DATA, filterOrdersData)
  }
}

export function* watchFetchOrderDetail() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_ORDER_DETAIL, fetchOrderDetail)
  }
}

export function* watchForceRedeem() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FORCE_REDEEM, forceRedeem)
  }
}

export function* watchAssignOrder() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_ASSIGN_ORDER, assignOrder)
  }
}

export function* watchSkipRetailer() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SKIP_RETAILER, skipRetailer)
  }
}

export function* watchSkipDeliverer() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SKIP_DELIVERER, skipDeliverer)
  }
}

export function* watchCancelOrder() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CANCEL_ORDER, cancelOrder)
  }
}

export function* watchConfirmRetailer() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CONFIRM_RETAILER, confirmRetailer)
  }
}

export function* watchConfirmDeliverer() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CONFIRM_DELIVERER, confirmDeliverer)
  }
}

export function* watchSetLoadingOrderDetail() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SET_LOADING_ORDER_DETAIL, cancelOrder)
  }
}
