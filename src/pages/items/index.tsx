import {useParams} from 'react-router-dom'
import {Space, Table, Tag} from 'antd';
import {Layout} from '@/common/Layout/Layout'
import {Content, StyledContent, Wrapper,} from '@/pages/items/styles'
import {items} from '@/data/data'
type IdParams = {
    collectionId: string;
};
const {Column} = Table;
export const Items = () => {
    const {collectionId} = useParams<IdParams>()
    const data = items.filter(item => item.collection_id === collectionId)
    console.log(data)
    return (
        <Layout>
            <Content>
                <Wrapper>
                    <StyledContent>
                        <Table dataSource={data}>
                            <Column title="Title" dataIndex="title" key="title"/>
                            <Column title="Author" dataIndex="author" key="author"/>
                            <Column title="Year" dataIndex="year" key="year"/>
                            <Column title="Content" dataIndex="content" key="content"/>
                            <Column
                                title="Tags"
                                dataIndex="tags"
                                key="tags"
                                render={(tags: string[]) => (
                                    <>
                                        {tags.map((tag) => {
                                            let color = tag.length > 5 ? 'geekblue' : 'green';
                                            if (tag === 'loser') {
                                                color = 'volcano';
                                            }
                                            return (
                                                <Tag color={color} key={tag}>
                                                    {tag.toUpperCase()}
                                                </Tag>
                                            );
                                        })}
                                    </>
                                )}
                            />
                            <Column
                                title="Action"
                                key="action"
                                render={(_: any,) => (
                                    <Space size="middle">
                                        <a>Edit </a>
                                        <a>Delete</a>
                                    </Space>
                                )}
                            />
                        </Table>
                    </StyledContent>
                </Wrapper>
            </Content>
        </Layout>
    )
}
