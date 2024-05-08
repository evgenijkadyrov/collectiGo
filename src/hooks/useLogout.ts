import { Paths } from '@/Paths'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logoutUser } from '@/api/auth'

export const useLogout = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'))
  const userName = localStorage.getItem('name')

  const handleLogOut = () => {
    try {
      logoutUser()
      setIsAuthenticated(false)
      navigate(Paths.login)
    } catch (error) {
      console.log(error)
    }
  }

  return { userName, isAuthenticated, handleLogOut }
}
