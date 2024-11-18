import axios from 'axios';

const publicAxios = axios.create({
  baseURL: import.meta.env.VITE_API,
});
const privateAxios = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const apiClient = {
  public: publicAxios,
  private: privateAxios,
};
