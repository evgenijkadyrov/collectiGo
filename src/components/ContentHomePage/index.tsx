import { SearchArtworkForm } from '@components/SearchField'

import { TitleGallery } from '@/common/TitleForGallery'
import { TitlePage } from '@/common/TitlePage'

import { StyledContent, Wrapper } from './styles'
import { TableCollections } from '@components/TableCollections'
import { useEffect, useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { collectionsThunk } from '@/app/collections-reducer'
import { ButtonCustom } from '@components/ButtonCustom'
//import { ArtCollection } from '@/data/data'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { ModalCustom } from '@components/Modal'

export const Content = () => {
  const [open, setOpen] = useState(false)
  const { fetchCollections } = useActions(collectionsThunk)
  // const token = useSelector<RootState, string>((state) => state.auth.token)
  const isLoggedIn = useSelector<RootState, boolean>((state) => state.auth.isLoggedIn)
  useEffect(() => {
    fetchCollections({})
  }, [])

  const handleCreateCollection = () => {
    setOpen(true)

    // const data: ArtCollection = {
    //   title: 'new Collection',
    //   category: 'Collage',
    //   picture: 'http://picture.ru/picrure',
    // }
    // createCollections({ data, token })
  }
  return (
    <Wrapper>
      <StyledContent>
        <TitlePage firstLine={'Your favorite collections '} isActive={true} />
        <SearchArtworkForm setSearchValue={() => {}} />
        <TitleGallery firstLineText={'Last added collection'} />
        {isLoggedIn && <ButtonCustom onClick={handleCreateCollection}>Create</ButtonCustom>}
        <ModalCustom open={open} setOpen={setOpen} />
        <TableCollections />
        <TitleGallery
          firstLineText={'Biggest collections'}
          secondLineText={'Last added collection'}
        />
      </StyledContent>
    </Wrapper>
  )
}
