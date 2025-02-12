import { CollectionResponse } from '@/types/interfaces'

const NUMBER_BIGGEST_COLLECTIONS = 5
export function sortBiggestCollections(collections: CollectionResponse[]) {
  const sortedCollections = [...collections].sort((a, b) => b.items.length - a.items.length)
  return sortedCollections.slice(0, NUMBER_BIGGEST_COLLECTIONS)
}
