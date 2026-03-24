import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  withCredentials: true, // cookie send karega automatically
  headers: {
    "Content-Type": "application/json",
  },
});
// interceptors
// Every api call mai chalege
// Har response pehle interceptors ke pass ayega
// Har response shi hai toh return kar dega
// Agar request fail hogi ya koi error  aayegi(network error, 401, 500 etc)
// toh (error) => {} wala block chalega
// Axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
// if (error.response?.status === 401) {
// // token expired / invalid
// window.location.href = "/signin";
// token expired ya invalid
// window.dispatchEvent(new Event("unauthorized"));
// }
// return Promise.reject(error);
//   },
// );
export default Axios;
