import axios from "axios";
import { getLSItem } from "../helpers/LSHelpers";

class AxiosInstance {
  token = getLSItem("userToken");

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token, // Token
      },
    });

    // Interceptors for request and response
    this.instance.interceptors.request.use(this.handleRequest);
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  // Method to handle request
  handleRequest(config) {
    // You can modify request headers, add authentication tokens, etc. here
    return config;
  }

  // Method to handle response
  handleResponse(res) {
    return res.data;
  }

  // Method to handle error
  handleError(err) {
    console.error(err.message);
    return;
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

  // Add more methods as needed (PUT, DELETE, etc.)
}

export const axiosInstance = new AxiosInstance();
