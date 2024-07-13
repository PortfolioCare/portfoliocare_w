import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // 设置默认的 Content-Type
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
