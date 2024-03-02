import { createSlice } from "@reduxjs/toolkit"
import {
  layoutModeTypes,
  layoutTypes,
  layoutWidthTypes,
  topBarThemeTypes,
} from "../../constants/layout"

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    layoutType: layoutTypes.HORIZONTAL,
    layoutModeType: layoutModeTypes.LIGHT,
    layoutWidth: layoutWidthTypes.FLUID,
    topbarTheme: topBarThemeTypes.LIGHT,
    isMobile: false,
    leftMenu: false,
  },
  reducers: {
    changeLayout: (state, action) => {
      state.layoutType = action.payload
    },
    changeLayoutMode: (state, action) => {
      state.layoutModeType = action.payload
    },
    changeLayoutWidth: (state, action) => {
      state.layoutWidth = action.payload
    },
    changeTopbarTheme: (state, action) => {
      state.topbarTheme = action.payload
    },
    toggleLeftmenu: (state, action) => {
      state.leftMenu = action.payload
    },
  },
})

export default layoutSlice.reducer

export const {
  changeLayout,
  changeLayoutMode,
  changeLayoutWidth,
  changeTopbarTheme,
  toggleLeftmenu,
} = layoutSlice.actions

export const selectCurrentLayout = state => state.layout.layoutType
export const selectCurrentLayoutMode = state => state.layout.layoutModeType
export const selectCurrentLayoutWidth = state => state.layout.layoutWidth
export const selectCurrentTopbarTheme = state => state.layout.topbarTheme
export const selectCurrentLeftmenu = state => state.layout.leftMenu
