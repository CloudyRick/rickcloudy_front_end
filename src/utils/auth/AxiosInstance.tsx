import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rickcloudy.com/api",
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
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
