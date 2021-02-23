import axios from "./http";

export const loginUser = (data: any) => {
  return axios.post("login", data);
};

export const gLoginSuccess = (data: any) => {
  return axios.post("google-success", data);
};

export const logout = () => {
  return axios.post('/logout')
};
