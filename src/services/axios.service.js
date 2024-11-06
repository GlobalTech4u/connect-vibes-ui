import axios from "axios";

import { logout } from "helpers/auth.helper";
import { getUser } from "helpers/user.helper";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

const initializeAxios = (token, refreshToken) => {
  axiosInstance.defaults.headers.Authorization = token
    ? `Bearer ${token}` || ""
    : "";

  axiosInstance.defaults.headers["Refresh-Token"] = refreshToken || "";

  axiosInstance.interceptors.response.use(
    function (response) {
      // Check if new tokens are present in the response headers
      const newAccessToken = response.headers["authorization"];
      const newRefreshToken = response.headers["refresh-token"];

      if (newAccessToken && newRefreshToken) {
        const user = getUser();
        const newToken = newAccessToken.split(" ")[1];

        if (newToken !== user?.token) {
          const newUser = {
            ...user,
            token: newToken,
            refreshToken: newRefreshToken,
          };

          // Update tokens in local storage
          localStorage.setItem("user", newUser);
        }
      }

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
