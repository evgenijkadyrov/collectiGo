import { ArtCollectionCreate, ArtCollectionResponse } from '@/data/data'
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '@/api/api'

const fetchCollections = createAsyncThunk('auth/fetchCollections', async () => {
  try {
    const res = await instance.get<ArtCollectionResponse[]>('/auth/collections')
    return res.data
  } catch (error: any) {
    console.log('error', error)
    throw new Error(`Error login user: ${error.response.data.message}`)
  }
})
const createCollection = createAsyncThunk<
  { collection: ArtCollectionResponse; message: string },
  { data: ArtCollectionCreate; token: string }
>('auth/collections', async (arg) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${arg.token}`,
      },
    }
    const res = await instance.post('/auth/collections', arg.data, config)
    return res.data
  } catch (error: any) {
    console.log('error', error)
    throw new Error(`Error login user: ${error.response.data.message}`)
  }
})
const initialState: Array<ArtCollectionResponse> = []
const slice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    changeTodolistFilter: () => {},
  },
  extraReducers: (builder: ActionReducerMapBuilder<ArtCollectionResponse[]>) => {
    builder
      .addCase(fetchCollections.fulfilled, (_, action) => {
        return [...action.payload]
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.collection })
      })
  },
})

export const collections = slice.reducer
export const collectionsActions = slice.actions
export const collectionsThunk = { fetchCollections, createCollections: createCollection }
