import { useState } from 'react'

import { CloseIcon } from '@/assets/icons/CloseIcon'
import { LogoIcon } from '@/assets/icons/LogoItem'
import { BurgerMenu } from '@/common/BurgerMenu'
import { colors } from '@/constants/colors'

import {
  AppName,
  CloseIconContainer,
  Container,
  Logo,
  LogoContainer,
  Navigation,
  StyledBurgerLink,
  StyledHeader,
  StyledLink,
  WrapperLink,
} from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { authThunk } from '@/app/auth-reducer'
import { useActions } from '@/hooks/useActions'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
  }
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const { logout } = useActions(authThunk)
  const handleLogout = () => {
    logout({})
  }
  return (
    <StyledHeader>
      <Container>
        <Logo>
          <BurgerMenu open={isOpen} onClose={onClose}>
            <CloseIconContainer onClick={() => setIsOpen(false)}>
              <CloseIcon height={36} width={36} />
            </CloseIconContainer>
            <WrapperLink>
              <StyledBurgerLink to={'/'} color={colors.primary}>
                Home
              </StyledBurgerLink>
            </WrapperLink>
          </BurgerMenu>

          <LogoContainer onClick={() => setIsOpen(true)} showMenu={isOpen}>
            <LogoIcon height={45} width={40} />
          </LogoContainer>
          <AppName color="white" onClick={() => setIsOpen(true)}>
            CollectiGo
          </AppName>
        </Logo>
        <Navigation>
          <StyledLink to={'/'} color={colors.white}>
            Home
          </StyledLink>
          {isLoggedIn && (
            <StyledLink to={'/'} color={colors.white} onClick={handleLogout}>
              Logout
            </StyledLink>
          )}
        </Navigation>
      </Container>
    </StyledHeader>
  )
}
