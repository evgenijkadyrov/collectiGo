import { Button, Form, Input, Select } from 'antd'
import { Content, Wrapper } from './styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { ArtCollectionResponse } from '@/app/collections-reducer'
import { useActions } from '@/hooks/useActions'
import { LoadingSpinner } from '@components/Loader'
import { ArtDataItemResponse, ArtItemCreate } from '@/data/data'
import { Layout } from '@/common/Layout/Layout'
import { itemsThunk } from '@/app/items-reducer'
import { useGenerateItemsColumns } from '@/utils/generateCustomColomns.helper'

export const EditItemPage = () => {
  const [form] = Form.useForm()
  const { itemId } = useParams() as { itemId: string }
  const { updateItem } = useActions(itemsThunk)
  const navigate = useNavigate()
  const items = useSelector<RootState, ArtDataItemResponse[]>((state) => state.items.items)

  const isLoading = useSelector<RootState, boolean>((state) => state.items.isLoading)
  const item = items.find((item) => item._id === itemId)
  const collection = useSelector<RootState, ArtCollectionResponse[]>(
    (state) => state.collections.collections
  ).find((collection) => collection._id === item?.collection_id)
  const { titles } = useGenerateItemsColumns(collection)
  const onFinish = async (values: ArtItemCreate) => {
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
          <Form
            id={'myForm'}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="dynamic_form_complex"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={item}
            onFinish={onFinish}
          >
            <Form.Item label={'Name'} name={'name'} key={'name'}>
              <Input />
            </Form.Item>

            <Form.Item label={'Tags'} name={'tags'} key={'tags'}>
              <Select mode={'tags'} />
            </Form.Item>
            {titles?.map((fieldName, index) => (
              <Form.Item label={fieldName} name={`custom_string${index + 1}_name`} key={fieldName}>
                <Input />
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              {isLoading && <LoadingSpinner />}
            </Form.Item>
          </Form>
        </Content>
      </Wrapper>
    </Layout>
  )
}
