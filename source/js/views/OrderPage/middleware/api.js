import { GET, POST } from '@utils/fetch'

export function fetchOrdersData(action) {
  return POST({
    api: action.api,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function fetchLiveOrders(action) {
  return POST({
    api: `/deliveryStatus/liveOrders`,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function fetchLiveAssignedOrders(action) {
  return POST({
    api: `/deliveryStatus/liveAssignedOrders`,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function fetchLiveUnassignedOrders(action) {
  return POST({
    api: `/deliveryStatus/liveUnassignedOrders`,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function fetchHistoryOrders(action) {
  return POST({
    api: `/deliveryStatus/orderHistory`,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function searchLiveOrders(action) {
  return POST({
    api: `/deliveryStatus/searchLiveOrders`,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function searchLiveAssignedOrders(action) {
  return POST({
    api: `/deliveryStatus/searchLiveAssignedOrders`,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function searchLiveUnassignedOrders(action) {
  return POST({
    api: `/deliveryStatus/searchLiveUnassignedOrders`,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function searchHistoryOrders(action) {
  return POST({
    api: `/deliveryStatus/searchHistoryOrders`,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function fetchOrderDetail(action) {
  return POST({
    api: `/deliveryStatus/orderStatus`,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}


export function assignOrder(action) {
  return POST({
    api: `/deliveryStatus/assignSupport`,
    apiBase: 'gremlinUrl',
    data: action.data,

  })
  .then(json => json)
}

export function skipRetailer(action) {
  return POST({
    api: `/support/skip_retailer`,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function skipDeliverer(action) {
  return POST({
    api: `/support/skip_dp`,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function forceRedeem(action) {
  return POST({
    api: `/support/force_redeem`,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function cancelOrder(action) {
  return POST({
    api: `/support/cancel`,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function confirmRetailer(action) {
  return POST({
    api: `/support/confirmRetailer`,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function confirmDeliverer(action) {
  return POST({
    api: `/support/confirmDp`,
    apiBase: 'blogicUrl',
    data: action.data
  })
}