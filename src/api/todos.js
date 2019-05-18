import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;
// console.log(BASE_URL);

const extractData = ({ data }) => data;

export default {
  getAll() {
    return axios.get(`${BASE_URL}/todos`).then(extractData);
  },
  create(newItem) {
    return axios.post(`${BASE_URL}/todos`, newItem).then(extractData);
  },
  deleteItem(itemId) {
    return axios.delete(`${BASE_URL}/todos/${itemId}`);
  }
};
