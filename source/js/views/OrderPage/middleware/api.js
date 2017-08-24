import { GET, POST } from '@utils/fetch'

export function fetchOrdersData(action) {
  console.log(action)
  return POST({
    api: `/deliveryStatus/liveOrders`,
    data: {
      offset: action.data.offset,
      limit: action.data.limit
    },
    type: 'Public'
  })
  .then(json => json)
}
