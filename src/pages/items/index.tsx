import { useNavigate, useParams } from 'react-router-dom'
import { Table } from 'antd'
import { Layout } from '@/common/Layout/Layout'
import { Content, StyledContent, Wrapper } from '@/pages/items/styles'
import { TitleGallery } from '@/common/TitleForGallery'
import { LoadingSpinner } from '@components/Loader'
import { ButtonCustom } from '@components/ButtonCustom'
import { ModalCustom } from '@components/Modal'
import { memo, useEffect } from 'react'
import { useActions } from '@/hooks/useActions'
import { itemsThunk } from '@/app/items-reducer'
import { useGenerateItemsColumns } from '@/utils/generateCustomColomns.helper'
import { compareRecordWithMyCollections } from '@/utils/compareWithMyCollection'
import { useGetDataForItems } from '@/hooks/useGetDataForItems'

export const Items = memo(() => {
  const navigate = useNavigate()
  const { collectionId } = useParams()

  const { fetchItems } = useActions(itemsThunk)
  const { items, isLoading, collection, myCollectionsList, open, setOpen, handleCreateItem } =
    useGetDataForItems(collectionId)

  const { columns, titles } = useGenerateItemsColumns(collection, navigate, collectionId)

  useEffect(() => {
    collectionId && fetchItems(collectionId)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Layout>
      <Content>
        <Wrapper>
          <StyledContent>
            <TitleGallery firstLineText={'Collection '} />
            {compareRecordWithMyCollections(collectionId, myCollectionsList) && (
              <ButtonCustom onClick={handleCreateItem}>Create</ButtonCustom>
            )}
            <ModalCustom
              open={open}
              setOpen={setOpen}
              collectionId={collectionId}
              createItemMode={true}
              titles={titles}
            />
            <Table dataSource={items} columns={columns}></Table>
          </StyledContent>
        </Wrapper>
      </Content>
    </Layout>
  )
})
