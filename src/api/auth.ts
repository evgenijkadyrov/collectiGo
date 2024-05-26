import { configApi, instance } from '@/api/api'

export interface UserDataType {
  email: string
  password: string
}
export const getUsers = async (token: string): Promise<any> => {
  const users = await instance.get('/auth/users', configApi(token))
  return users.data
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
