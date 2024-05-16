import { Space, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { memo, MouseEvent, useCallback } from 'react'
import { useActions } from '@/hooks/useActions'
import { ArtCollectionResponse, collectionsThunk, CollectionsType } from '@/app/collections-reducer'
import { LoadingSpinner } from '@components/Loader'

const { Column } = Table

export const TableCollections = memo(() => {
  const navigate = useNavigate()
  const { collections, isLoading } = useSelector<RootState, CollectionsType>((state) => ({
    collections: state.collections.collections,
    isLoading: state.collections.isLoading,
  }))
  const myCollections = useSelector<RootState, string[]>((state) => state.auth.user.collections)
  const { deleteCollection } = useActions(collectionsThunk)
  const handleRowClick = useCallback(
    (record: ArtCollectionResponse) => {
      return {
        onClick: () => {
          navigate(`${record._id}`)
        },
      }
    },
    [navigate]
  )

  const isRecordInMyCollections = useCallback(
    (recordId: string) => {
      return myCollections?.includes(recordId)
    },
    [myCollections]
  )
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
  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <Table dataSource={collections} onRow={handleRowClick}>
      <Column title="Name collection" dataIndex="name" />
      <Column title="Category" dataIndex="category" />
      <Column title="Image" dataIndex="image_url" />
      <Column title="Description" dataIndex="description" />
      <Column
        title="Action"
        render={(_: any, record: ArtCollectionResponse) => (
          <Space size="middle">
            {isRecordInMyCollections(record._id) && (
              <>
                <a onClick={(event) => handleEditCollection(record._id, event)}>Edit</a>
                <a onClick={(event) => handleDeleteCollection(record._id, event)}>Delete</a>
              </>
            )}
          </Space>
        )}
      />
    </Table>
  )
})
