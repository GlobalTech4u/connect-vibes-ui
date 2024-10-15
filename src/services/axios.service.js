import axios from "axios";

import { logout } from "helpers/auth.helper";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

const initializeAxios = (token) => {
  axiosInstance.defaults.headers.Authorization = token
    ? `Bearer ${token}` || ""
    : "";

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error?.response?.status === 403) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export { axiosInstance as axios };
export default initializeAxios;
