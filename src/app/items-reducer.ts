import { ArtDataItemResponse, ArtItemCreate } from '@/data/data'
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { configApi, instance } from '@/api/api'
import { RootState } from '@/app/store'
import { message } from 'antd'

const fetchItems = createAsyncThunk('items/fetchItems', async (collectionId: string) => {
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
>('items/createItem', async (arg, thunkAPI) => {
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
const updateItem = createAsyncThunk<
  { item: ArtDataItemResponse; message: string },
  { itemId: string; itemData: Partial<ArtDataItemResponse> },
  { state: RootState }
>('items/updateItem', async (arg, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth
    const res = await instance.put(`/auth/items/${arg.itemId}`, arg.itemData, configApi(token))
    return res.data
  } catch (error: any) {
    throw new Error(`Error updating item: ${error.response.data.message}`)
  }
})
const deleteItem = createAsyncThunk<{ message: string }, { itemId: string }, { state: RootState }>(
  'items/deleteItem',
  async (arg, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth
      const res = await instance.delete(`/auth/items/${arg.itemId}`, configApi(token))
      return res.data
    } catch (error: any) {
      throw new Error(`Error deleting collection: ${error.response.data.message}`)
    }
  }
)

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
        state.items = action.payload.items
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
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const updatedItem = action.payload.item
        const itemIndex = state.items.findIndex((item) => item._id === updatedItem._id)
        if (itemIndex !== -1) {
          state.items[itemIndex] = updatedItem
        }
        state.isLoading = false
        message.success(action.payload.message)
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false
        message.error(action.error.message)
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const itemId = action.meta.arg.itemId
        state.items = state.items.filter((item) => item._id !== itemId)
        state.isLoading = false
        message.success(action.payload.message)
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false
        message.error(action.error.message)
      })
  },
})

export const items = slice.reducer
export const itemsActions = slice.actions
export const itemsThunk = { fetchItems, createItem, deleteItem, updateItem }
