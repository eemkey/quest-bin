import axios from 'axios'
//import { response } from 'express';

const baseUrl = 'http://localhost:3001';

const createNewBin = async () => {
  const request = axios.post(`${baseUrl}/bins`);
  return request.then(response => response.data);
}

const getBin = async (binId) => {
  console.log(binId)
  const request = axios.get(`${baseUrl}/${binId}`);
  return request.then(response => response.data);
}

const inspectBin = async (binId) => {
  const request = axios.get(`${baseUrl}/bin/${binId}`);
  return request.then(response => response.data.requests);
}

export { createNewBin, getBin, inspectBin }
