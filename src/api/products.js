import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
// console.log(BASE_URL);

const extractData = response => response.data;

export function getAll() {
  return axios.get(`${BASE_URL}/products`).then(extractData);
}
export function getOne(id) {
  return axios.get(`${BASE_URL}/products/${id}`).then(extractData);
}
