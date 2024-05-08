import { Alert } from 'antd'

interface ErrorMessageProps {
  message?: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) {
    return null
  }
  return <Alert message={message} type={'error'} />
}
