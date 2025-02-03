import axios from "axios";

const axiosInstance = axios.create({
  baseURL: window.APP_CONFIG?.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json", // Define default headers here
  },
});

// Intercept requests to add the JWT token
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("accessToken"); // Get token from localStorage
    console.log("BASE API URL: " + window.APP_CONFIG?.VITE_BASE_API_URL);
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
