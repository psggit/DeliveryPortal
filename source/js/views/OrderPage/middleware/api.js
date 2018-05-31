import { GET, POST, DELETE } from '@utils/fetch'

export function fetchOrdersData(action) {
  return POST({
    api: action.api,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function fetchLiveOrders(action) {
  return POST({
    api: `/deliveryStatus/liveOrders`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function fetchLiveAssignedOrders(action) {
  return POST({
    api: `/deliveryStatus/liveAssignedOrders`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function fetchLiveUnassignedOrders(action) {
  return POST({
    api: `/deliveryStatus/liveUnassignedOrders`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function fetchHistoryOrders(action) {
  return POST({
    api: `/deliveryStatus/orderHistory`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function fetchNeedToBeCancelledOrders(action) {
  return POST({
    api: `/deliveryStatus/cancellationOrders`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function fetchAttemptedOrders(action) {
  return POST({
    api: `/deliveryStatus/attemptedOrders`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function searchLiveOrders(action) {
  return POST({
    api: `/deliveryStatus/searchLiveOrders`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function searchLiveAssignedOrders(action) {
  return POST({
    api: `/deliveryStatus/searchLiveAssignedOrders`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function searchLiveUnassignedOrders(action) {
  return POST({
    api: `/deliveryStatus/searchLiveUnassignedOrders`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function searchHistoryOrders(action) {
  return POST({
    api: `/deliveryStatus/searchHistoryOrders`,
    apiBase: 'gremlinUrl',
    handleError: true,
    data: action.data
  })
  .then(json => json)
}

export function fetchOrderDetail(action) {
  return POST({
    api: `/deliveryStatus/orderStatus`,
    handleError: true,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}


export function assignOrder(action) {
  return POST({
    api: `/deliveryStatus/assignSupport`,
    handleError: true,
    apiBase: 'gremlinUrl',
    data: action.data,

  })
  .then(json => json)
}

export function skipRetailer(action) {
  return POST({
    api: `/support/skip_retailer`,
    handleError: true,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function skipDeliverer(action) {
  return POST({
    api: `/support/skip_dp`,
    handleError: true,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function forceRedeem(action) {
  return POST({
    api: `/support/force_redeem`,
    handleError: true,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function cancelOrder(action) {
  return POST({
    api: `/support/cancel`,
    handleError: true,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function confirmRetailer(action) {
  return POST({
    api: `/support/confirmRetailer`,
    handleError: true,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function confirmDeliverer(action) {
  return POST({
    api: `/support/confirmDp`,
    handleError: true,
    apiBase: 'blogicUrl',
    data: action.data
  })
}

export function autoPilot(action) {
  return POST({
    api: `/deliveryStatus/autoPilot`,
    handleError: true,
    apiBase: 'gremlinUrl',
    data: action.data
  })
}

export function fetchAutoPilotStatus(action) {
  return POST({
    api: `/deliveryStatus/autoPilotStatus`,
    handleError: true,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function fetchPlotData(action) {
  const data = POST({
    api: `/deliveryStatus/getPastLocations`,
    handleError: true,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
  return data
}

export function addItemToCart(action) {
  const data = POST({
    api: `/support/portal/cart/add`,
    handleError: true,
    apiBase: 'ordermanUrl',
    data: action.data
  })
  .then(json => json)
  return data
}

export function deleteItemFromCart(action) {
  const data = DELETE({
    api: `/support/portal/cart/delete`,
    handleError: true,
    apiBase: 'ordermanUrl',
    data: action.data
  })
  .then(json => json)
  return data
}

export function assignNewRetailerToOrder(action) {
  const data = POST({
    api: `/support/assignRetailer`,
    handleError: true,
    apiBase: 'deliverymanUrl',
    data: action.data
  })
  .then(json => json)
  return data
}

export function assignNewDeliveryAgentToOrder(action) {
  const data = POST({
    api: `/support/assignDp`,
    handleError: true,
    apiBase: 'deliverymanUrl',
    data: action.data
  })
  .then(json => json)
  return data
}

export function createNote(action) {
  const data = POST({
    api: `/deliveryStatus/notes`,
    handleError: true,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
  return data
}

export function fetchNotes(action) {
  const data = POST({
    api: `/deliveryStatus/fetchNotes`,
    handleError: true,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
  return data
}

export function fetchUnavailableDp(action) {
  const data = POST({
    api: `/support/unavailableDps`,
    handleError: true,
    apiBase: 'deliverymanUrl',
    data: action.data
  })
  .then(json => json)
  return data
}

export function fetchReturningOrders(action) {
  const data = POST({
    api: `/support/returningOrders`,
    handleError: true,
    apiBase: 'deliverymanUrl',
    data: action.data
  })
  .then(json => json)
  return data
}

export function restockOrder(action) {
  const data = POST({
    api: `/support/restock`,
    handleError: true,
    apiBase: 'deliverymanUrl',
    data: action.data
  })
  .then(json => json)
  return data
}
