import { GET } from '@utils/fetch'

export function fetchDataOnRouteChange() {
  return GET({
    api: `https://jsonplaceholder.typicode.com/posts/1`,
    type: 'Public',
    cors: true
    // handleError: true
  })
  .then((json) => (json))
}
