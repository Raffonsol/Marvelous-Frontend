import axios from 'axios';

const axiosInstance = axios.create({ withCredentials: true });

const onRequest = (config) => config;

const onRequestError = (error) => Promise.reject(error);

const onResponse = (response) => response;

const onResponseError = (error) => Promise.reject(error);

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export const getTasks = async () => {
  const { data } = await axiosInstance.get(
    `http://localhost:4200/Tasks`,
  );
  return data;
};

export const addTask = async (name) => {
  console.log('piost', name);
  const { data } = await axiosInstance.post(
    `http://localhost:4200/Task`, {
      name,
    }
  );
  return data;
};
