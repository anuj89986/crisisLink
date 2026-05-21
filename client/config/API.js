import axios from 'axios';

const base = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const API = axios.create({
  baseURL: base,
  withCredentials: true,
});

export default API;