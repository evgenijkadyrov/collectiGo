export const compareRecordWithMyCollections = (recordId: string, myCollections: string[]) => {
  return myCollections?.includes(recordId)
}
