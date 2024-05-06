import styled from 'styled-components'

import { colors } from '@/constants/colors'

export const TitleOfArticle = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${colors.primary};
  opacity: 0.3;
`
export const ArticleAuthor = styled.div`
  font-size: 1.5rem;
  line-height: 1.8rem;
  margin-bottom: 1rem;
  color: ${colors.gold};
`
export const AuthorYearsLive = styled.div`
  font-size: 1rem;
  line-height: 1.8rem;
  font-weight: bold;
`
export const OverviewItemText = styled.div`
  font-size: 1rem;
  color: ${colors.gold};

  span {
    color: ${colors.primary};
  }
`
export const OverviewInformation = styled.div`
  font-size: 2rem;
  line-height: 2.5rem;
  color: ${colors.primary};
`
export const CommonInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 120px;
  @media (max-width: 391px) {
    margin-bottom: 20px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    margin-bottom: 30px;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    margin-bottom: 40px;
  }
`
export const ContainerDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 400px;
  margin-left: 20px;
`

interface ImageProps {
  background_url: string | null | undefined
}

export const Image = styled.div<ImageProps>`
  width: 500px;
  height: 570px;
  margin-right: 80px;
  background-image: url(${({ background_url }) =>
    background_url ? background_url : 'src/assets/images/no_image.jpg'});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  @media (max-width: 391px) {
    width: 200px;
    height: 270px;
    margin-right: 0;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    width: 250px;
    height: 370px;
    margin-right: 0;
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    margin-right: 40px;
  }
`
export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 391px) {
    display: flex;
    justify-content: center;

    margin-right: 0;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    display: flex;
    justify-content: center;

    margin-right: 0;
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 1280px) {
    display: flex;
    justify-content: center;

    margin-right: 40px;
  }
`
export const Wrapper = styled.div`
  width: 1280px;
  display: flex;
  justify-content: center;
  flex: 1;
  margin: 0 auto;
`
export const StyledContent = styled.div`
  margin-top: 120px;
  margin-bottom: 120px;
  display: flex;

  @media (max-width: 391px) {
    margin-top: 30px;
    margin-bottom: 30px;
    flex-direction: column;
    display: flex;
    align-items: center;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    margin-top: 60px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 769px) and (max-width: 1280px) {
    margin-top: 60px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
export const Content = styled.main`
  display: flex;
  width: 100%;
  margin: 0 auto;
  min-height: ${window.innerHeight - 212}px;

  background-color: ${colors.background};
`
