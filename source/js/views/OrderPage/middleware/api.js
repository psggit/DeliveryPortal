import { GET, POST } from '@utils/fetch'

export function fetchOrdersData(action) {
  console.log(action)
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
    data: action.data
  })
  .then(json => json)
}


export function assignOrder(action) {
  return POST({
    api: `/deliveryStatus/assignSupport`,
    data: action.data,

  })
  .then(json => json)
}

export function skipRetailer(action) {
  return POST({
    api: `https://api1.hearsay81.hasura-app.io/support/skip_retailer`,
    data: action.data,
    prependBaseUrl: false
  })
}

export function skipDeliverer(action) {
  return POST({
    api: `https://api1.hearsay81.hasura-app.io/support/skip_dp`,
    data: action.data,
    type: 'Public',
    prependBaseUrl: false
  })
}

export function forceRedeem(action) {
  return POST({
    api: `https://api1.hearsay81.hasura-app.io/support/force_redeem`,
    data: action.data,
    prependBaseUrl: false
  })
}

export function cancelOrder(action) {
  return POST({
    api: `https://api1.hearsay81.hasura-app.io/support/cancel`,
    data: action.data,
    prependBaseUrl: false
  })
}