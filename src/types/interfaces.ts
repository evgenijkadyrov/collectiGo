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

export interface ArtCollectionResponse {
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
}

export interface ArtCollection extends Omit<ArtCollectionResponse, '_id'> {}

export interface ArtCollectionCreate extends Partial<ArtCollection> {
  optionalFields: { field: boolean; name: string }[]
}
