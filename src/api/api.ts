import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://collecti-go-server.vercel.app',
})
