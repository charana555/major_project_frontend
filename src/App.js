import React from "react"
import { Routes, Route } from "react-router-dom"
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"

// Import all middleware
// import Authmiddleware from "./routes/route"

// layouts Format
import Layout from "./pages/Layout"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              // <Authmiddleware>
              <Layout>{route.component}</Layout>
              // </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  )
}

export default App
