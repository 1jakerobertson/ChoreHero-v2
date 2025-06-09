import axios from 'axios';

const API_URL = 'http://localhost:4500/api/tasks';

export const getTasks = (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = (taskData, token) => {
  return axios.post(API_URL, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = (taskId, taskData, token) => {
  return axios.put(`${API_URL}/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = (taskId, token) => {
  return axios.delete(`${API_URL}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
