import axios from 'axios';

const publicAxios = axios.create();
const privateAxios = axios.create();

export const apiClient = {
  public: publicAxios,
  privateAxios: privateAxios,
};
