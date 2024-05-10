import { Space, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { MouseEvent } from 'react'
import { useActions } from '@/hooks/useActions'
import { ArtCollectionResponse, collectionsThunk, CollectionsType } from '@/app/collections-reducer'
import { LoadingSpinner } from '@components/Loader'

const { Column } = Table

export const TableCollections = () => {
  const navigate = useNavigate()
  const { collections, isLoading } = useSelector<RootState, CollectionsType>((state) => ({
    collections: state.collections.collections,
    isLoading: state.collections.isLoading,
  }))
  const myCollections = useSelector<RootState, string[]>((state) => state.auth.user.collections)
  const { deleteCollection } = useActions(collectionsThunk)
  const token = useSelector<RootState, string>((state) => state.auth.token)
  const handleRowClick = (record: ArtCollectionResponse) => {
    return {
      onClick: () => {
        navigate(`${record._id}`)
      },
    }
  }
  const isRecordInMyCollections = (recordId: string) => {
    return myCollections?.includes(recordId)
  }
  const handleDeleteCollection = (recordId: string, event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    deleteCollection({ collectionId: recordId, token })
  }
  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <Table dataSource={collections} onRow={handleRowClick}>
      <Column title="Title" dataIndex="title" />
      <Column title="Category" dataIndex="category" />
      <Column title="Picture" dataIndex="picture" />
      <Column
        title="Action"
        render={(_: any, record: ArtCollectionResponse) => (
          <Space size="middle">
            {isRecordInMyCollections(record._id) && (
              <>
                <a>Edit </a>
                <a onClick={(event) => handleDeleteCollection(record._id, event)}>Delete</a>
              </>
            )}
          </Space>
        )}
      />
    </Table>
  )
}
