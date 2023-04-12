import { Button, Col, Form, Input, message, Row } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginApi } from '../../network/user-api'
import { useLoading, useUser } from '../../hooks'
import { checkRes } from '../../network/services/response-handler'
import { basicUser } from '../../types/user-type'
import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import { PATH, ROLE } from '../../const/app-const'
import { useActor } from '../../ultis/useActor'
import { REGEX } from '../../const/regexp'
export interface LoginApihandlerProps {
  data: basicUser
}

export const Login: React.FC = () => {
  const actor = useActor()
  const navigate = useNavigate()
  const { login } = useUser()
  const { setIsLoading } = useLoading()

  const LoginApiHandler = async ({ data }: LoginApihandlerProps) => {
    setIsLoading(true)
    const result = await LoginApi(data)
    checkRes(
      result,
      () => {
        login(result.data.accessToken)
        navigate(`/`)
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
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng điền số điện thoại!' },
              { pattern: REGEX.PHONE, message: 'Số điện thoại không hợp lệ !' }
            ]}
          >
            <Input
              prefix={<MobileOutlined className="site-form-item-icon" />}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng điền mật khẩu!' }]}
          >
            <Input
              prefix={<LockOutlined />}
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
            <Link to={`/${actor}/${PATH.REGISTER}`}>
              <p style={{ float: 'left' }}> Đăng ký</p>
            </Link>
          </Col>
          <Col span={12}>
            {actor !== ROLE.ADMIN ? (
              <Link to={PATH.FORGOT_PASSWORD}>
                <p style={{ float: 'right' }}> Quên mật khẩu</p>
              </Link>
            ) : (
              <p style={{ float: 'right' }}> Quên mật khẩu</p>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
