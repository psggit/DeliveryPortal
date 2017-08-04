import * as orderPageSaga from './views/OrderPage/middleware/api'
import { fork } from 'redux-saga/effects'

const views = [orderPageSaga]
// console.log(views[0]);

export default function* rootSaga() {
  for(let i=0; i<views.length; i++) {
    for(let saga in views[i]) {
      console.log(views[i][saga]);
      yield [
        fork(views[i][saga])
      ]
    }
  }
}
