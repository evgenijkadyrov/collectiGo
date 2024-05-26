import { SearchCollectionsForm } from '@components/SearchField'

import { TitleGallery } from '@/common/TitleForGallery'
import { TitlePage } from '@/common/TitlePage'

import { StyledContent, Wrapper } from './styles'
import { TableCollections } from '@components/TableCollections'
import { memo, useEffect, useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { collectionsThunk } from '@/app/collections-reducer'
import { ButtonCustom } from '@components/ButtonCustom'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { ModalCustom } from '@components/Modal'
import { ArtCollectionResponse } from '@/types/interfaces'
import { sortBiggestCollections } from '@/utils/sortBiggestCollections'

export const Content = memo(() => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const { fetchCollections } = useActions(collectionsThunk)
  const collections = useSelector<RootState, ArtCollectionResponse[]>(
    (state) => state.collections.collections
  )

  const isLoggedIn = useSelector<RootState, boolean>((state) => state.auth.isLoggedIn)

  const handleCreateCollection = () => {
    setOpen(true)
  }
  useEffect(() => {
    fetchCollections(search)
  }, [search])
  const handleSearch = (value: string) => {
    setSearch(value)
  }
  return (
    <Wrapper>
      <StyledContent>
        <TitlePage firstLine={'Your favorite collections '} isActive={true} />
        <SearchCollectionsForm setSearchValue={handleSearch} />
        <TitleGallery firstLineText={'Last added collections'} />
        {isLoggedIn && <ButtonCustom onClick={handleCreateCollection}>Create</ButtonCustom>}
        <ModalCustom open={open} setOpen={setOpen} createItemMode={false} />
        <TableCollections collections={collections} />
        <TitleGallery firstLineText={'Biggest collections'} />
        <TableCollections collections={sortBiggestCollections(collections)} isPagination={false} />
      </StyledContent>
    </Wrapper>
  )
})
