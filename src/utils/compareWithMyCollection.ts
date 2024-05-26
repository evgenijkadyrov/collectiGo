export const compareRecordWithMyCollections = (
  recordId: string | undefined,
  myCollections: string[]
) => {
  if (recordId) return myCollections?.includes(recordId)
}
