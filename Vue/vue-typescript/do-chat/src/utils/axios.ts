import axios, { AxiosInstance } from "axios";
import store from "@/store";

const baseURL = process.env.NODE_ENV === "dev" ? "/api" : "/api";
const instance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 12000,
});

instance.interceptors.request.use((config) => {
  if (store) {
    const token = store.getters["userStore/token"];
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    return response;
  }
);

export const ins = instance;
