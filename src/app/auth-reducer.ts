import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserDataType } from '@/api/auth'
import { instance } from '@/api/api'
import { DataRegisterType } from '@/hooks/useRegisterUser'

const login = createAsyncThunk<{ value: boolean; token: string }, { data: UserDataType }>(
  'auth/login',
  async (arg) => {
    try {
      const res = await instance.post('/auth/login', arg.data)
      if (res.data.token) {
        return { value: true, token: res.data.token }
      }
      return res.data
    } catch (error: any) {
      console.log('error', error)
      throw new Error(`Error login user: ${error.response.data.message}`)
    }
  }
)

const logout = createAsyncThunk<void>('auth/logout', async () => {})
type InitialStateType = {
  isLoggedIn: boolean
  token: string
}
const register = createAsyncThunk<{ value: boolean }, { data: DataRegisterType }>(
  'auth/login',
  async (arg) => {
    try {
      const res = await instance.post('/auth/register', arg.data)

      return res.data
    } catch (error: any) {
      console.log('error', error)
      throw new Error(`Error login user: ${error.response.data.message}`)
    }
  }
)
const initialState = {
  isLoggedIn: false,
  token: '',
}
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeTodolistFilter: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state: InitialStateType, action) => {
        state.isLoggedIn = action.payload.value
        state.token = action.payload.token
      })
      .addCase(logout.fulfilled, (state: InitialStateType) => {
        state.isLoggedIn = false
      })
  },
})

export const auth = slice.reducer
export const authActions = slice.actions
export const authThunk = { login, logout, register }
