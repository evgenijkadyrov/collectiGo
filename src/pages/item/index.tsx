import {TitleGallery} from '@/common/TitleForGallery'
import {TitlePage} from '@/common/TitlePage'
import {Layout} from '@/common/Layout/Layout'
import {Content, Wrapper} from './styles'

export const Item = () => {

    return (
        <Layout>
            <Wrapper>
                <Content>
                    <TitlePage firstLine={'Item Collection'} isColored={true}/>
                    <TitleGallery firstLineText={'Item'}/>

                </Content>
            </Wrapper>
        </Layout>
    )
}
