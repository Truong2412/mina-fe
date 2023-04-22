import React from 'react'
import { PATH, ROLE } from '../../const/app-const'
import { useActor } from '../../ultis/useActor'
import {
  LockOutlined,
  UserOutlined,
  MobileOutlined,
  MailOutlined
} from '@ant-design/icons'
import { RegisAccountApi, RegisAccountApiProps } from '../api/user.api'
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
import { useRouter } from 'next/router'
import Link from 'next/link'
import { checkRes } from '@/network/services/api-handler'
import Image from 'next/image'
import { useMutation } from 'react-query'

export default function Register(): JSX.Element {
  const router = useRouter()

  const { setIsLoading } = useLoading()
  const Register = useMutation(
    (data: RegisAccountApiProps) => RegisAccountApi(data),
    {
      onMutate: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        setIsLoading(false)
        message.success('Đăng ký thành công!')
        router.push(`/${PATH.LOGIN}`)
      },
      onError: () => {
        setIsLoading(false)
        message.error('Đã có lỗi xảy ra')
      }
    }
  )

  return (
    <Row align="middle" justify="center" style={{ minHeight: '90vh' }}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        xl={{ span: 8 }}
        style={{ padding: 16 }}
      >
        <Row justify="center" style={{ marginBottom: 20 }}>
          <Col>
            <Image src={`/favicon.svg`} alt="mina" width={80} height={80} />
          </Col>
        </Row>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={(values: RegisAccountApiProps) => Register.mutate(values)}
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
            name="email"
            rules={[
              { required: true, message: 'Vui lòng điền email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng điền mật khẩu!' },
              { min: 6, message: 'Ít nhất 6 kí tự!' }
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
            <Link href={`/${PATH.LOGIN}`}>
              <p style={{ float: 'left' }}> Đăng nhập</p>
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
