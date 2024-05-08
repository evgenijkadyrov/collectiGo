import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance, UserDataType } from '@/api/auth'

const login = createAsyncThunk<{ value: boolean }, { data: UserDataType }>(
  'auth/login',
  async (arg) => {
    try {
      const res = await instance.post('/auth/login', arg.data)
      if (res.data.token) {
        return { value: true }
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
}
const initialState = {
  isLoggedIn: false,
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
      })
      .addCase(logout.fulfilled, (state: InitialStateType) => {
        state.isLoggedIn = false
      })
  },
})

export const auth = slice.reducer
export const authActions = slice.actions
export const authThunk = { login, logout }
