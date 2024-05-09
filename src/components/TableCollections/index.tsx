import { Space, Table } from 'antd'
import { ArtCollectionResponse } from '@/data/data'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, RootStateType } from '@/app/store'
import { useEffect } from 'react'

const { Column } = Table

export const TableCollections = () => {
  const navigate = useNavigate()
  const collections = useSelector<RootStateType, ArtCollectionResponse[]>(
    (state) => state.collections
  )
  const myCollections = useSelector<RootState, string[]>((state) => state.auth.user.collections)
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
  useEffect(() => {}, [myCollections])

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
                <a>Delete</a>
              </>
            )}
          </Space>
        )}
      />
    </Table>
  )
}
