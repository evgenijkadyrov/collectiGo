import { Button, Form, Input, Select } from 'antd'
import { Content, Wrapper } from './styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { ArtCollectionResponse, collectionsThunk } from '@/app/collections-reducer'
import { useActions } from '@/hooks/useActions'
import { LoadingSpinner } from '@components/Loader'
import { Paths } from '@/Paths'
import { ArtCollectionCreate, collectionsCategory } from '@/data/data'
import { Layout } from '@/common/Layout/Layout'

const { Item } = Form

export const EditPage = () => {
  const { collectionId } = useParams() as { collectionId: string }
  const { updateCollection } = useActions(collectionsThunk)
  const navigate = useNavigate()
  const collections = useSelector<RootState, ArtCollectionResponse[]>(
    (state) => state.collections.collections
  )
  const isLoading = useSelector<RootState, boolean>((state) => state.collections.isLoading)
  const collection = collections.find((collection) => collection._id === collectionId)

  const onFinish = async (values: ArtCollectionCreate) => {
    try {
      await updateCollection({
        collectionId,
        collectionData: values,
      })
      navigate(Paths.home)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <Wrapper>
        <Content>
          <Form onFinish={onFinish} initialValues={collection}>
            <Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Item>
            <Item label="Category" name="category" rules={[{ required: true }]}>
              <Select
                style={{ width: 240 }}
                options={collectionsCategory.map((category) => ({
                  label: category,
                  value: category,
                }))}
              />
            </Item>
            <Item label="Picture" name="picture" rules={[{ required: true }]}>
              <Input />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              {isLoading && <LoadingSpinner />}
            </Item>
          </Form>
        </Content>
      </Wrapper>
    </Layout>
  )
}
