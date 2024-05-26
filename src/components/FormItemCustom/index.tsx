import { Dispatch, memo, SetStateAction } from 'react'
import { useActions } from '@/hooks/useActions'
import { itemsThunk } from '@/app/items-reducer'
import { ItemForm } from '@components/FormItemCustom/Form'
import { ItemDataCreate } from '@/types/interfaces'
import { Form } from 'antd'

interface FormItemCustomProps {
  collectionId: string | undefined
  setOpen: Dispatch<SetStateAction<boolean>>
  titles?: string[]
}

export const FormItemCustom = memo(({ collectionId, setOpen, titles }: FormItemCustomProps) => {
  const { createItem } = useActions(itemsThunk)
  const [form] = Form.useForm()

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
    form.resetFields()
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
