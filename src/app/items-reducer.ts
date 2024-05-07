import { ArtDataItem } from '@/data/data'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ArtDataItem[] = []
const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    changeTodolistFilter: () => {},
  },
  extraReducers: () => {},
})

export const items = slice.reducer
export const itemsActions = slice.actions
export const itemsThunk = {}
