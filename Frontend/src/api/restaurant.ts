import axios from "./axios";

export const getRestaurantsRequest = (city: string) => {
  return axios.get(`/restaurants`, { params: { city } });
};

export const saveRestaurantsRequest = (cityData: any) => {
  return axios.post(`/restaurants`, cityData);
};

export const showHistoricalRequest = () => axios.get(`/restaurants/history`);
