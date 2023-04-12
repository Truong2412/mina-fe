import {
  Button,
  Col,
  Input,
  Row,
  Divider,
  Form,
  Select,
  message,
  Tag
} from 'antd'
import { TagsOutlined } from '@ant-design/icons'
import { createTagApi, deleteTagApi, getTagApi } from '../../../network/tag-api'
import { useLoading, useUser } from '../../../hooks'
import { checkRes } from '../../../network/services/response-handler'
import { useEffect, useState } from 'react'
import { TagsLoading } from '../../../components'
const { Option } = Select

export interface formDataProps {
  name: string
  color: string
}

export interface tagProps {
  name: string
  color: string
  _id: string
}

export const TagManager = () => {
  const colorList = [
    {
      label: 'Hồng tím',
      value: 'magenta'
    },
    {
      label: 'Đỏ',
      value: 'red'
    },
    {
      label: 'Cam đỏ',
      value: 'volcano'
    },
    {
      label: 'Cam',
      value: 'orange'
    },
    {
      label: 'Vàng',
      value: 'gold'
    },
    {
      label: 'lime',
      value: 'lime'
    },
    {
      label: 'Xanh lá',
      value: 'green'
    },
    {
      label: 'Cyan',
      value: 'cyan'
    },
    {
      label: 'Xanh dương',
      value: 'blue'
    },
    {
      label: 'Xanh tím',
      value: 'geekblue'
    },
    {
      label: 'Tím',
      value: 'purple'
    }
  ]
  const { token } = useUser()
  const { setIsLoading } = useLoading()
  const [tags, setTags] = useState<tagProps[]>([])
  const [tabLoading, setTabLoading] = useState(true)
  //get current Tags
  useEffect(() => {
    const getTags = async () => {
      if (token) {
        const result = await getTagApi(token)
        checkRes(
          result,
          () => {
            setTags(result.data.dataTable)
          },
          () => null,
          () => setTabLoading(false)
        )
      }
    }

    token && getTags()
  }, [token])

  //handle add new tag
  const handleAddTag = async (values: formDataProps) => {
    setIsLoading(true)
    if (token) {
      const createResult = await createTagApi({
        data: values,
        token: token
      })
      checkRes(
        createResult,
        () => {
          setTags([...tags, { ...values, _id: createResult.data }])
          message.success('Tạo thẻ mới thành công!')
        },
        () => message.error('Đã có lỗi xảy ra'),
        () => setIsLoading(false)
      )
    }
  }

  //handle delete tag
  const handleClose = async (_id: string) => {
    setIsLoading(true)
    if (token) {
      const createResult = await deleteTagApi(token, _id)
      checkRes(
        createResult,
        () => {
          const newTags = tags.filter((tag) => tag._id !== _id)
          setTags(newTags)
          message.success('Đã xóa thẻ!')
        },
        () => message.error('Đã có lỗi xảy ra'),
        () => setIsLoading(false)
      )
    }
  }

  return (
    <div
      className="containerBoxShadow"
      style={{ minHeight: '70vh', padding: '1rem' }}
    >
      <Row gutter={[8, 8]} justify="center">
        <Col lg={16} md={12} sm={24} xs={24} xl={10} xxl={10}>
          <Row
            className="containerBoxShadow"
            style={{ background: 'white', padding: '1rem', height: '100%' }}
            justify="center"
          >
            <Col>
              <Divider>Các thẻ có sẵn</Divider>
              <Row gutter={[4, 4]}>
                {tabLoading ? (
                  <TagsLoading />
                ) : tags.length === 0 ? (
                  <p style={{ textAlign: 'center' }}> Chưa có thẻ nào !</p>
                ) : (
                  tags.map((tag, index) => (
                    <Col span={12} key={`${index}-${tag._id}`}>
                      <Tag
                        closable
                        onClose={() => handleClose(tag._id)}
                        icon={<TagsOutlined />}
                        color={tag.color}
                      >
                        {tag.name}
                      </Tag>
                    </Col>
                  ))
                )}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={8} md={12} sm={24} xs={24}>
          <div
            className="containerBoxShadow"
            style={{ background: 'white', padding: '1rem', height: '100%' }}
          >
            <Divider>Thêm mới thẻ</Divider>
            <Form name="add_tag_form" onFinish={handleAddTag}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Vui lòng tên thẻ !' }]}
              >
                <Input
                  prefix={<TagsOutlined className="site-form-item-icon" />}
                  placeholder="Tên thẻ"
                />
              </Form.Item>
              <Form.Item
                name="color"
                rules={[{ required: true, message: 'Vui lòng chọn màu sắc' }]}
              >
                <Select placeholder="Màu sắc">
                  {colorList.map((color, index) => (
                    <Option
                      style={{ color: color.value }}
                      key={`color-${color}-${index}`}
                      value={color.value}
                    >
                      {color.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block
                >
                  Thêm
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}
