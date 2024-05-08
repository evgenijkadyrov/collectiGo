import { Space, Table } from 'antd'
import { ArtCollectionResponse } from '@/data/data'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootStateType } from '@/app/store'

const { Column } = Table

export const TableCollections = () => {
  const navigate = useNavigate()
  const collections = useSelector<RootStateType, ArtCollectionResponse[]>(
    (state) => state.collections
  )
  console.log('col', collections)
  const handleRowClick = (record: ArtCollectionResponse) => {
    return {
      onClick: () => {
        navigate(`${record._id}`)
      },
    }
  }

  return (
    <Table dataSource={collections} onRow={handleRowClick}>
      <Column title="Title" dataIndex="title" />
      <Column title="Category" dataIndex="category" />
      <Column title="Picture" dataIndex="picture" />
      <Column
        title="Action"
        render={(_: any) => (
          <Space size="middle">
            <a>Edit </a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
  )
}
