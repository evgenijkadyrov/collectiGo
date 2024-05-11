import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserDataType } from '@/api/auth'
import { instance } from '@/api/api'
import { DataRegisterType } from '@/hooks/useRegisterUser'
import { collectionsThunk } from '@/app/collections-reducer'

const login = createAsyncThunk<
  { value: boolean; token: string; user: UserResponse },
  { data: UserDataType },
  { rejectValue: unknown }
>('auth/login', async (arg, thunkAPI) => {
  try {
    const res = await instance.post<{ token: string; user: UserResponse }>('/auth/login', arg.data)
    if (res.data) {
      return { value: true, token: res.data.token, user: res.data.user }
    }
  } catch (error: any) {
    console.log('error', error)
    throw new Error(`Error login user: ${error.response.data.message}`)
  }
  return thunkAPI.rejectWithValue('Unexpected response')
})

const logout = createAsyncThunk<void>('auth/logout', async () => {})

const register = createAsyncThunk<{ value: boolean }, { data: DataRegisterType }>(
  'auth/register',
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
interface UserResponse {
  collections: string[]
  email: string
  lastLogin: string
  name: string
  password: string
  status: string
  _id: string
}
type InitialStateType = {
  isLoggedIn: boolean
  token: string
  user: UserResponse
}
const initialState = {
  isLoggedIn: false,
  token: '',
  user: { collections: [], email: '', lastLogin: '', name: '', password: '', status: '', _id: '' },
}
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeTodolistFilter: () => {},
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(collectionsThunk.createCollection.fulfilled, (state, action) => {
        state.user.collections.unshift(action.payload.collection._id)
      })
      .addCase(logout.fulfilled, (state: InitialStateType) => {
        state.isLoggedIn = false
      })
  },
})

export const auth = slice.reducer
export const authActions = slice.actions
export const authThunk = { login, logout, register }
