import { ArtCollectionCreate, CategoryType } from '@/data/data'
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '@/api/api'
import { RootState } from '@/app/store'

export interface ArtCollectionResponse {
  _id: string
  title: string
  category: CategoryType
  picture: string
}
const configApi = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

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
  { data: ArtCollectionCreate },
  { state: RootState }
>('auth/collections', async (arg, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth
    const res = await instance.post('/auth/collections', arg.data, configApi(token))
    return res.data
  } catch (error: any) {
    throw new Error(`Error login user: ${error.response.data.message}`)
  }
})
const deleteCollection = createAsyncThunk<string, { collectionId: string }, { state: RootState }>(
  'auth/deleteCollection',
  async (arg, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth
      const res = await instance.delete(`/auth/collections/${arg.collectionId}`, configApi(token))
      return res.data
    } catch (error: any) {
      throw new Error(`Error deleting collection: ${error.response.data.message}`)
    }
  }
)
const updateCollection = createAsyncThunk<
  { collection: ArtCollectionResponse; message: string },
  { collectionId: string; collectionData: Partial<ArtCollectionResponse> },
  { state: RootState }
>('auth/updateCollection', async (arg, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth
    const res = await instance.put(
      `/auth/collections/${arg.collectionId}`,
      arg.collectionData,
      configApi(token)
    )
    return res.data
  } catch (error: any) {
    throw new Error(`Error updating collection: ${error.response.data.message}`)
  }
})

export interface CollectionsType {
  collections: ArtCollectionResponse[]
  isLoading: boolean
}

const initialState: CollectionsType = {
  collections: [],
  isLoading: false,
}
const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    changeTodolistFilter: () => {},
  },
  extraReducers: (builder: ActionReducerMapBuilder<CollectionsType>) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.collections = action.payload
        state.isLoading = false
      })
      .addCase(fetchCollections.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.collections.unshift(action.payload.collection)
      })
      .addCase(deleteCollection.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        const collectionId = action.meta.arg.collectionId
        state.collections = state.collections.filter(
          (collection) => collection._id !== collectionId
        )
        state.isLoading = false
      })
      .addCase(deleteCollection.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(updateCollection.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        const updatedCollection = action.payload.collection
        const collectionIndex = state.collections.findIndex(
          (collection) => collection._id === updatedCollection._id
        )
        if (collectionIndex !== -1) {
          state.collections[collectionIndex] = updatedCollection
        }
        state.isLoading = false
      })
      .addCase(updateCollection.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const collections = collectionsSlice.reducer
export const collectionsActions = collectionsSlice.actions
export const collectionsThunk = {
  fetchCollections,
  createCollection,
  deleteCollection,
  updateCollection,
}
