import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // replace localhost 127.0.0.1:8000 with your domain
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
  },
});

axios.interceptors.response.use(null, (err) => {
  console.log(err);
});
