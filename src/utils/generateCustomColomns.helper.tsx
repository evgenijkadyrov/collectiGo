import { Tag } from 'antd'
import { ItemDataResponse } from '@/data/data'
import { MouseEvent, useCallback } from 'react'
import { compareRecordWithMyCollections } from '@/utils/compareWithMyCollection'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { useActions } from '@/hooks/useActions'
import { itemsThunk } from '@/app/items-reducer'
import { ArtCollectionResponse } from '@/types/interfaces'
import { SortOrder } from 'antd/es/table/interface'

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

export const useGenerateItemsColumns = (
  collection?: ArtCollectionResponse,
  navigate?: any,

  collectionId?: string
) => {
  const myCollections = useSelector<RootState, string[]>((state) => state.auth.user.collections)
  const { deleteItem } = useActions(itemsThunk)
  const customColumns = collection ? getCustomColumns(collection) : []

  const handleDeleteItem = useCallback(
    (recordId: string, event: MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      deleteItem({ itemId: recordId })
    },
    [deleteItem]
  )

  const handleEditItem = useCallback(
    (recordId: string, event: MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      navigate(`items/${recordId}/edit`)
    },
    [navigate, collectionId]
  )
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: ItemDataResponse, b: ItemDataResponse) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'] as SortOrder[],
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
      render: (_: any, record: ItemDataResponse) => (
        <>
          {compareRecordWithMyCollections(record.collection_id, myCollections) && (
            <>
              <a onClick={(event) => handleEditItem(record._id, event)}> Edit </a>
              <a onClick={(event) => handleDeleteItem(record._id, event)}> Delete </a>
            </>
          )}
        </>
      ),
    },
    {
      title: 'Owner collection',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
  ]

  const titles = customColumns.map((column) => column.title)

  return { columns, titles, handleEditItem, handleDeleteItem }
}
