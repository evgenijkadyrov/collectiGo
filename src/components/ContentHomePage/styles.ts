import styled from 'styled-components'
import { colors } from '@/constants/colors'

export const Wrapper = styled.div`
  background-color: ${colors.background};
  width: 100%;
  display: flex;
  align-items: center;
  flex: 1;
  padding-bottom: 20px;
`
export const StyledContent = styled.main`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
`
