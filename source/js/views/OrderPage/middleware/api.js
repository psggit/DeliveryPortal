import { GET, POST } from '@utils/fetch'

export function fetchOrdersData(action) {
  return POST({
    api: action.api,
    apiBase: 'gremlinUrl',
    data: action.data
  })
  .then(json => json)
}

export function fetchOrderDetail(action) {
  return POST({
    api: `/deliveryStatus/orderStatus/`,
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