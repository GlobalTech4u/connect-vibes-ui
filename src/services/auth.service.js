import { axios } from "services/axios.service";

import { URLS_CONSTANT } from "constants/url.constant";

const loginUser = async (payload) => {
  return axios.post(URLS_CONSTANT.login, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export { loginUser };
