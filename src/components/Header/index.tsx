import { useState } from 'react'

import { CloseIcon } from '@/assets/icons/CloseIcon'
import { LogoIcon } from '@/assets/icons/LogoItem'
import { BurgerMenu } from '@/common/BurgerMenu'
import { colors } from '@/constants/colors'

import {
  CloseIconContainer,
  Container,
  Logo,
  LogoContainer,
  AppName,
  Navigation,
  StyledBurgerLink,
  StyledHeader,
  StyledLink,
  WrapperLink,
} from './styles'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => {
    setIsOpen(false)
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
        </Navigation>
      </Container>
    </StyledHeader>
  )
}
