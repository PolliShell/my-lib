import axios from "axios";
import { getLSItem } from "../helpers/LSHelpers";

class AxiosInstance {
  token = getLSItem("userToken");

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    });

    this.instance.interceptors.request.use(this.handleRequest);
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  handleRequest(config) {
    return config;
  }

  handleResponse(res) {
    return res.data;
  }

  handleError(err) {
    return { ...err, status: false };
  }

  get(url, config) {
    return this.instance.get(url, config);
  }

  post(url, data, config) {
    return this.instance.post(url, data, config);
  }

  put(url, data, config) {
    return this.instance.put(url, data, config);
  }

  delete(url, data, config) {
    return this.instance.delete(url, data, config);
  }
}

export const axiosInstance = new AxiosInstance();
