/*
This is your saga file, which containes generator functions.
This is a side-effect container. Do all your side-effect here only.
*/

import { takeLatest, delay } from 'redux-saga'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import * as Api from './api'

/**
 * Handlers
 */
function* fetchOrdersData(action) {
  try {
    const data = yield call(Api.fetchOrdersData, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_ORDERS_DATA, data})
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
    // const { data, meta } = yield call(utils.getData, action)
    const data = {}
    yield put({type: ActionTypes.SUCCESS_FORCE_REDEEM, data})
  } catch (err) {
    console.log(err)
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
  } catch (err) {
    console.log(err)
  }
}

function* skipRetailer(action) {
  try {
    const data = yield call(Api.skipRetailer, action)
    yield put({type: ActionTypes.SUCCESS_SKIP_RETAILER, data})
  } catch (err) {
    console.log(err)
  }
}

function* skipDeliverer(action) {
  try {
    const data = yield call(Api.skipDeliverer, action)
    yield put({type: ActionTypes.SUCCESS_SKIP_DELIVERER, data})
  } catch (err) {
    console.log(err)
  }
}

/**
 * Watchers
 */
export function* watchFetchOrdersData() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_ORDERS_DATA, fetchOrdersData)
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
