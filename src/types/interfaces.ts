export const collectionsCategory: CategoryType[] = [
  'Coins',
  'Stamps',
  'Sports Memorabilia',
  'Art',
  'Books',
  'Antiques',
  'Comic Books',
  'Music Records',
  'Others',
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
  | 'Others'

export interface CollectionResponse {
  _id: string
  name: string
  category: CategoryType
  image_url: string
  description: string
  custom_string1_state: string
  custom_string2_state: string
  custom_string3_state: string
  custom_string1_name: string
  custom_string2_name: string
  custom_string3_name: string
  items: string[]
}

export interface ArtCollection extends Omit<CollectionResponse, '_id'> {}

export interface ArtCollectionCreate extends Partial<ArtCollection> {
  optionalFields: { field: boolean; name: string }[]
}

export interface ItemData {
  _id: string
  collection_id: string
  name: string
  tags: string[]
  createdBy: string
}

export interface ItemDataCreate {
  name: string
  tags: string[]
  createdBy: string
  custom_string1_name: string
  custom_string2_name: string
  custom_string3_name: string
}

export interface ItemDataResponse extends ItemDataCreate {
  _id: string
  collection_id: string
  custom_string1_state: boolean
  custom_string2_state: boolean
  custom_string3_state: boolean
}
