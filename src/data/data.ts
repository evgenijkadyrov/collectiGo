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
