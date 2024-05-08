import { DataRegisterType } from '@/hooks/useRegisterUser'
import { instance } from '@/api/api'

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

export const deleteUsers = async (usersEmail: string[]): Promise<void> => {
  try {
    await instance.delete('/auth/users/delete', {
      data: { usersEmail },
    })
  } catch (error: any) {
    throw new Error(`Error deleting users: ${error.response.data.message}`)
  }
}
