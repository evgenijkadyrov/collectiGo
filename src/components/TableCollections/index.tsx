import { Space, Table } from 'antd'
import { ArtCollectionResponse } from '@/data/data'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, RootStateType } from '@/app/store'
import { MouseEvent } from 'react'
import { useActions } from '@/hooks/useActions'
import { collectionsThunk } from '@/app/collections-reducer'

const { Column } = Table

export const TableCollections = () => {
  const navigate = useNavigate()
  const collections = useSelector<RootStateType, ArtCollectionResponse[]>(
    (state) => state.collections
  )
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
