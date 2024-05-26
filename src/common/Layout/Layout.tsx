import { HomeStyled } from '@/pages/home/styles'
import { Header } from '@components/Header'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { Footer } from '@components/Footer'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '@/constants/colors'

interface LayoutProps {
  children: ReactNode
}

const LayoutWrapper = styled.div`
  min-height: 85vh;
  padding: 20px 0;
  background-color: ${colors.background};
`

export const Layout = ({ children }: LayoutProps) => {
  return (
    <HomeStyled>
      <Header />
      <ErrorBoundary>
        {' '}
        <LayoutWrapper>{children}</LayoutWrapper>
      </ErrorBoundary>
      <Footer />
    </HomeStyled>
  )
}
