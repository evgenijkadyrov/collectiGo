import styled from 'styled-components'

import { colors } from '@/constants/colors'

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${colors.background};
  display: flex;
  flex: 1;
`
export const Content = styled.main`
  width: 70%;
  min-height: ${window.innerHeight - 212}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
