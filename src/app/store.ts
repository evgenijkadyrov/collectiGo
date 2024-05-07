import { configureStore } from '@reduxjs/toolkit'
import { collections } from './collections-reducer'
import { items } from './items-reducer'

export const store = configureStore({
  reducer: {
    collections,
    items: items,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
