import { RichTextEditor } from '@/components/richTexteditor/RichTextEditor'
import { CropImageUploader } from '@/components/upload-files/CropImageUploader'
import { useLoading } from '@/hooks'
import { Button, Checkbox, Col, Form, Input, Row, Select, message } from 'antd'
import 'react-quill/dist/quill.snow.css'
import { CreatePostApi, CreatePostDto } from '@/pages/api/admin.api'
import { checkRes } from '@/network/services/api-handler'

export function NewPost(): JSX.Element {
  const { setIsLoading } = useLoading()
  async function createNewPost(values: CreatePostDto) {
    console.log(values)
    setIsLoading(true)
    const result = await CreatePostApi(values)
    checkRes(
      result,
      () => {
        message.success('Đã lưu bài viết!')
      },
      () => {
        message.error('Đã có lỗi xảy ra!')
      },
      () => {
        setIsLoading(false)
      }
    )
  }

  return (
    <Row justify="center">
      <Col xxl={18}>
        <Form
          name="newPost"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={createNewPost}
          //  onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tiêu đề bài đăng"
            name="title"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề cho bài viết!'
              },
              { min: 20, message: 'Tiêu đề cần dài hơn 20 ký tự' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Phân loại bài đăng"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn phân loại bài viết!'
              }
            ]}
          >
            <Select
              placeholder="Loại bài đăng"
              allowClear
              options={[
                { value: 'news', label: 'Tin tức - Sự kiện' },
                { value: 'study', label: 'Góc học tập' }
              ]}
            />
          </Form.Item>
          {/* TODO: ẢNH BÀI ĐĂNG */}
          {/* <Form.Item name="image" label="Ảnh hiển thị cho thẻ của bài đăng">
           <CropImageUploader maxLength={1} />
          </Form.Item> */}
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[
              {
                required: true,
                message: 'Nội dung không được để trống!'
              },
              { min: 8, message: 'Nội dung không được để trống!' }
            ]}
          >
            <RichTextEditor />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
