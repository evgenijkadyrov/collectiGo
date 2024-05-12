import { AnyAction, combineReducers, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { collections } from './collections-reducer'
import { items } from './items-reducer'
import { auth } from '@/app/auth-reducer'

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
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
