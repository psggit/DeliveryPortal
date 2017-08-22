import { takeLatest, delay } from 'redux-saga'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import * as Api from './api'

/**
 * Handlers
 */
function* fetchDataOnRouteChange(action) {
  try {
    // const { data, meta } = yield call(utils.getData, action)
    const data = {}
    const meta = {}
    yield put({type: ActionTypes.SUCCESS_FETCH_ORDERS_DATA, data, meta})
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


/**
 * Watchers
 */
export function* watchFetchDataOnRouteChange() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_ORDERS_DATA, fetchDataOnRouteChange)
  }
}

export function* watchFilterOrdersData() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FILTER_ORDERS_DATA, filterOrdersData)
  }
}

//
// export default function* rootSaga() {
//   yield [
//     fork(watchFetchOrdersData)
//   ]
// }