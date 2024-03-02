import { all, fork } from "redux-saga/effects"

//public

import LayoutSaga from "./layoutSaga"

export default function* rootSaga() {
  yield all([
    //public

    fork(LayoutSaga),
  ])
}
