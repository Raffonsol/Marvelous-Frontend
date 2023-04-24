import axios from 'axios';
import { config } from '../lib/config'

const axiosInstance = axios.create({ withCredentials: true });

const onRequest = (config) => config;

const onRequestError = (error) => Promise.reject(error);

const onResponse = (response) => response;

const onResponseError = (error) => Promise.reject(error);

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

const apiUrl = config.url.API_URL

export const getTasks = async (status) => {
  const { data } = await axiosInstance.get(
    `${apiUrl}/Tasks?status=${status}`,
  );
  return data;
};

export const addTask = async (name) => {
  const { data } = await axiosInstance.post(
    `${apiUrl}/Task`, {
      name,
    }
  );
  return data;
};

export const updateTask = async (id) => {
  const { data } = await axiosInstance.patch(
    `${apiUrl}/Task/${id}`
  );
  return data;
};

export const deleteTasks = async (status) => {
  const { data } = await axiosInstance.delete(
    `${apiUrl}/Tasks${status ? `?status=${status}` : ''}`,
  );
  return data;
};