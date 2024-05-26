import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { initialStateType } from '@/app/items-reducer'
import { CollectionResponse, ItemDataResponse } from '@/types/interfaces'
import { Dispatch, SetStateAction, useState } from 'react'
interface PropsType {
  myCollectionsList: string[]
  isLoading: boolean
  collection: CollectionResponse | undefined
  items: ItemDataResponse[]
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleCreateItem: () => void
}

export const useGetDataForItems = (collectionId: string | undefined): PropsType => {
  const [open, setOpen] = useState(false)
  const { items, isLoading } = useSelector<RootState, initialStateType>((state) => state.items)
  const collection = useSelector<RootState, CollectionResponse[]>(
    (state) => state.collections.collections
  ).find((col) => col._id === collectionId)
  const myCollectionsList = useSelector<RootState, string[]>((state) => state.auth.user.collections)

  const handleCreateItem = () => {
    setOpen(true)
  }
  return { items, isLoading, collection, myCollectionsList, open, setOpen, handleCreateItem }
}
