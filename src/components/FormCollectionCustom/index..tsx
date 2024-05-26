import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import { memo } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { ArtCollectionCreate, collectionsCategory } from '@/types/interfaces'

interface FormCustomProps {
  onSubmit: (values: ArtCollectionCreate) => void
  initialValues?: any
  editMode: boolean
}

export const FormCustom = memo(({ onSubmit, initialValues, editMode }: FormCustomProps) => {
  const [form] = Form.useForm()
  const onFinish = (values: ArtCollectionCreate) => {
    onSubmit(values)
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
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item label="Name collection" name={'name'}>
        <Input />
      </Form.Item>
      <Form.Item label="Category" name={'category'}>
        <Select
          style={{ width: 240 }}
          options={collectionsCategory.map((category) => ({
            label: category,
            value: category,
          }))}
        />
      </Form.Item>
      <Form.Item label="Image" name={'image_url'}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name={'description'}>
        <TextArea />
      </Form.Item>
      {!editMode && (
        <Form.List name="optionalFields">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <Space key={field.key}>
                  <Form.Item noStyle name={[field.name, 'name']}>
                    <Input placeholder="enter field name" />
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name)
                    }}
                  />
                </Space>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                + Add Item field
              </Button>
            </div>
          )}
        </Form.List>
      )}
    </Form>
  )
})
