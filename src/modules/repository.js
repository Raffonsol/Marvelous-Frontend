import axios from 'axios';

const axiosInstance = axios.create({ withCredentials: true });

const onRequest = (config) => config;

const onRequestError = (error) => Promise.reject(error);

const onResponse = (response) => response;

const onResponseError = (error) => Promise.reject(error);

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export const getTasks = async (status) => {
  const { data } = await axiosInstance.get(
    `http://localhost:4200/Tasks?status=${status}`,
  );
  return data;
};

export const addTask = async (name) => {
  const { data } = await axiosInstance.post(
    `http://localhost:4200/Task`, {
      name,
    }
  );
  return data;
};

export const updateTask = async (id) => {
  const { data } = await axiosInstance.patch(
    `http://localhost:4200/Task/${id}`
  );
  return data;
};

export const deleteTasks = async (status) => {
  const { data } = await axiosInstance.delete(
    `http://localhost:4200/Tasks${status ? `?status=${status}` : ''}`,
  );
  return data;
};