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
