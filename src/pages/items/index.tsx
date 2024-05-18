import { useNavigate, useParams } from 'react-router-dom'
import { Table } from 'antd'
import { Layout } from '@/common/Layout/Layout'
import { Content, StyledContent, Wrapper } from '@/pages/items/styles'
import { ArtDataItem } from '@/data/data'
import { TitleGallery } from '@/common/TitleForGallery'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { LoadingSpinner } from '@components/Loader'
import { ButtonCustom } from '@components/ButtonCustom'
import { ModalCustom } from '@components/Modal'
import { memo, useEffect, useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { initialStateType, itemsThunk } from '@/app/items-reducer'
import { ArtCollectionResponse } from '@/app/collections-reducer'
import { useGenerateItemsColumns } from '@/utils/generateCustomColomns.helper'

export const Items = memo(() => {
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()
  const { collectionId } = useParams()

  const { fetchItems } = useActions(itemsThunk)

  const { items, isLoading } = useSelector<RootState, initialStateType>((state) => state.items)
  const isLoggedIn = useSelector<RootState, boolean>((state) => state.auth.isLoggedIn)
  const collection = useSelector<RootState, ArtCollectionResponse[]>(
    (state) => state.collections.collections
  ).find((col) => col._id === collectionId)
  const { columns, titles } = useGenerateItemsColumns(collection, navigate, collectionId)
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
              titles={titles}
            />
            <Table dataSource={items} onRow={handleRowClick} columns={columns}></Table>
          </StyledContent>
        </Wrapper>
      </Content>
    </Layout>
  )
})
