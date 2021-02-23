import axios from "./http";

export const createProperty = (data: any) => {
  return axios.post("properties", data);
};

export const listProperty = () => {
  return axios.get(`properties`);
};

export const getProperty = (id: string) => {
  return axios.get(`properties/${id}`);
};

export const buyOrRentProperty = (id: string) => {
  return axios.post(`properties/${id}/buy-rent`);
};
