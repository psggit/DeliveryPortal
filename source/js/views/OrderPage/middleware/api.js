import { GET } from '@utils/fetch'

export function fetchOrdersData() {
  return GET({
    api: `https://jsonplaceholder.typicode.com/posts`,
    type: 'Public',
    prependBaseUrl: false,
    handleError: true
  })
  .then(json => json)
}
