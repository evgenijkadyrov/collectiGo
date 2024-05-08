import { useParams } from 'react-router-dom'
import { Space, Table, Tag } from 'antd'
import { Layout } from '@/common/Layout/Layout'
import { Content, StyledContent, Wrapper } from '@/pages/items/styles'
import { ArtDataItem, items } from '@/data/data'
import { useNavigate } from 'react-router-dom'
import { TitleGallery } from '@/common/TitleForGallery'
type IdParams = {
  collectionId: string
}
const { Column } = Table
export const Items = () => {
  const { collectionId } = useParams<IdParams>()
  const navigate = useNavigate()
  const data = items.filter((item) => item._id === collectionId)

  const handleRowClick = (record: ArtDataItem) => {
    return {
      onClick: () => {
        navigate(`items/${record.item_id}`)
      },
    }
  }
  return (
    <Layout>
      <Content>
        <Wrapper>
          <StyledContent>
            <TitleGallery firstLineText={'Collection'} />
            <Table dataSource={data} onRow={handleRowClick}>
              <Column title="Title" dataIndex="title" key="title" />
              <Column title="Author" dataIndex="author" key="author" />
              <Column title="Year" dataIndex="year" key="year" />
              <Column title="Content" dataIndex="content" key="content" />
              <Column
                title="Tags"
                dataIndex="tags"
                key="tags"
                render={(tags: string[]) => (
                  <>
                    {tags.map((tag) => {
                      let color = tag.length > 5 ? 'geekblue' : 'green'
                      if (tag === 'loser') {
                        color = 'volcano'
                      }
                      return (
                        <Tag color={color} key={tag}>
                          {tag.toUpperCase()}
                        </Tag>
                      )
                    })}
                  </>
                )}
              />
              <Column
                title="Action"
                key="action"
                render={(_: any) => (
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
