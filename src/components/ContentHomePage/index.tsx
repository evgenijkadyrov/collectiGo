import { SearchArtworkForm } from '@components/SearchField'

import { TitleGallery } from '@/common/TitleForGallery'
import { TitlePage } from '@/common/TitlePage'

import { StyledContent, Wrapper } from './styles'
import { TableCollections } from '@components/TableCollections'
import { useEffect, useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { collectionsThunk } from '@/app/collections-reducer'
import { ButtonCustom } from '@components/ButtonCustom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { ModalCustom } from '@components/Modal'

export const Content = () => {
  const [open, setOpen] = useState(false)
  const { fetchCollections } = useActions(collectionsThunk)

  const isLoggedIn = useSelector<RootState, boolean>((state) => state.auth.isLoggedIn)

  useEffect(() => {
    fetchCollections({})
  }, [])

  const handleCreateCollection = () => {
    setOpen(true)
  }

  return (
    <Wrapper>
      <StyledContent>
        <TitlePage firstLine={'Your favorite collections '} isActive={true} />
        <SearchArtworkForm setSearchValue={() => {}} />
        <TitleGallery firstLineText={'Last added items'} />
        {isLoggedIn && <ButtonCustom onClick={handleCreateCollection}>Create</ButtonCustom>}
        <ModalCustom open={open} setOpen={setOpen} createItemMode={false} />
        <TableCollections />
        <TitleGallery firstLineText={'Biggest collections'} secondLineText={'Last added items'} />
      </StyledContent>
    </Wrapper>
  )
}
