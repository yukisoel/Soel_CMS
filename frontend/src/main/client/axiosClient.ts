import axios from "axios";

export const axiosApiClient = axios.create({
  baseURL: '/api'
})

