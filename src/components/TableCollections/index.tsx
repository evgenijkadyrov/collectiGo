import { Space, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { memo, MouseEvent, useCallback } from 'react'
import { useActions } from '@/hooks/useActions'
import { collectionsThunk } from '@/app/collections-reducer'
import { LoadingSpinner } from '@components/Loader'
import { itemsThunk } from '@/app/items-reducer'
import { compareRecordWithMyCollections } from '@/utils/compareWithMyCollection'
import { ArtCollectionResponse } from '@/types/interfaces'

const { Column } = Table
interface TableCollectionsProps {
  collections: ArtCollectionResponse[]
}
export const TableCollections = memo(({ collections }: TableCollectionsProps) => {
  const navigate = useNavigate()
  const isLoading = useSelector<RootState, boolean>((state) => state.collections.isLoading)
  const myCollections = useSelector<RootState, string[]>((state) => state.auth.user.collections)
  const { deleteCollection } = useActions(collectionsThunk)
  const { fetchItems } = useActions(itemsThunk)

  const handleRowClick = useCallback(
    (record: ArtCollectionResponse) => {
      return {
        onClick: async () => {
          await fetchItems(record._id)
          navigate(record._id)
        },
      }
    },
    [navigate]
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
      <Column
        title="Name collection"
        dataIndex="name"
        sorter={(a: ArtCollectionResponse, b: ArtCollectionResponse) =>
          a.name.localeCompare(b.name)
        }
      />
      <Column
        title="Category"
        dataIndex="category"
        sorter={(a: ArtCollectionResponse, b: ArtCollectionResponse) =>
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
        render={(_: any, record: ArtCollectionResponse) => (
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
