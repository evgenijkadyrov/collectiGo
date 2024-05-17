import { ArtDataItemResponse, ArtItemCreate } from '@/data/data'
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { configApi, instance } from '@/api/api'
import { RootState } from '@/app/store'
import { message } from 'antd'

const fetchItems = createAsyncThunk('auth/fetchItems', async (collectionId: string) => {
  try {
    const res = await instance.get<initialStateType>(`/auth/collections/${collectionId}`)
    return res.data
  } catch (error: any) {
    console.log('error', error)
    throw new Error(`Error get collections: ${error.response.data.message}`)
  }
})
const createItem = createAsyncThunk<
  { item: ArtDataItemResponse; message: string },
  { data: ArtItemCreate; collectionId: string },
  { state: RootState }
>('auth/items', async (arg, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth
    const res = await instance.post(
      `/auth/collections/${arg.collectionId}`,
      arg.data,
      configApi(token)
    )
    return res.data
  } catch (error: any) {
    throw new Error(`Error item: ${error.response.data.message}`)
  }
})

export interface initialStateType {
  isLoading: boolean
  items: ArtDataItemResponse[]
}

const initialState: initialStateType = {
  isLoading: false,
  items: [],
}
const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    changeTodolistFilter: () => {},
  },
  extraReducers: (builder: ActionReducerMapBuilder<initialStateType>) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        debugger
        state.isLoading = false
      })
      .addCase(fetchItems.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.unshift(action.payload.item)
        message.success(action.payload.message)
      })
      .addCase(createItem.rejected, (_, action) => {
        message.error(action.error.message)
      })
  },
})

export const items = slice.reducer
export const itemsActions = slice.actions
export const itemsThunk = { fetchItems, createItem }
