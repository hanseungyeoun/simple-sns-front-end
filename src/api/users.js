import axios from './axios';

export const join = async (data) => await axios.post(
  `http://localhost:8080/api/v1/users/join`,
  data
)

export const login = (data) => {
  return axios.post(`http://localhost:8080/api/v1/users/login`, data);
}

export const getUser = (data) => {
  return axios.post(`http://localhost:8080/api/v1/users/me`, data);
}

export const getUserDetails = (data) => {
  return axios.get(`http://localhost:8080/api/v1/users/me/details`);
}
