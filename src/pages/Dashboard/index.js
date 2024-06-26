import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardSubtitle,
  Container,
} from "reactstrap"
import Dropzone from "react-dropzone"

import Barchart from "./Barchart"

import { getPredictionFunction } from "api/prediction"

import { jsPDF } from "jspdf"
// import "jspdf-autotable"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { Link } from "react-router-dom"
//i18n

const Dashboard = () => {
  //meta title
  document.title = "Dashboard | Geeks - Lung Cancer Detection"

  const [selectedFiles, setselectedFiles] = useState([])
  const [pdfContent, setPdfContent] = useState("")

  const [predictedResult, setPredictedResult] = useState({})

  const generatePdf = async () => {
    const data = new FormData()
    data.append("image", selectedFiles[0])

    const result = await getPredictionFunction(data)

    console.log(result.data)
    console.log(result.status)

    let prediction_obj = {}
    if (result.status === 200) {
      prediction_obj["Adenocarcinoma"] = result.data.prediction[0]
      prediction_obj["Large Cell Carcinoma"] = result.data.prediction[1]
      prediction_obj["Normal"] = result.data.prediction[2]
      prediction_obj["Squamous Cell Carcinoma"] = result.data.prediction[3]
    }

    setPredictedResult(prediction_obj)
    // const doc = new jsPDF()
    // doc.text("Lung Cancer Report", 10, 10)
    // // Add more content as needed
    // const pdfData = doc.output()
    // setPdfContent(pdfData)
  }

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title={"Dashboards"} breadcrumbItem={"Dashboard"} />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <h6 className="card-title">Upload your CT - Scan</h6>

                  <Form>
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Drop files here or click to upload.</h4>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <button
                      onClick={generatePdf}
                      type="button"
                      className="btn btn-primary "
                    >
                      Analyze and Generate Report
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {pdfContent && (
            <div>
              <iframe
                src={`data:application/pdf;base64,${btoa(pdfContent)}`}
                name="Report"
                width="100%"
                height="800px"
              ></iframe>
              {/* <button onClick={downloadPdf}>Download PDF</button> */}
            </div>
          )}

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-4 fs-2 fw-bold">
                    Predicted Results
                  </CardSubtitle>
                  {Object.values(predictedResult).length > 0 && (
                    <Row>
                      <Barchart data={Object.values(predictedResult)} />
                    </Row>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
