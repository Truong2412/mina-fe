import { Button, Col, Form, Input, message, Row } from 'antd'
import React from 'react'
// import { Link, useNavigate } from 'react-router-dom
import { LoginApiProps, LoginWithAccountApi } from '../api/user.api'
import { useLoading, useUser } from '../../hooks'
import { LockTwoTone, MailTwoTone } from '@ant-design/icons'
import { PATH, ROLE } from '../../const/app-const'
import { REGEX } from '../../const/regexp'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { checkRes } from '@/network/services/api-handler'
export interface LoginApihandlerProps {
  data: LoginApiProps
}
export default function Login(): JSX.Element {
  const router = useRouter()
  const { login } = useUser()
  const { setIsLoading } = useLoading()

  const LoginApiHandler = async ({ data }: LoginApihandlerProps) => {
    setIsLoading(true)
    const result = await LoginWithAccountApi(data)
    checkRes(
      result,
      () => {
        if (result.data !== null) {
          login(result.data.accessToken)
          router.push(`/`)
        }
      },
      () => {
        message.error('Thông tin đăng nhập không chính xác!')
      },
      () => {
        setIsLoading(false)
      }
    )
  }

  return (
    <Row align="middle" justify="center" style={{ height: '90vh' }}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
        xl={8}
        xxl={6}
        style={{ padding: 16 }}
      >
        <Row justify="center" style={{ marginBottom: 20 }}>
          logo
        </Row>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={(values) => LoginApiHandler({ data: values })}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng điền email!' },
              { pattern: REGEX.EMAIL, message: 'Email không hợp lệ !' }
            ]}
          >
            <Input prefix={<MailTwoTone />} placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng điền mật khẩu!' }]}
          >
            <Input
              prefix={<LockTwoTone />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Row>
          <Col span={12}>
            <Link href={`/${PATH.REGISTER}`}>
              <p style={{ float: 'left' }}> Đăng ký</p>
            </Link>
          </Col>
          <Col span={12}>
            <Link href={`/${PATH.FORGOT_PASSWORD}`}>
              <p style={{ float: 'right' }}> Quên mật khẩu</p>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
