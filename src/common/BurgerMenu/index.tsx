import React, { ReactNode } from 'react'
import { MenuContainer, Overlay } from './styles'

interface MenuProps {
  children: ReactNode
  open: boolean
  onClose: () => void
}

export const BurgerMenu = ({ children, open, onClose }: MenuProps) => {
  function handleKeypress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  React.useEffect(() => {
    function fn(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', fn)

    return () => document.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div>
      <Overlay onClick={onClose} role="presentation" onKeyPress={handleKeypress} open={open} />

      <MenuContainer open={open}>{children}</MenuContainer>
    </div>
  )
}
