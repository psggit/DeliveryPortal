/*
This is your saga file, which containes generator functions.
This is a side-effect container. Do all your side-effect here only.
*/

import { takeLatest, delay } from 'redux-saga/effects'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import * as Api from './api'
import Notify from '@components/Notification'
import { customerDetails, orderSummary }  from './../../../mockData'


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

function* fetchNeedToBeCancelledOrders(action) {
  try {
    const data = yield call(Api.fetchNeedToBeCancelledOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_NEED_TO_BE_CANCELLED_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchAttemptedOrders(action) {
  try {
    const data = yield call(Api.fetchAttemptedOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_ATTEMPTED_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchUnavailableDp(action) {
  try {
    const data = yield call(Api.fetchUnavailableDp, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_UNAVAILABLE_DP, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchReturningOrders(action) {
  try {
    const data = yield call(Api.fetchReturningOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_RETURNING_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* restockOrder(action) {
  try {
    const data = yield call(Api.restockOrder, action)
    yield put({type: ActionTypes.REQUEST_FETCH_RETURNING_ORDERS, data: { offset: 0, limit: 40 } })
    Notify("Successfully restocked the order", "success")
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_FETCH_RETURNING_ORDERS, data: { offset: 0, limit: 40 } })
    err.response.json().then(json => { Notify(json.status, "warning") })
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

// TODO: Fix what to fetch when assignOrder called (since its being used at two places)
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

function* setLoadingAll(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_LOADING_ALL, data: action.data })
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
    yield put({type: action.postAction, data: { id: action.data.order_id } })
    Notify("Successfully created the note", "success")
  } catch (err) {
    yield put({type: action.postAction, data: { id: action.data.order_id } })
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

function* fetchCustomerDetails(action) {
  try {
    const data = yield call(Api.fetchCustomerDetails, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_CUSTOMER_DETAILS, data})
  } catch (err) {
    yield put({type: ActionTypes.REQUEST_SET_LOADING, data: 'loadingCustomerDetails'})
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* placeOrder(action) {
  try {
    const data = yield call(Api.placeOrder, action)
    yield put({type: ActionTypes.SUCCESS_PLACE_ORDER, data})
    Notify("Order placed successfully", "success")
    setTimeout(() => {
      window.location.href = '/home/orders/live'
    }, 1000)
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* validateOrder(action) {
  try {
    const data = yield call(Api.validateOrder, action)
    yield put({type: ActionTypes.SUCCESS_VALIDATE_ORDER, data})
    action.callback(data)
  } catch (err) {
    err.response.json().then(json => { action.callback(json); Notify(json.delivery_message, "warning") })
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

function* watchFetchLiveOrders() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_LIVE_ORDERS, fetchLiveOrders)
}

function* watchFetchLiveAssignedOrders() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_LIVE_ASSIGNED_ORDERS, fetchLiveAssignedOrders)
}

function* watchFetchLiveUnassignedOrders() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_LIVE_UNASSIGNED_ORDERS, fetchLiveUnassignedOrders)
}

function* watchFetchHistoryOrders() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_HISTORY_ORDERS, fetchHistoryOrders)
}

function* watchFetchNeedToBeCancelledOrders() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_NEED_TO_BE_CANCELLED_ORDERS, fetchNeedToBeCancelledOrders)
}

function* watchFetchAttemptedOrders() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_ATTEMPTED_ORDERS, fetchAttemptedOrders)
}

function* watchUnavailableDp() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_UNAVAILABLE_DP, fetchUnavailableDp)
}

function* watchFetchReturningOrders() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_RETURNING_ORDERS, fetchReturningOrders)
}

function* watchRestockOrder() {
  yield takeLatest(ActionTypes.REQUEST_RESTOCK_ORDER, restockOrder)
}

function* watchSearchLiveOrders() {
  yield takeLatest(ActionTypes.REQUEST_SEARCH_LIVE_ORDERS, searchLiveOrders)
}

function* watchSearchLiveAssignedOrders() {
  yield takeLatest(ActionTypes.REQUEST_SEARCH_LIVE_ASSIGNED_ORDERS, searchLiveAssignedOrders)
}

function* watchSearchLiveUnassignedOrders() {
  yield takeLatest(ActionTypes.REQUEST_SEARCH_LIVE_UNASSIGNED_ORDERS, searchLiveUnassignedOrders)
}

function* watchSearchHistoryOrders() {
  yield takeLatest(ActionTypes.REQUEST_SEARCH_HISTORY_ORDERS, searchHistoryOrders)
}

function* watchFilterOrdersData() {
  yield takeLatest(ActionTypes.REQUEST_FILTER_ORDERS_DATA, filterOrdersData)
}

function* watchFetchOrderDetail() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_ORDER_DETAIL, fetchOrderDetail)
}

function* watchForceRedeem() {
  yield takeLatest(ActionTypes.REQUEST_FORCE_REDEEM, forceRedeem)
}

function* watchAssignOrder() {
  yield takeLatest(ActionTypes.REQUEST_ASSIGN_ORDER, assignOrder)
}

function* watchSkipRetailer() {
  yield takeLatest(ActionTypes.REQUEST_SKIP_RETAILER, skipRetailer)
}

function* watchSkipDeliverer() {
  yield takeLatest(ActionTypes.REQUEST_SKIP_DELIVERER, skipDeliverer)
}

function* watchCancelOrder() {
  yield takeLatest(ActionTypes.REQUEST_CANCEL_ORDER, cancelOrder)
}

function* watchConfirmRetailer() {
  yield takeLatest(ActionTypes.REQUEST_CONFIRM_RETAILER, confirmRetailer)
}

function* watchConfirmDeliverer() {
  yield takeLatest(ActionTypes.REQUEST_CONFIRM_DELIVERER, confirmDeliverer)
}

function* watchSetLoading() {
  yield takeLatest(ActionTypes.REQUEST_SET_LOADING, setLoading)
}

function* watchSetLoadingAll() {
  yield takeLatest(ActionTypes.REQUEST_SET_LOADING_ALL, setLoadingAll)
}

function* watchAutoPilot() {
  yield takeLatest(ActionTypes.REQUEST_AUTO_PILOT, autoPilot)
}

function* watchFetchAutoPilotStatus() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_AUTO_PILOT_STATUS, fetchAutoPilotStatus)
}

function* watchFetchPlotData() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_PLOT_DATA, fetchPlotData)
}

function* watchDeleteItemFromCart() {
  yield takeLatest(ActionTypes.REQUEST_DELETE_ITEM_FROM_CART, deleteItemFromCart)
}

function* watchAddItemToCart() {
  yield takeLatest(ActionTypes.REQUEST_ADD_ITEM_TO_CART, addItemToCart)
}

function* watchAssignNewRetailerToOrder() {
  yield takeLatest(ActionTypes.REQUEST_ASSIGN_NEW_RETAILER_TO_ORDER, assignNewRetailerToOrder)
}

function* watchAssignNewDeliveryAgentToOrder() {
  yield takeLatest(ActionTypes.REQUEST_ASSIGN_NEW_DP_TO_ORDER, assignNewDeliveryAgentToOrder)
}

function* watchCreateNote() {
  yield takeLatest(ActionTypes.REQUEST_CREATE_NOTE, createNote)
}

function* watchFetchNotes() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_NOTES, fetchNotes)
}

function* watchFetchCustomerDetails() {
  yield takeLatest(ActionTypes.REQUEST_FETCH_CUSTOMER_DETAILS, fetchCustomerDetails)
}

function* watchValidateCart() {
  yield takeLatest(ActionTypes.REQUEST_VALIDATE_ORDER, validateOrder)
}

function* watchPlaceOrder() {
  yield takeLatest(ActionTypes.REQUEST_PLACE_ORDER, placeOrder)
}

export default function* rootSaga() {
  yield all([
    fork(watchFetchLiveOrders),
    fork(watchFetchLiveAssignedOrders),
    fork(watchFetchLiveUnassignedOrders),
    fork(watchFetchHistoryOrders),
    fork(watchFetchNeedToBeCancelledOrders),
    fork(watchFetchAttemptedOrders),
    fork(watchUnavailableDp),
    fork(watchFetchReturningOrders),
    fork(watchRestockOrder),
    fork(watchSearchLiveOrders),
    fork(watchSearchLiveAssignedOrders),
    fork(watchSearchLiveUnassignedOrders),
    fork(watchSearchHistoryOrders),
    fork(watchFilterOrdersData),
    fork(watchFetchOrderDetail),
    fork(watchForceRedeem),
    fork(watchAssignOrder),
    fork(watchSkipRetailer),
    fork(watchSkipDeliverer),
    fork(watchCancelOrder),
    fork(watchConfirmRetailer),
    fork(watchConfirmDeliverer),
    fork(watchSetLoading),
    fork(watchSetLoadingAll),
    fork(watchAutoPilot),
    fork(watchFetchAutoPilotStatus),
    fork(watchFetchPlotData),
    fork(watchDeleteItemFromCart),
    fork(watchAddItemToCart),
    fork(watchAssignNewRetailerToOrder),
    fork(watchAssignNewDeliveryAgentToOrder),
    fork(watchCreateNote),
    fork(watchFetchNotes),
    fork(watchFetchCustomerDetails),
    fork(watchValidateCart),
    fork(watchPlaceOrder)
  ])
}