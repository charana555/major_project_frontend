import React from "react"
import { Navigate } from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Learn from "pages/Learn"
import Stats from "pages/Stats"
import About from "pages/About"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/learn", component: <Learn /> },
  { path: "/stats", component: <Stats /> },
  { path: "/about", component: <About /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]

const publicRoutes = []

export { authProtectedRoutes, publicRoutes }
