import { Button, Form, Input, Select } from 'antd'
import { LoadingSpinner } from '@components/Loader'
import { useNavigate } from 'react-router-dom'
import { ItemDataCreate, ItemDataResponse } from '@/types/interfaces'

interface FormItemCustomProps {
  initialValues: ItemDataResponse | {}
  onFinish: (values: ItemDataCreate) => void
  isLoading: boolean
  buttonText: string
  titles?: string[] | undefined
}

export const ItemForm = ({
  initialValues,
  onFinish,
  isLoading,
  buttonText,
  titles,
}: FormItemCustomProps) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const handleCancel = () => {
    navigate(-1)
  }
  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <Form
      id="myForm"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ width: '100%', marginTop: '20px' }}
      autoComplete="off"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item label="Name" name="name" key="name">
        <Input />
      </Form.Item>

      <Form.Item label="Tags" name="tags" key="tags">
        <Select mode="tags" />
      </Form.Item>
      {titles?.map((fieldName, index) => (
        <Form.Item label={fieldName} name={`custom_string${index + 1}_name`} key={fieldName}>
          <Input />
        </Form.Item>
      ))}
      {buttonText === 'Update' && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="default" onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {buttonText}
          </Button>
        </div>
      )}
    </Form>
  )
}
