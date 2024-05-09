import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Space } from 'antd'
import { ArtCollectionCreate, categories } from '@/data/data'
import { memo } from 'react'

interface FormCustomProps {
  onSubmit: (values: ArtCollectionCreate) => void
}

export const FormCustom = memo(({ onSubmit }: FormCustomProps) => {
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
      initialValues={{}}
      onFinish={onFinish}
    >
      <Form.Item label="Title collection" name={'title'}>
        <Input />
      </Form.Item>
      <Form.Item label="Category" name={'category'}>
        <Select
          style={{ width: 240 }}
          options={categories.map((category) => ({
            label: category,
            value: category,
          }))}
        />
      </Form.Item>
      <Form.Item label="Picture" name={'picture'}>
        <Input />
      </Form.Item>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <Space key={field.key}>
                <Form.Item noStyle name={[field.name, 'field']}>
                  <Input placeholder="field" />
                </Form.Item>
                <Form.Item noStyle name={[field.name, 'value']}>
                  <Input placeholder="value" />
                </Form.Item>
                <CloseOutlined
                  onClick={() => {
                    remove(field.name)
                  }}
                />
              </Space>
            ))}
            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>
    </Form>
  )
})
