import { postWithFile } from "./api_helper"
import * as URL from "./url_helper"

const getPredictionFunction = data =>
  postWithFile(URL.GET_IMAGE_PREDICTION, data)

export { getPredictionFunction }
