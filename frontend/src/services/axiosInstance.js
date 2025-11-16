import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
}

);

// Automatically attach latest token from localStorage for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;