import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { collections } from './collections-reducer'
import { items } from './items-reducer'
import { auth } from '@/app/auth-reducer'
import { ArtCollection } from '@/data/data'

const rootReducer = combineReducers({
  collections,
  items,
  auth,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type RootStateType = {
  collections: ArtCollection[]
  items: any
  auth: {
    isLoggedIn: boolean
  }
}
export type AppDispatch = typeof store.dispatch
