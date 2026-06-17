import Axios from "axios";

const axios = Axios.create({});

const serverUrl = "http://localhost:3005";
export const baseURL = `${serverUrl}`;

axios.defaults.timeout = 120000;
axios.interceptors.request.use(
    async function (config) {
    config.headers["Content-Type"] = "application/json";
    config.withCredentials = true;
    config.baseURL = baseURL;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
)

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === 403) {
      // Handle forbidden error
    }
    if (error?.response?.status === 401) {
      // Handle unauthorized error (e.g., log out the user)
    }
    throw error; // Propagate the error
  }
);

export default axios;