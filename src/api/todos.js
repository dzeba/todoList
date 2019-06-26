import axios from "axios";

const BASE_URL = "http://localhost:3004";
const extractData = response => response.data;

export function getOne() {
  return axios.get(`${BASE_URL}/names/1`).then(extractData);
}

export function getAll() {
  return axios.get(`${BASE_URL}/todos`).then(({ data }) => data);
}

export function create(newItem) {
  return axios.post(`${BASE_URL}/todos`, newItem).then(({ data }) => data);
}
export function saveName(name) {
  return axios
    .put(`${BASE_URL}/names/1`, name)
    .then(extractData);
}
export function saveTask(task) {
  return axios
    .put(`${BASE_URL}/task/1`, task)
    .then(extractData);
}
export function getTask() {
  return axios.get(`${BASE_URL}/task/1`).then(extractData);
}
export function deleteItem(itemId) {
  return axios.delete(`${BASE_URL}/todos/${itemId}`).then(({ data }) => data);
}
