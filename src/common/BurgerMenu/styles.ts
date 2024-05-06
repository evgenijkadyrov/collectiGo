import styled from 'styled-components'

interface MenuContainerProps {
  open: boolean
}

export const MenuContainer = styled.div<MenuContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 90%;
  height: 100%;
  background-color: #f2f2f2;
  text-align: left;
  padding: 132px 112px 32px 32px;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${({ open }) => (open ? '0' : '-100%')});
`

interface OverlayProps {
  open: boolean
}

export const Overlay = styled.div<OverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${({ open }) => (open ? 'block' : 'none')};
  z-index: 1000;
`
