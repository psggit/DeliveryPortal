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