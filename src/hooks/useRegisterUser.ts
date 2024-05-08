import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '@/hooks/useActions'
import { authThunk } from '@/app/auth-reducer'

export interface DataRegisterType {
  name: string
  email: string
  password: string
}

export const useRegisterUser = () => {
  const [error, setError] = useState<string>()
  const navigate = useNavigate()
  const { register } = useActions(authThunk)

  const handleRegister = async (data: DataRegisterType) => {
    try {
      await register({ data })
      navigate('/login')
    } catch (error: any) {
      if (error) {
        setError(error.message)
      }
    }
  }

  return { error, handleRegister }
}
