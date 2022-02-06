import axios from 'axios'

const baseUrl = `${window.location.href}`

const createNewBin = async () => {
  const request = axios.post(`${baseUrl}bins`)
  return request.then((response) => response.data)
}

const getBin = async (binId) => {
  const request = axios.get(`${baseUrl}bin/${binId}`)
  return request.then((response) => response.data)
}

const inspectBin = async (binId) => {
  const request = axios.get(`${baseUrl}bin/${binId}`)
  return request.then((response) => response.data.requests)
}

export { createNewBin, getBin, inspectBin }
