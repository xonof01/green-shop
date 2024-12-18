import axios from "axios";
import { API } from "./getEnv";

const instance = axios.create({ baseURL: API });

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const newConfig = config;

  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance };
