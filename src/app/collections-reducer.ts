import { ArtCollection } from '@/data/data'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '@/api/api'

const fetchCollections = createAsyncThunk('auth/fetchCollections', async () => {
  try {
    const res = await instance.get<ArtCollection[]>('/auth/collections')
    return res.data
  } catch (error: any) {
    console.log('error', error)
    throw new Error(`Error login user: ${error.response.data.message}`)
  }
})

const initialState: ArtCollection[] = []
const slice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    changeTodolistFilter: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCollections.fulfilled, (_, action) => {
      return [...action.payload]
    })
  },
})

export const collections = slice.reducer
export const collectionsActions = slice.actions
export const collectionsThunk = { fetchCollections }
