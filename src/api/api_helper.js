import axios from "axios"

// Function to get the access token from localStorage (or an authentication mechanism)
export const getAccessToken = () => {
  return localStorage.getItem("GeekUser")
}

export const setAccessToken = token => {
  if (token) {
    localStorage.setItem("GeekUser", token)
    return true
  } else {
    return false
  }
}
// Function to create an axios instance with the access token
const createAxiosInstance = () => {
  //   const token = getAccessToken()

  let API_URL = ""

  switch (process.env.REACT_APP_STATUS) {
    case "DEV":
      API_URL = process.env.REACT_APP_DEV_URL
      break
    case "STAGE":
      API_URL = process.env.REACT_APP_STAGE_URL
      break
    case "PROD":
      API_URL = process.env.REACT_APP_PROD_URL
      break

    default:
      API_URL = process.env.REACT_APP_LOCAL_URL
  }

  const axiosApi = axios.create({
    baseURL: API_URL,
    // headers: {
    //   common: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // },
  })

  axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  )

  return axiosApi
}

export async function get(url, config = {}) {
  const axiosApi = createAxiosInstance()
  return await axiosApi
    .get(url, { ...config })
    .then(response => response)
    .catch(error => error)
}

export async function post(url, data, config = {}) {
  const axiosApi = createAxiosInstance()
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response)
    .catch(error => error)
}

export async function put(url, data, config = {}) {
  const axiosApi = createAxiosInstance()
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response)
    .catch(error => error)
}

export async function del(url, config = {}) {
  const axiosApi = createAxiosInstance()
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response)
    .catch(error => error)
}

export async function postWithFile(url, data, config = {}) {
  const axiosApi = createAxiosInstance()
  return await axiosApi
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then(response => response)
    .catch(error => error)
}

export async function putWithFile(url, data, config = {}) {
  const axiosApi = createAxiosInstance()
  return await axiosApi
    .put(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
    .then(response => response)
    .catch(error => error)
}
