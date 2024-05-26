import { MouseEvent, useCallback } from 'react'
import { useActions } from '@/hooks/useActions'
import { collectionsThunk } from '@/app/collections-reducer'
import { useNavigate } from 'react-router-dom'

interface PropTypes {
  handleDeleteCollection: (recordId: string, event: MouseEvent<HTMLElement>) => void
  handleEditCollection: (recordId: string, event: MouseEvent<HTMLElement>) => void
}
export const useCollectionActions = (): PropTypes => {
  const navigate = useNavigate()
  const { deleteCollection } = useActions(collectionsThunk)
  const handleDeleteCollection = useCallback(
    (recordId: string, event: MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      deleteCollection({ collectionId: recordId })
    },
    [deleteCollection]
  )
  const handleEditCollection = useCallback(
    (recordId: string, event: MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      navigate(`${recordId}/edit`)
    },
    [deleteCollection]
  )
  return {
    handleDeleteCollection,
    handleEditCollection,
  }
}
