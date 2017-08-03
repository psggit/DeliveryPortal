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
}


export function filterOrdersList(filter) {
  return {
    type: ActionTypes.REQUEST_FILTER_ORDERS_LIST,
    data: filter
  }
}

export function fetchDataOnRouteChange(routeName) {
  return {
    type: ActionTypes.REQUEST_FETCH_ORDERS_LIST,
    data: routeName
  }
}

export function assignOrder(id) {
  return {
    type: ActionTypes.REQUEST_ASSIGN_ORDER,
    data: id
  }
}

export function testAction() {
  return {
    type: ActionTypes.TEST_ACTION,
  };
}

// Async action example

function testAsyncStart() {
  return {
    type: TEST_ASYNC_ACTION_START,
  };
}

function testAsyncSuccess(data) {
  return {
    type: TEST_ASYNC_ACTION_SUCCESS,
    data,
  };
}

function testAsyncError(error) {
  return {
    type: TEST_ASYNC_ACTION_ERROR,
    error,
  };
}

export function testAsync() {
  return function (dispatch) {
    dispatch(testAsyncStart());

    api.testAsync()
      .then(data => dispatch(testAsyncSuccess(data)))
      .catch(error => dispatch(testAsyncError(error)));
  };
}

// Update
