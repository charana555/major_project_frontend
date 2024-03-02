import React from "react"
import { Container } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
const Learn = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={"Learn"} breadcrumbItem={"Learn"} />
        </Container>

        <Container
          style={{
            display: "grid",
            placeItems: "center",
            minHeight: "50vh",
            fontSize: "30px",
          }}
        >
          Coming Soon...
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Learn
