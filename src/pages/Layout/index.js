import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

//actions
import {
  changeLayout,
  changeTopbarTheme,
  changeLayoutWidth,
  changeLayoutMode,
} from "./layoutSlice"

import {
  selectCurrentTopbarTheme,
  selectCurrentLayoutMode,
  selectCurrentLayoutWidth,
} from "./layoutSlice"

//redux
import { useSelector, useDispatch } from "react-redux"

//components
import Navbar from "./Navbar"
import Header from "./Header"
import Footer from "./Footer"

const Layout = props => {
  const dispatch = useDispatch()

  const layoutWidth = useSelector(selectCurrentLayoutWidth)
  const layoutModeType = useSelector(selectCurrentLayoutMode)
  const topbarTheme = useSelector(selectCurrentTopbarTheme)

  /*
  document title
  */

  const pathName = useLocation()

  useEffect(() => {
    const title = pathName.pathname
    let currentage = title.charAt(1).toUpperCase() + title.slice(2)

    document.title = currentage + " | Skote - React Admin & Dashboard Template"
  }, [pathName.pathname])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  //hides right sidebar on body click

  /*
  layout settings
  */
  useEffect(() => {
    dispatch(changeLayout("horizontal"))
  }, [dispatch])

  useEffect(() => {
    if (layoutModeType) {
      dispatch(changeLayoutMode(layoutModeType))
    }
  }, [dispatch, layoutModeType])

  useEffect(() => {
    if (topbarTheme) {
      dispatch(changeTopbarTheme(topbarTheme))
    }
  }, [dispatch, topbarTheme])

  useEffect(() => {
    if (layoutWidth) {
      dispatch(changeLayoutWidth(layoutWidth))
    }
  }, [dispatch, layoutWidth])

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header />
        <Navbar />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>

      {/* {showRightSidebar ? <RightSidebar /> : null} */}
    </React.Fragment>
  )
}

export default Layout
