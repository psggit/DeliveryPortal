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

function* fetchCancellationOrders(action) {
  try {
    const data = yield call(Api.fetchCancellationOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_LIVE_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchAttemptedOrders(action) {
  try {
    const data = yield call(Api.fetchAttemptedOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_LIVE_ORDERS, data})
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
    yield put({type: ActionTypes.SUCCESS_SEARCH_LIVE_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* searchLiveUnassignedOrders(action) {
  try {
    const data = yield call(Api.searchLiveUnassignedOrders, action)
    yield put({type: ActionTypes.SUCCESS_SEARCH_LIVE_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* searchHistoryOrders(action) {
  try {
    const data = yield call(Api.searchHistoryOrders, action)
    yield put({type: ActionTypes.SUCCESS_SEARCH_LIVE_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchOrderDetail(action) {
  console.log(action)
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
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
    Notify("Successfully redeemed the order", "success")
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
    err.response.json().then(json => { Notify(json.message, "warning") })
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
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
    Notify("Successfully assigned the order", "success")
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
    err.response.json().then(json => { Notify(json.status, "warning") })
  }
}

function* skipRetailer(action) {
  try {
    const data = yield call(Api.skipRetailer, action)
    Notify("Successfully skipped the retailer", "success")
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* skipDeliverer(action) {
  try {
    const data = yield call(Api.skipDeliverer, action)
    Notify("Successfully skipped the deliverer", "success")
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* cancelOrder(action) {
  try {
    const data = yield call(Api.cancelOrder, action)
    Notify("Successfully cancelled the order", "success")
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.order_id}})
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* confirmRetailer(action) {
  try {
    const data = yield call(Api.confirmRetailer, action)
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.delivery_order_id}})
    Notify("Successfully confirmed the retailer", "success")
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.delivery_order_id}})
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* confirmDeliverer(action) {
  try {
    const data = yield call(Api.confirmDeliverer, action)
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.delivery_order_id}})
    Notify("Successfully confirmed the deliverer", "success")
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: {id: action.data.delivery_order_id}})
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* setLoading(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_LOADING, data: action.data })
  } catch (err) {
    console.log(err)
  }
}

function* autoPilot(action) {
  try {
    const data = yield call(Api.autoPilot, action)
    yield put({type: ActionTypes.SUCCESS_AUTO_PILOT})
    action.CB(action.data.status)
    Notify(`Switched to ${action.data.status ? 'auto' : 'manual'}`, "success")
  } catch (err) {
    console.log(err)
    action.CB(!action.data.status)
  }
}

function* fetchAutoPilotStatus(action) {
  try {
    const data = yield call(Api.fetchAutoPilotStatus, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_AUTO_PILOT_STATUS, data})
  } catch (err) {
    console.log(err)
    // Notify('Autopilot status fetching problem', 'warning')
  }
}

function* fetchPlotData(action) {
  try {
    const data = yield call(Api.fetchPlotData, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_PLOT_DATA, data})
  } catch (err) {
    console.log(err)
  }
}

function* deleteItemFromCart(action) {
  try {
    const data = yield call(Api.deleteItemFromCart, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.delivery_order_id } })
    Notify("Successfully deleted item from cart", "success")
    action.CB()
  } catch (err) {
    yield put({ type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.delivery_order_id } })
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB()
  }
}

function* addItemToCart(action) {
  try {
    const data = yield call(Api.addItemToCart, action)
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.delivery_order_id } })
    Notify("Successfully added item to cart", "success")
    action.CB()
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.delivery_order_id } })
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB()
  }
}

function* assignNewRetailerToOrder(action) {
  try {
    const data = yield call(Api.assignNewRetailerToOrder, action)
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.delivery_order_id } })
    Notify("Successfully assigned new retailer", "success")
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.delivery_order_id } })
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* assignNewDeliveryAgentToOrder(action) {
  try {
    const data = yield call(Api.assignNewDeliveryAgentToOrder, action)
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.delivery_order_id } })
    Notify("Successfully assigned new delivery agent", "success")
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.delivery_order_id } })
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* createNote(action) {
  try {
    const data = yield call(Api.createNote, action)
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.order_id } })
    Notify("Successfully created the note", "success")
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_ORDER_DETAIL, data: { id: action.data.order_id } })
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchNotes(action) {
  try {
    const data = yield call(Api.fetchNotes, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_NOTES, data})
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
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

export function* watchFetchCancellationOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CANCELLATION_ORDERS, fetchCancellationOrders)
  }
}

export function* watchFetchAttemptedOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_ATTEMPTED_ORDERS, fetchAttemptedOrders)
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

export function* watchSetLoading() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SET_LOADING, setLoading)
  }
}

export function* watchAutoPilot() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_AUTO_PILOT, autoPilot)
  }
}

export function* watchFetchAutoPilotStatus() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_AUTO_PILOT_STATUS, fetchAutoPilotStatus)
  }
}

export function* watchFetchPlotData() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_PLOT_DATA, fetchPlotData)
  }
}

export function* watchDeleteItemFromCart() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_DELETE_ITEM_FROM_CART, deleteItemFromCart)
  }
}

export function* watchAddItemToCart() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_ADD_ITEM_TO_CART, addItemToCart)
  }
}

export function* watchAssignNewRetailerToOrder() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_ASSIGN_NEW_RETAILER_TO_ORDER, assignNewRetailerToOrder)
  }
}

export function* watchAssignNewDeliveryAgentToOrder() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_ASSIGN_NEW_DP_TO_ORDER, assignNewDeliveryAgentToOrder)
  }
}

export function* watchCreateNote() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_NOTE, createNote)
  }
}

export function* watchFetchNotes() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_NOTES, fetchNotes)
  }
}
