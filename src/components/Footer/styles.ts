import styled from 'styled-components'
import { colors } from '@/constants/colors'

export const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${colors.white};
  margin-top: auto;
`
export const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 85px;
  @media (max-width: 390px) {
    height: 70px;
    width: 85%;
  }
`

