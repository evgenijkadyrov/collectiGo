import { Card, Form, Row, Space, Typography } from "antd";
import { InputCustom } from "@components/InputCustom";
import { ButtonCustom } from "@components/ButtonCustom";
import { InputPassword } from "@components/Password-input";
import { Link } from "react-router-dom";
import { Paths } from "@/Paths";
import { ErrorMessage } from "@components/ErrorMessage";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import {Layout} from "@/common/Layout/Layout";

export const Register = () => {
  const { error, handleRegister } = useRegisterUser();

  return (
      <Layout>
        <Row align="middle" justify="center">
          <Card title={"Sign up"} style={{ width: "30rem" }}>
            <Form onFinish={handleRegister}>
              <InputCustom name={"name"} placeholder={"Name"} />
              <InputCustom name={"email"} placeholder={"Email"} type={"email"} />
              <InputPassword name={"password"} placeholder={"Password"} />
              <InputPassword
                  name={"confirmPassword"}
                  placeholder={"Confirm Password"}
              />
              <ButtonCustom type={"primary"} htmlType={"submit"}>
                Sign up
              </ButtonCustom>
            </Form>
            {error && <ErrorMessage message={error} />}
            <Space direction={"vertical"} size={"large"}>
              <Typography.Text>
                Already have an account? Please,{" "}
                <Link to={Paths.login}>Log in</Link>
              </Typography.Text>
            </Space>
          </Card>
        </Row>
      </Layout>
  );
};