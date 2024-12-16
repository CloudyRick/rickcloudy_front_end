// axiosInstance.ts
import axios from "axios";

const axiosInstance: Axios.AxiosInstance = axios.create({
  baseURL: "http://localhost:8088",
  headers: {
    "Content-Type": "application/json", // You can define default headers here
  },
  // Set your API's base URL
});

// Intercept requests to add the JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
