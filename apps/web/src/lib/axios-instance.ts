import axios from 'axios'
import { Cookie } from './cookie'

export const AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL })
export const SecureAxiosInstance = axios.create({
   baseURL: import.meta.env.VITE_APP_API_URL,
})
SecureAxiosInstance.interceptors.request.use((config) => {
   config.headers.Authorization = 'Bearer ' + Cookie.get('access-token')
   return config
})
