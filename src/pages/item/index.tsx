import { TitleGallery } from '@/common/TitleForGallery'
import { Layout } from '@/common/Layout/Layout'
import { Content, Wrapper } from './styles'
import { useParams } from 'react-router-dom'
import { Card, Tag } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { ItemDataResponse } from '@/data/data'

export const Item = () => {
  const { itemId } = useParams()
  const items = useSelector<RootState, ItemDataResponse[]>((state) => state.items.items)
  const item = items.find((item) => item._id === itemId)
  return (
    <Layout>
      <Wrapper>
        <Content>
          <TitleGallery firstLineText={'Item'} />
          {item && (
            <Card title={item.name} bordered={false}>
              {Object.entries(item).map(([key, value]) => {
                if (key == 'item_id' || key == 'collection_id') {
                  return null
                }
                return (
                  <Card type={'inner'} title={key} key={key}>
                    {Array.isArray(value)
                      ? value.map((tag) => {
                          let color = tag.length > 5 ? 'geekblue' : 'green'
                          if (tag === 'loser') {
                            color = 'volcano'
                          }
                          return (
                            <Tag color={color} key={tag}>
                              {tag.toUpperCase()}
                            </Tag>
                          )
                        })
                      : value}
                  </Card>
                )
              })}
            </Card>
          )}
        </Content>
      </Wrapper>
    </Layout>
  )
}
