import { Dispatch, memo, SetStateAction } from 'react'
import { useActions } from '@/hooks/useActions'
import { itemsThunk } from '@/app/items-reducer'
import { ArtItemCreate } from '@/data/data'
import { Form, Input, Select } from 'antd'

interface FormItemCustomProps {
  collectionId: string | undefined
  setOpen: Dispatch<SetStateAction<boolean>>
}
export const FormItemCustom = memo(({ collectionId, setOpen }: FormItemCustomProps) => {
  const [form] = Form.useForm()
  const { createItem } = useActions(itemsThunk)
  const handleSubmit = async (data: ArtItemCreate) => {
    if (collectionId)
      try {
        debugger
        await createItem({ data, collectionId })
        setOpen(false)
      } catch (error: any) {
        console.log('error', error)
        throw new Error(`Error create collection: ${error.response.data.message}`)
      }
  }
  const onFinish = (values: ArtItemCreate) => {
    handleSubmit(values)
  }

  return (
    <Form
      id={'myForm'}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{}}
      onFinish={onFinish}
    >
      <Form.Item label="Name item" name={'name'}>
        <Input />
      </Form.Item>
      <Form.Item label="Author" name={'author'}>
        <Input />
      </Form.Item>
      <Form.Item label="Tags" name={'tags'}>
        <Select mode="tags" />
      </Form.Item>
    </Form>
  )
})
