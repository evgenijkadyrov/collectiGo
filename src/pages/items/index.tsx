import { useNavigate, useParams } from 'react-router-dom'
import { Space, Table, Tag } from 'antd'
import { Layout } from '@/common/Layout/Layout'
import { Content, StyledContent, Wrapper } from '@/pages/items/styles'
import { ArtDataItem } from '@/data/data'
import { TitleGallery } from '@/common/TitleForGallery'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { LoadingSpinner } from '@components/Loader'
import { ButtonCustom } from '@components/ButtonCustom'
import { ModalCustom } from '@components/Modal'
import { useEffect, useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { initialStateType, itemsThunk } from '@/app/items-reducer'
import { ArtCollectionResponse } from '@/app/collections-reducer'

interface CustomColumns {
  title: string
  dataIndex: string
  key: string
}

export const Items = () => {
  const navigate = useNavigate()
  const { fetchItems } = useActions(itemsThunk)
  const { collectionId } = useParams()
  const { items, isLoading } = useSelector<RootState, initialStateType>((state) => state.items)
  const isLoggedIn = useSelector<RootState, boolean>((state) => state.auth.isLoggedIn)
  const collections = useSelector<RootState, ArtCollectionResponse[]>(
    (state) => state.collections.collections
  )
  const collection = collections.find((col) => col._id === collectionId)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    collectionId && fetchItems(collectionId)
  }, [])
  const handleRowClick = (record: ArtDataItem) => {
    return {
      onClick: () => {
        navigate(`items/${record._id}`)
      },
    }
  }
  const handleCreateItem = () => {
    setOpen(true)
  }
  if (isLoading) {
    return <LoadingSpinner />
  }
  const getCustomColumns = (): CustomColumns[] => {
    const customColumns: CustomColumns[] = []

    if (collection?.custom_string1_state) {
      customColumns.push({
        title: collection.custom_string1_name,
        dataIndex: collection.custom_string1_name,
        key: collection.custom_string1_name,
      })
    }

    if (collection?.custom_string2_state) {
      customColumns.push({
        title: collection.custom_string2_name,
        dataIndex: collection.custom_string2_name,
        key: collection.custom_string2_name,
      })
    }

    if (collection?.custom_string3_state) {
      customColumns.push({
        title: collection.custom_string3_name,
        dataIndex: collection.custom_string3_name,
        key: collection.custom_string3_name,
      })
    }

    return customColumns
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
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
    ...getCustomColumns(),
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any) => (
        <Space size="middle">
          <a>Edit </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  return (
    <Layout>
      <Content>
        <Wrapper>
          <StyledContent>
            <TitleGallery firstLineText={'Collection '} />
            {isLoggedIn && <ButtonCustom onClick={handleCreateItem}>Create</ButtonCustom>}
            <ModalCustom
              open={open}
              setOpen={setOpen}
              collectionId={collectionId}
              createItemMode={true}
            />
            <Table dataSource={items} onRow={handleRowClick} columns={columns}>
              {/*<Column title="Name" dataIndex="name"/>*/}
              {/*<Column title="Author" dataIndex="author"/>*/}
              {/*<Column*/}
              {/*    title="Tags"*/}
              {/*    dataIndex="tags"*/}
              {/*    key="tags"*/}
              {/*    render={(tags: string[]) => (*/}
              {/*        <>*/}
              {/*            {tags.map((tag) => {*/}
              {/*                let color = tag.length > 5 ? 'geekblue' : 'green'*/}
              {/*                if (tag === 'loser') {*/}
              {/*                    color = 'volcano'*/}
              {/*                }*/}
              {/*                return (*/}
              {/*                    <Tag color={color} key={tag}>*/}
              {/*                        {tag.toUpperCase()}*/}
              {/*                    </Tag>*/}
              {/*                )*/}
              {/*            })}*/}
              {/*        </>*/}
              {/*    )}*/}
              {/*/>*/}
              {/*<Column*/}
              {/*    title="Action"*/}
              {/*    key="action"*/}
              {/*    render={(_: any) => (*/}
              {/*        <Space size="middle">*/}
              {/*            <a>Edit </a>*/}
              {/*            <a>Delete</a>*/}
              {/*        </Space>*/}
              {/*    )}*/}
              {/*/>*/}
            </Table>
          </StyledContent>
        </Wrapper>
      </Content>
    </Layout>
  )
}
