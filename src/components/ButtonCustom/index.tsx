import { Button, Form } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'
import { ButtonType, ButtonHTMLType } from 'antd/lib/button/buttonHelpers'

interface ButtonCustomProps extends ButtonProps {
  htmlType?: ButtonHTMLType
  onClick?: () => void
}

export const ButtonCustom = ({
  children,
  htmlType,
  type,
  danger,
  loading,
  shape,
  icon,
  onClick,
}: ButtonCustomProps) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type as ButtonType}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
      >
        {children}
      </Button>
    </Form.Item>
  )
}
