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
import { ArtCollectionResponse } from '@/types/interfaces'

export const Content = () => {
  const [open, setOpen] = useState(false)
  const { fetchCollections } = useActions(collectionsThunk)
  const collections = useSelector<RootState, ArtCollectionResponse[]>(
    (state) => state.collections.collections
  )
  const [search, setSearch] = useState('')
  const isLoggedIn = useSelector<RootState, boolean>((state) => state.auth.isLoggedIn)

  const handleCreateCollection = () => {
    setOpen(true)
  }
  useEffect(() => {
    fetchCollections(search)
  }, [search])
  const handleSearch = (value: string) => {
    setSearch(value)
    console.log(value)
  }
  return (
    <Wrapper>
      <StyledContent>
        <TitlePage firstLine={'Your favorite collections '} isActive={true} />
        <SearchArtworkForm setSearchValue={handleSearch} />
        <TitleGallery firstLineText={'Last added collections'} />
        {isLoggedIn && <ButtonCustom onClick={handleCreateCollection}>Create</ButtonCustom>}
        <ModalCustom open={open} setOpen={setOpen} createItemMode={false} />
        <TableCollections collections={collections} />
        <TitleGallery firstLineText={'Biggest collections'} />
        <TableCollections collections={collections} isPagination={false} />
      </StyledContent>
    </Wrapper>
  )
}
