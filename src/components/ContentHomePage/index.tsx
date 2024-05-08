import { SearchArtworkForm } from '@components/SearchField'

import { TitleGallery } from '@/common/TitleForGallery'
import { TitlePage } from '@/common/TitlePage'

import { StyledContent, Wrapper } from './styles'
import { TableCollections } from '@components/TableCollections'
import { useEffect } from 'react'
import { useActions } from '@/hooks/useActions'
import { collectionsThunk } from '@/app/collections-reducer'

export const Content = () => {
  const { fetchCollections } = useActions(collectionsThunk)
  useEffect(() => {
    fetchCollections({})
  }, [])

  return (
    <Wrapper>
      <StyledContent>
        <TitlePage firstLine={'Your favorite collections '} isActive={true} />
        <SearchArtworkForm setSearchValue={() => {}} />
        <TitleGallery firstLineText={'Last added collection'} />
        <TableCollections />
        <TitleGallery
          firstLineText={'Biggest collections'}
          secondLineText={'Last added collection'}
        />
      </StyledContent>
    </Wrapper>
  )
}
