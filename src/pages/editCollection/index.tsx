import { Button } from 'antd'
import { Content, StyledButton, Wrapper } from './styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { collectionsThunk } from '@/app/collections-reducer'
import { useActions } from '@/hooks/useActions'
import { Paths } from '@/Paths'
import { Layout } from '@/common/Layout/Layout'
import { ArtCollectionCreate, ArtCollectionResponse } from '@/types/interfaces'
import { FormCustom } from '@components/FormCollectionCustom/index.'
import { LoadingSpinner } from '@components/Loader'

export const EditCollectionPage = () => {
  const { collectionId } = useParams() as { collectionId: string }
  const { updateCollection } = useActions(collectionsThunk)
  const navigate = useNavigate()
  const collections = useSelector<RootState, ArtCollectionResponse[]>(
    (state) => state.collections.collections
  )
  const isLoading = useSelector<RootState, boolean>((state) => state.collections.isLoading)
  const collection = collections.find((collection) => collection._id === collectionId)

  const handleSubmit = async (values: ArtCollectionCreate) => {
    try {
      debugger
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
          <FormCustom onSubmit={handleSubmit} initialValues={collection} editMode={true} />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <StyledButton>
              <Button type="primary" key="submit" htmlType="submit" form={'myForm'}>
                Update
              </Button>
            </StyledButton>
          )}
        </Content>
      </Wrapper>
    </Layout>
  )
}
