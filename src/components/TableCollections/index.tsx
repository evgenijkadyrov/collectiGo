import { Space, Table } from 'antd'
import { ArtCollection, collections } from '@/data/data'
import { useNavigate } from 'react-router-dom'
const { Column } = Table

export const TableCollections = () => {
  const navigate = useNavigate()
  const handleRowClick = (record: ArtCollection) => {
    return {
      onClick: () => {
        navigate(`${record.collection_id}`)
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
