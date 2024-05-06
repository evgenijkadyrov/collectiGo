import { FirstLineText, SecondLineText, WrapperTitleGallery } from '@/common/TitleForGallery/styles'
import { memo } from 'react'
export interface TitleForGalleryProps {
  firstLineText?: string
  secondLineText?: string
}

export const TitleGallery = memo(({ firstLineText, secondLineText }: TitleForGalleryProps) => {
  return (
    <WrapperTitleGallery>
      <FirstLineText>{firstLineText}</FirstLineText>
      <SecondLineText>{secondLineText}</SecondLineText>
    </WrapperTitleGallery>
  )
})
