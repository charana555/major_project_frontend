import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentLayoutMode } from "pages/Layout/layoutSlice"
import { changeLayoutMode } from "pages/Layout/layoutSlice"

const NonAuthLayout = props => {
  const dispatch = useDispatch()

  const layoutModeType = useSelector(selectCurrentLayoutMode)

  useEffect(() => {
    if (layoutModeType) {
      dispatch(changeLayoutMode(layoutModeType))
    }
  }, [layoutModeType, dispatch])

  return <React.Fragment>{props.children}</React.Fragment>
}

export default NonAuthLayout
