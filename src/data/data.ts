import { ArtCollectionResponse } from '@/app/collections-reducer'

export const collectionsCategory: CategoryType[] = [
  'Coins',
  'Stamps',
  'Sports Memorabilia',
  'Art',
  'Books',
  'Antiques',
  'Comic Books',
  'Music Records',
]
export type CategoryType =
  | 'Coins'
  | 'Stamps'
  | 'Sports Memorabilia'
  | 'Art'
  | 'Books'
  | 'Antiques'
  | 'Comic Books'
  | 'Music Records'

export interface ArtCollection extends Omit<ArtCollectionResponse, '_id'> {}

export interface ArtCollectionCreate extends Partial<ArtCollection> {
  optionalFields: { field: boolean; name: string }[]
}

export interface ArtDataItem {
  _id: string
  collection_id: string
  name: string
  tags: string[]
  author: string
}
export interface ArtItemCreate {
  name: string
  tags: string[]
  author: string
  custom_string1_name: string
  custom_string2_name: string
  custom_string3_name: string
}
export interface ArtDataItemResponse {
  _id: string
  collection_id: string
  name: string
  tags: string[]
  author: string
  custom_string1_name: string | null
  custom_string2_name: string | null
  custom_string3_name: string | null
  custom_string1_state: boolean
  custom_string2_state: boolean
  custom_string3_state: boolean
}
