import styled from 'styled-components'
import { colors } from '@/constants/colors'
import { ChevronDown } from '@/assets/icons/ChevronDown'

export const StyledSelect = styled.select`
  position: relative;
  appearance: none;
  outline: 0.8rem ${colors.secondary};
  border: 0;
  font-size: 0.8rem;
  height: 2rem;
  margin: 5px;
  border-radius: 0.25rem;
  box-shadow: none;
  flex: 1;
  padding: 0 0.5em;
  color: ${colors.primary};
  opacity: 0.7;
  background-color: ${colors.white};
  background-image: none;
  cursor: pointer;
  left: 2rem;
  bottom: 0.3rem;
  z-index: 2;

  &::-ms-expand {
    display: none;
  }

  &:hover::after {
    color: #f39c12;
  }
`
export const SelectWrapper = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: flex-end;
  width: 15em;
  height: 2em;
  border-radius: 0.25em;
  overflow: hidden;
`

export const SelectContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;

  &:hover {
    cursor: pointer;
  }
`
export const ChevronDownStyled = styled(ChevronDown)`
  position: absolute;
`
