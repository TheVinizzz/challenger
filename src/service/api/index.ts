import axios from "axios";

export const urlApplication = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: urlApplication,
});

export const apiMock = axios.create({
  baseURL: import.meta.env.VITE_MOCK_API_URL,
});
