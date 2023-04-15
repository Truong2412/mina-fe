import { RichTextEditor } from '@/components'
import { CropImageUploader } from '@/components/upload-files/CropImageUploader'
import {
  CLASS_LEVEL,
  classLevelOption,
  dayOfWeekOption
} from '@/const/app-const'
import { useLoading, useUser } from '@/hooks'
import { checkRes } from '@/network/services/api-handler'
import { CreateClassApi, CreateClassDto } from '@/pages/api/class.api'
import {
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  DatePicker,
  TimePicker,
  message
} from 'antd'
import React from 'react'

export function NewClass() {
  const { user } = useUser()
  const { setIsLoading } = useLoading()
  const [form] = Form.useForm()

  async function onFinish(values: CreateClassDto) {
    setIsLoading(true)
    if (user._id !== undefined) {
      const result = await CreateClassApi({ ...values, creatorId: user._id })
      checkRes(
        result,
        () => {
          message.success('Tạo thành công!')
          form.resetFields()
        },
        () => {
          message.error('Đã có lỗi xảy ra!')
        },
        () => {
          setIsLoading(false)
        }
      )
    }
  }

  const initValue = {
    numberOfStudents: 5,
    classLevel: CLASS_LEVEL.N5
  }

  return (
    <Row>
      <Col xxl={18}>
        <Form
          form={form}
          name="newClass"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          initialValues={initValue}
          //  onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="cardImg"
            label="Ảnh đại diện cho lớp tuyển sinh"
            rules={[
              {
                required: true,
                message: 'Cần tải lên ít nhất 1 ảnh'
              }
            ]}
          >
            <CropImageUploader
              maxLength={1}
              setValue={(value: string[]) =>
                form.setFieldValue('cardImg', value[0])
              }
            />
          </Form.Item>

          <Form.Item
            name="classLevel"
            label="Level giảng dạy"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn level cho lớp!'
              }
            ]}
          >
            <Select
              placeholder="Level giảng dạy"
              allowClear
              options={classLevelOption}
            />
          </Form.Item>

          <Form.Item
            label="Ngày học trong 1 tuần"
            name="daysOfWeek"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn ngày học  trong 1 tuần!'
              }
            ]}
          >
            <Select
              options={dayOfWeekOption}
              placeholder="Số buổi học trong tuần"
              mode="multiple"
            />
          </Form.Item>

          <Form.Item
            name="schedule"
            label="Thời gian khoá học"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền đầy đủ thông tin!'
              }
            ]}
          >
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              placeholder={['Ngày bắt đầu', ' Ngày dự kiến kết thúc']}
            />
          </Form.Item>

          <Form.Item
            name="time"
            label="Giờ học"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn giờ học'
              }
            ]}
          >
            <TimePicker.RangePicker
              style={{ width: '100%' }}
              placeholder={['Giờ bắt đầu', ' Giờ kết thúc']}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả - thông tin thêm"
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

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button block type="primary" htmlType="submit">
              Tạo lớp
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
