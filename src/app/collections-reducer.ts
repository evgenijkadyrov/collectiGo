import { ArtCollection } from '@/data/data'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ArtCollection[] = []
const slice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    changeTodolistFilter: () => {},
  },
  extraReducers: () => {},
})

export const collections = slice.reducer
export const collectionsActions = slice.actions
export const collectionsThunk = {}
