import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserDataType } from '@/api/auth'
import { instance } from '@/api/api'
import { DataRegisterType } from '@/hooks/useRegisterUser'
import { collectionsThunk } from '@/app/collections-reducer'
import { message } from 'antd'

const login = createAsyncThunk<
  { value: boolean; token: string; user: UserResponse; message: string },
  { data: UserDataType },
  { rejectValue: unknown }
>('auth/login', async (arg, thunkAPI) => {
  try {
    const res = await instance.post<{ token: string; user: UserResponse; message: string }>(
      '/auth/login',
      arg.data
    )
    if (res.data) {
      return {
        value: true,
        token: res.data.token,
        user: res.data.user,
        message: res.data.message,
      }
    }
  } catch (error: any) {
    throw new Error(`Error login user: ${error.response.data.message}`)
  }
  return thunkAPI.rejectWithValue('Unexpected response')
})

const register = createAsyncThunk<{ value: boolean }, { data: DataRegisterType }>(
  'auth/register',
  async (arg) => {
    try {
      const res = await instance.post('/auth/register', arg.data)

      return res.data
    } catch (error: any) {
      throw new Error(`Error register user: ${error.response.data.message}`)
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
  message: string
}
const initialState: InitialStateType = {
  isLoggedIn: false,
  token: '',
  user: {
    collections: [],
    email: '',
    lastLogin: '',
    name: '',
    password: '',
    status: '',
    _id: '',
  },
  message: '',
}
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = ''
    },
    logout: () => initialState,
  },
  extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value
        state.token = action.payload.token
        state.user = action.payload.user
        message.success(action.payload.message)
      })
      .addCase(login.rejected, (_, action) => {
        message.error(action.error.message)
      })
      .addCase(collectionsThunk.createCollection.fulfilled, (state, action) => {
        state.user.collections.unshift(action.payload.collection._id)
      })
      .addCase(collectionsThunk.deleteCollection.fulfilled, (state, action) => {
        state.user.collections = state.user.collections.filter(
          (collection) => collection !== action.meta.arg.collectionId
        )
      })
  },
})

export const auth = slice.reducer

export const { clearMessage, logout } = slice.actions
export const authThunk = { login, register }
