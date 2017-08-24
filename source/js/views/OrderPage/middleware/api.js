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
