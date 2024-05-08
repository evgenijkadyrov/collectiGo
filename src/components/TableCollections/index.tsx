import { Space, Table } from 'antd'
import { ArtCollection } from '@/data/data'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootStateType } from '@/app/store'

const { Column } = Table

export const TableCollections = () => {
  const navigate = useNavigate()
  const collections = useSelector<RootStateType, ArtCollection[]>((state) => state.collections)
  console.log('col', collections)
  const handleRowClick = (record: ArtCollection) => {
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
