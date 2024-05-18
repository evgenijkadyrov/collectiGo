import { Space, Tag } from 'antd'
import { ArtCollectionResponse } from '@/app/collections-reducer'

interface CustomColumns {
  title: string
  dataIndex: string
  key: string
}

const getCustomColumns = (collection: ArtCollectionResponse): CustomColumns[] => {
  const customColumns: CustomColumns[] = []
  if (collection)
    if (collection?.custom_string1_state) {
      customColumns.push({
        title: collection.custom_string1_name,
        dataIndex: 'custom_string1_name',
        key: 'custom_string1_name',
      })
    }

  if (collection?.custom_string2_state) {
    customColumns.push({
      title: collection.custom_string2_name,
      dataIndex: 'custom_string2_name',
      key: 'custom_string2_name',
    })
  }

  if (collection?.custom_string3_state) {
    customColumns.push({
      title: collection.custom_string3_name,
      dataIndex: 'custom_string3_name',
      key: 'custom_string3_name',
    })
  }

  return customColumns
}
export const useGenerateItemsColumns = (collection?: ArtCollectionResponse) => {
  const customColumns = collection ? getCustomColumns(collection) : []

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
    },
    ...customColumns,
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
    {
      title: 'Owner collection',
      dataIndex: 'author',
      key: 'author',
    },
  ]

  const titles = customColumns.map((column) => column.title)

  return { columns, titles }
}
