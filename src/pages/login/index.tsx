import { Card, Form, Row, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '@/Paths.ts'
import { ButtonCustom } from '@components/ButtonCustom/index.tsx'
import { InputPassword } from '@components/Password-input/index.tsx'
import { useLoginUser } from '@/hooks/useLoginUser.ts'
import { ErrorMessage } from '@components/ErrorMessage/index.tsx'
import { InputCustom } from '@components/InputCustom/index.js'
import { Layout } from '@/common/Layout/Layout'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

export const Login = () => {
  const { loginUser, error } = useLoginUser()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  if (isLoggedIn) {
    navigate(Paths.home)
  }
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title={'Authorization'} style={{ width: '30rem' }}>
          <Form onFinish={loginUser}>
            <InputCustom name={'email'} placeholder={'email'} type={'email'} />
            <InputPassword name={'password'} placeholder={'password'} />
            <ButtonCustom type={'primary'} htmlType={'submit'}>
              Log in
            </ButtonCustom>
          </Form>
          <ErrorMessage message={error} />
          <Space direction={'vertical'} size={'large'}>
            <Typography.Text>
              No account? Please, <Link to={Paths.register}>Sing up</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
