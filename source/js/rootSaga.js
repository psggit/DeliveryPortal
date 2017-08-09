import * as orderPageSaga from './views/OrderPage/middleware/saga'
import { fork } from 'redux-saga/effects'

const views = [orderPageSaga]

export default function* rootSaga() {
  for(let i=0; i<views.length; i++) {
    for(let saga in views[i]) {
      yield [
        fork(views[i][saga])
      ]
    }
  }
}
