import { useState } from 'react'
import { authThunk } from '@/app/auth-reducer'
import { UserDataType } from '@/api/auth'
import { useActions } from '@/hooks/useActions'

// export interface LoginResponse {
//     token: string;
//     user: {
//         name: string;
//         email: string;
//     };
// }

export const useLoginUser = () => {
  const [error, setError] = useState<string>()
  const { login } = useActions(authThunk)
  const loginUser = async (data: UserDataType) => {
    try {
      await login({ data })
    } catch (error: any) {
      setError(error.message)
    }
  }

  return { loginUser, error }
}
