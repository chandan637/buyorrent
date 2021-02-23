import axios from "axios";
import { API_URL } from "../constants/commonConstants";

const preLoginUrls = ["login"];
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config["baseURL"] = API_URL;
    // Add Auth Header
    if (!preLoginUrls.includes(config.url || "")) {
      console.log("====post login calls");
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    const url = response?.config?.url;
    const status = response?.status;
    if(['login','google-success'].includes(url || '') && status===200){
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(response?.data?.data));
      window.location.href = '/list-property';
    }
    else if(url === '/logout' && status === 200){
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user');
      localStorage.clear();
      window.location.href = '/login';
    }
    return response;
  },
  function (error) {
    // Do something with response error
    const errorMsg =
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message;
    if (errorMsg) {
      alert(errorMsg);
    }
    return Promise.reject(error);
  }
);

export default axios;
