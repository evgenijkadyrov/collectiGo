import axios, { AxiosInstance } from 'axios'
//import {LoginResponse} from "@/hooks/useLoginUser";
import { DataRegisterType } from '@/hooks/useRegisterUser'

export const instance: AxiosInstance = axios.create({
  baseURL: 'https://collecti-go-server.vercel.app',
})
export interface UserDataType {
  email: string
  password: string
}
export const getUsers = async (token: string): Promise<any> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const users = await instance.get('/auth/users', config)
  return users.data
}

export const registerUser = async (userData: DataRegisterType): Promise<void> => {
  try {
    await instance.post('/auth/register', userData)
  } catch (error: any) {
    throw new Error(`Error register user: ${error.response.data.message}`)
  }
}

// export const login = async (userData: UserDataType): Promise<LoginResponse> => {
//   try {
//     const res = await instance.post("/auth/login", userData);
//     return res.data;
//   } catch (error:any) {
//     console.log('error',error)
//     throw new Error(`Error login user: ${error.response.data.message}`);
//   }
// };

export const logoutUser = (): void => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
  } catch (error: any) {
    throw new Error(`Error logout user: ${error.message}`)
  }
}

export const deleteUsers = async (usersEmail: string[]): Promise<void> => {
  try {
    await instance.delete('/auth/users/delete', {
      data: { usersEmail },
    })
  } catch (error: any) {
    throw new Error(`Error deleting users: ${error.response.data.message}`)
  }
}
