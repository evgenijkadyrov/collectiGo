import { HomeStyled } from '@/pages/home/styles'
import { Header } from '@components/Header'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { Footer } from '@components/Footer'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <HomeStyled>
      <Header />
      <ErrorBoundary>{children}</ErrorBoundary>
      <Footer />
    </HomeStyled>
  )
}
