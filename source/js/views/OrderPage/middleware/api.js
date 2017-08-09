import { GET } from '@utils/fetch'

export function fetchDataOnRouteChange() {
  return GET({
    api: `https://jsonplaceholder.typicode.com/posts`,
    type: 'Public',
    cors: false,
    handleError: true
  })
  .then(json => json)
}
