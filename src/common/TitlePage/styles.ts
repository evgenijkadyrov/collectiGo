import styled from 'styled-components'
import { colors } from '@/constants/colors'

export const TextWrapper = styled.div`
  display: flex;
  padding-top: 120px;
  margin-bottom: 78px;
  flex-direction: column;
  align-items: center;
  font-size: 4rem;
  font-weight: bold;
  color: ${colors.primary};

  @media (max-width: 390px) {
    margin-top: 20px;
    margin-bottom: 40px;
    padding-top: 20px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    padding-top: 20px;
  }
  @media (min-width: 769px) and (max-width: 1280px) {
    padding-top: 40px;
  }
`

export const FirstLine = styled.div`
  text-align: center;

  &.active::after {
    content: 'Here';
    color: ${colors.secondary};
  }

  @media (max-width: 390px) {
    font-size: 3rem;
  }
`
export const SecondLine = styled.span`
  &.active {
    color: ${colors.secondary};
  }

  @media (max-width: 390px) {
    font-size: 3rem;
  }
`
