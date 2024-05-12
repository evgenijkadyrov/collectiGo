import axios from 'axios'

export const configApi = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
export const instance = axios.create({
  baseURL: 'https://collecti-go-server.vercel.app',
})
