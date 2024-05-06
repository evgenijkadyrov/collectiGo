import { FirstLine, SecondLine, TextWrapper } from '@/common/TitlePage/styles'
import { memo } from 'react'
export interface TitlePageProps {
  firstLine: string
  secondLine?: string
  isActive?: boolean
  isColored?: boolean
}
export const TitlePage = memo(({ firstLine, secondLine, isActive, isColored }: TitlePageProps) => {
  return (
    <TextWrapper>
      <FirstLine className={isActive ? 'active' : ''}>{firstLine}</FirstLine>
      <SecondLine className={isColored ? 'active' : ''}> {secondLine}</SecondLine>
    </TextWrapper>
  )
})
