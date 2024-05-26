import { Formik } from 'formik'
import { debounce } from 'lodash'
import { ChangeEvent, memo } from 'react'
import * as Yup from 'yup'

import { SearchIcon } from '@/assets/icons/SearchIcon'

import { FieldStyled, SearchFormContainer, StyledButton, StyledForm } from './styles'

interface SearchCollectionsProps {
  setSearchValue: (value: string) => void
}

export const SearchCollectionsForm = memo(({ setSearchValue }: SearchCollectionsProps) => {
  const pattern = /^[a-zA-Z0-9\s]*$/
  const validationSchema = Yup.object().shape({
    search: Yup.string()
      .max(10, 'Maximum 15 symbols')
      .matches(pattern, 'Invalid characters detected'),
  })

  const handleSearchDebounce = debounce((value: string) => {
    const newTitle = value.trim().toLowerCase()
    setSearchValue(newTitle)
  }, 600)
  return (
    <Formik
      initialValues={{ search: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        setSearchValue(values.search)
        resetForm()
      }}
    >
      {({ handleSubmit, values, handleChange, errors, touched }) => (
        <StyledForm onSubmit={handleSubmit}>
          <SearchFormContainer>
            <FieldStyled
              type="text"
              name="search"
              placeholder="Search"
              value={values.search}
              errors={errors.search}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChange(event)
                handleSearchDebounce(event.target.value)
              }}
            />
            {errors.search && touched.search && <div>{errors.search}</div>}
          </SearchFormContainer>
          <StyledButton type="submit">
            <SearchIcon />
          </StyledButton>
        </StyledForm>
      )}
    </Formik>
  )
})
