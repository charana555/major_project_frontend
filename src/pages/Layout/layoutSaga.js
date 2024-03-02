// @flow
import { all, call, fork, takeEvery } from "redux-saga/effects"

import {
  changeLayout,
  changeLayoutWidth,
  changeTopbarTheme,
  changeLayoutMode,
} from "./layoutSlice"

/**
 * Changes the body attribute
 */
function changeBodyAttribute(attribute, value) {
  if (document.body) document.body.setAttribute(attribute, value)
  return true
}

function changeHTMLAttribute(attribute, value) {
  if (document.documentElement)
    document.documentElement.setAttribute(attribute, value)
  return true
}

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeLayoutFunc({ payload: layout }) {
  try {
    if (layout === "horizontal") {
      // yield put(changeTopbarThemeAction("dark"))
      document.body.removeAttribute("data-sidebar")
      document.body.removeAttribute("data-sidebar-image")
      document.body.removeAttribute("data-sidebar-size")
    } else {
      // yield put(changeTopbarThemeAction("light"))
    }
    yield call(changeBodyAttribute, "data-layout", layout)
  } catch (error) {}
}

/**
 * Changes the layout mode
 * @param {*} param0
 */
function* changeLayoutModeFunc({ payload: mode }) {
  try {
    yield call(changeHTMLAttribute, "data-bs-theme", mode)
  } catch (error) {
    // console.log(error);
  }
}
// હા, અમે હવે નીચેની લિંક આપી છે ઉદાહરણ તરીકે ગ્રીડ ડેટા ટેબલને સૉર્ટ કરવા.
/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidthFunc({ payload: width }) {
  try {
    if (width === "boxed") {
      yield call(changeBodyAttribute, "data-layout-size", width)
      yield call(changeBodyAttribute, "data-layout-scrollable", false)
    } else if (width === "scrollable") {
      yield call(changeBodyAttribute, "data-layout-scrollable", true)
    } else {
      yield call(changeBodyAttribute, "data-layout-size", width)
      yield call(changeBodyAttribute, "data-layout-scrollable", false)
    }
  } catch (error) {}
}

/**
 * Changes the topbar theme
 * @param {*} param0
 */
function* changeTopbarThemeFunc({ payload: theme }) {
  try {
    yield call(changeBodyAttribute, "data-topbar", theme)
  } catch (error) {}
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
  yield takeEvery(changeLayout.type, changeLayoutFunc)
}

export function* watchChangeLayoutWidth() {
  yield takeEvery(changeLayoutWidth.type, changeLayoutWidthFunc)
}

export function* watchChangeTopbarTheme() {
  yield takeEvery(changeTopbarTheme.type, changeTopbarThemeFunc)
}

export function* watchSChangeLayoutMode() {
  yield takeEvery(changeLayoutMode.type, changeLayoutModeFunc)
}

function* rootSaga() {
  yield all([
    fork(watchSChangeLayoutMode),
    fork(watchChangeLayoutType),
    fork(watchChangeLayoutWidth),
    fork(watchChangeTopbarTheme),
  ])
}

export default rootSaga
