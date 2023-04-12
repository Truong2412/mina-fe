import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PATH, ROLE } from '../../const/app-const'
import { useActor } from '../../ultis/useActor'
import { LockOutlined, UserOutlined, MobileOutlined } from '@ant-design/icons'
import { checkRes } from '../../network/services/response-handler'
import { registerDataType } from '../../types/user-type'
import { RegisterApi } from '../../network/user-api'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select
} from 'antd'
import { useLoading } from '../../hooks'
import { REGEX } from '../../const/regexp'
interface Props {
  role: string
}

export const Register: React.FC<Props> = ({ role }) => {
  const navigate = useNavigate()
  const actor = useActor()
  const { setIsLoading } = useLoading()
  const registerApiHandler = async (data: registerDataType) => {
    console.log(data)
    setIsLoading(true)
    const registerResult = await RegisterApi(data)
    checkRes(
      registerResult,
      () => {
        message.success('Đăng ký thành công!')
        navigate(`/${actor}/${PATH.LOGIN}`)
      },
      () => {
        message.error('Đăng ký thất bại!')
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
        lg={{ span: 12 }}
        xl={{ span: 8 }}
        style={{ padding: 16 }}
      >
        <Row justify="center" style={{ marginBottom: 20 }}>
          logo
        </Row>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={(values) =>
            registerApiHandler({
              ...values,
              role
            })
          }
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Vui lòng điền họ tên!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Họ tên"
            />
          </Form.Item>
          <Form.Item
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Select
              placeholder="Giới tính"
              options={[
                { value: 'male', label: 'Nam' },
                { value: 'female', label: 'Nữ' },
                { value: 'else', label: 'Khác' }
              ]}
            />
          </Form.Item>
          <Form.Item
            name="yOB"
            rules={[
              { required: true, message: 'Vui lòng điền năm sinh (4 số)!' }
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              minLength={4}
              maxLength={4}
              min={1900}
              max={2020}
              placeholder="Năm sinh"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng điền số điện thoại!' },
              { pattern: REGEX.PHONE, message: 'Số điện thoại không hợp lệ!' }
            ]}
          >
            <Input
              prefix={<MobileOutlined className="site-form-item-icon" />}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng điền mật khẩu!' },
              { min: 6, message: 'Ít nhất 6 kí tự!' },
              {
                pattern: REGEX.PASSWORD,
                message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa và 1 số'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('Mật khẩu xác nhận không trùng!')
                }
              })
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
        <Row>
          <Col span={12}>
            {role === ROLE.CUSTOMER ? (
              <Link to={`/${PATH.CUSTOMER}/${PATH.LOGIN}`}>
                <p style={{ float: 'left' }}> Đăng nhập</p>
              </Link>
            ) : (
              <Link to={`/${PATH.MANAGER}/${PATH.REGISTER}`}>
                <p style={{ float: 'left' }}> Đăng nhập</p>
              </Link>
            )}
          </Col>
          <Col span={12}>
            <Link to={`/${PATH.CUSTOMER}/${PATH.FORGOT_PASSWORD}`}>
              <p style={{ float: 'right' }}> Quên mật khẩu</p>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
