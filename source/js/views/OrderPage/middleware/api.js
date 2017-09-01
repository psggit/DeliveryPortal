import { GET, POST } from '@utils/fetch'

export function fetchOrdersData(action) {
  console.log(action)
  return POST({
    api: action.api,
    data: action.data,
    type: 'Public'
  })
  .then(json => json)
}

export function fetchOrderDetail(action) {
  return POST({
    api: `/deliveryStatus/orderStatus/`,
    data: action.data,
    type: 'Public'
  })
  .then(json => json)
}


export function assignOrder(action) {
  return POST({
    api: `/deliveryStatus/assignSupport`,
    data: action.data,
    type: 'Public'
  })
  .then(json => json)
}

export function skipRetailer(action) {
  return POST({
    api: `https://api1.hearsay81.hasura-app.io/support/skip_retailer`,
    data: action.data,
    type: 'Public',
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