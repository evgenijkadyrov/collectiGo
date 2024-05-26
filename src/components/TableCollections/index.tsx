import { Space, Table, TablePaginationConfig } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { memo, useCallback } from 'react'
import { useActions } from '@/hooks/useActions'
import { LoadingSpinner } from '@components/Loader'
import { itemsThunk } from '@/app/items-reducer'
import { compareRecordWithMyCollections } from '@/utils/compareWithMyCollection'
import { CollectionResponse } from '@/types/interfaces'
import { useCollectionActions } from '@/hooks/useCollectionActions'

const { Column } = Table

interface TableCollectionsProps {
  collections: CollectionResponse[]
  isPagination?: false | TablePaginationConfig | undefined
}

export const TableCollections = memo(({ collections, isPagination }: TableCollectionsProps) => {
  const navigate = useNavigate()
  const isLoading = useSelector<RootState, boolean>((state) => state.collections.isLoading)
  const myCollections = useSelector<RootState, string[]>((state) => state.auth.user.collections)

  const { handleEditCollection, handleDeleteCollection } = useCollectionActions()
  const { fetchItems } = useActions(itemsThunk)

  const handleRowClick = useCallback(
    (record: CollectionResponse) => {
      return {
        onClick: async () => {
          await fetchItems(record._id)
          navigate(record._id)
        },
      }
    },
    [navigate]
  )

  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <Table dataSource={collections} onRow={handleRowClick} pagination={isPagination}>
      <Column
        title="Name collection"
        dataIndex="name"
        sorter={(a: CollectionResponse, b: CollectionResponse) => a.name.localeCompare(b.name)}
      />
      <Column
        title="Category"
        dataIndex="category"
        sorter={(a: CollectionResponse, b: CollectionResponse) =>
          a.category.localeCompare(b.category)
        }
      />
      <Column
        title="Image"
        dataIndex="image_url"
        render={(image_url: string) => (
          <img
            src={image_url || 'src/assets/images/no_image.jpg'}
            alt="Collection_image"
            style={{ width: '80px', display: 'flex', justifyContent: 'center' }}
            onError={(e) => {
              e.currentTarget.src = 'src/assets/images/no_image.jpg'
            }}
          />
        )}
      />
      <Column title="Description" dataIndex="description" />
      <Column
        title="Action"
        render={(_: any, record: CollectionResponse) => (
          <Space size="middle">
            {compareRecordWithMyCollections(record._id, myCollections) && (
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
