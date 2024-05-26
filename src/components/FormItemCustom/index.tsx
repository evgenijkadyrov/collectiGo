import { Dispatch, memo, SetStateAction } from 'react'
import { useActions } from '@/hooks/useActions'
import { itemsThunk } from '@/app/items-reducer'
import { ItemForm } from '@components/FormItemCustom/Form'
import { ItemDataCreate } from '@/types/interfaces'

interface FormItemCustomProps {
  collectionId: string | undefined
  setOpen: Dispatch<SetStateAction<boolean>>
  titles?: string[]
}

export const FormItemCustom = memo(({ collectionId, setOpen, titles }: FormItemCustomProps) => {
  const { createItem } = useActions(itemsThunk)

  const handleSubmit = async (data: ItemDataCreate) => {
    if (collectionId) {
      try {
        await createItem({ data, collectionId })
        setOpen(false)
      } catch (error: any) {
        console.log('error', error)
        throw new Error(`Error creating collection: ${error.response.data.message}`)
      }
    }
  }

  const onFinish = (values: ItemDataCreate) => {
    handleSubmit(values)
  }

  return (
    <ItemForm
      initialValues={{}}
      onFinish={onFinish}
      isLoading={false}
      buttonText="Create"
      titles={titles}
    />
  )
})
