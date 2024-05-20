import { Content, Wrapper } from './styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { useActions } from '@/hooks/useActions'
import { ItemDataResponse, ItemDataCreate } from '@/data/data'
import { Layout } from '@/common/Layout/Layout'
import { itemsThunk } from '@/app/items-reducer'
import { useGenerateItemsColumns } from '@/utils/generateCustomColomns.helper'
import { ItemForm } from '@components/FormItemCustom/Form'
import { ArtCollectionResponse } from '@/types/interfaces'

export const EditItemPage = () => {
  const { itemId } = useParams() as { itemId: string }
  const { updateItem } = useActions(itemsThunk)
  const navigate = useNavigate()
  const item = useSelector<RootState, ItemDataResponse[]>((state) => state.items.items).find(
    (item) => item._id === itemId
  )

  const isLoading = useSelector<RootState, boolean>((state) => state.items.isLoading)
  const collection = useSelector<RootState, ArtCollectionResponse[]>(
    (state) => state.collections.collections
  ).find((collection) => collection._id === item?.collection_id)
  const { titles } = useGenerateItemsColumns(collection)

  const onFinish = async (values: ItemDataCreate) => {
    try {
      await updateItem({
        itemId,
        itemData: values,
      })
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <Wrapper>
        <Content>
          <ItemForm
            initialValues={item ?? {}}
            onFinish={onFinish}
            isLoading={isLoading}
            buttonText="Update"
            titles={titles}
          />
        </Content>
      </Wrapper>
    </Layout>
  )
}
