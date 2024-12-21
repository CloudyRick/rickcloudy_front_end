import axios, { AxiosInstance, AxiosError } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8088",
  headers: {
    "Content-Type": "application/json", // Define default headers here
  },
});

// Intercept requests to add the JWT token
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
