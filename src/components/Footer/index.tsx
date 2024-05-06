import { Container,  StyledFooter } from './styles'
import {  Logo, AppName } from '@components/Header/styles'

import {LogoIcon} from '@/assets/icons/LogoItem'

export const Footer = () => (
  <StyledFooter>
    <Container>
      <Logo>
        <LogoIcon height={50} width={45} />
        <AppName color="black">
         CollectiGo
        </AppName>
      </Logo>

    </Container>
  </StyledFooter>
)
