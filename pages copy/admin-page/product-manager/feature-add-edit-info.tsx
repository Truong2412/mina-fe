import {
  Button,
  Form,
  Input,
  message,
  Select,
  UploadFile,
  Tag,
  InputNumber,
  Row,
  Col
} from 'antd'

import React, { useEffect, useState } from 'react'
import { useLoading, useUser } from '../../../hooks'
import { getTagApi } from '../../../network/tag-api'
import { checkRes } from '../../../network/services/response-handler'
import { tagProps } from '../category-manager/feature-tag-manager'
import { responseProps } from '../../../types/app-common-type'
import { ContentLoading, CropImageUploader } from '../../../components'
import {
  createProductApi,
  CreateProductProps
} from '../../../network/productpi'

const { Option } = Select
interface Props {
  type: 'add' | 'edit'
  data: any
}
export const AddAndEditProduct: React.FC<Props> = ({ type, data }) => {
  const { token } = useUser()
  const { setIsLoading } = useLoading()
  const [tags, setTags] = useState<tagProps[]>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [tabLoading, setTabLoading] = useState<boolean>(true)
  //   console.log(tags)
  //get remote data
  const getTagFromRemote = async (token: string) => {
    setTabLoading(true)
    const getTags: responseProps = await getTagApi(token)
    checkRes(
      getTags,
      () => {
        setTags(getTags.data.dataTable)
      },
      () => null,
      () => null
    )
    setTabLoading(false)
  }

  useEffect(() => {
    if (token) getTagFromRemote(token)
  }, [token])

  const [form] = Form.useForm()
  const onFinish = async (values: CreateProductProps) => {
    setIsLoading(true)
    try {
      const createResult = await createProductApi({
        data: values,
        token: token ?? ''
      })
      checkRes(
        createResult,
        () => {
          message.success(`Đã tạo sản phẩm : ${values.name}`)
        },
        () => {
          message.error(createResult.msg)
        },
        () => setIsLoading(false)
      )
    } catch (error) {
      setIsLoading(false)
      message.error('Đã có lỗi xảy ra:' + error)
    }
  }

  return (
    <React.Fragment>
      {tabLoading ? (
        <ContentLoading />
      ) : (
        <Form
          form={form}
          name="product-add-edit"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="productImgs"
            label="Danh sách ảnh"
            rules={[
              {
                required: true,
                message: 'Cần tải lên ít nhất 1 ảnh'
              }
            ]}
          >
            <CropImageUploader
              maxLength={3}
              setValue={(value: string[]) =>
                form.setFieldValue('productImgs', value)
              }
            />
          </Form.Item>

          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Tình trạng"
            name="status"
            rules={[
              { required: true, message: 'Vui lòng chọn phân loại sản phẩm!' }
            ]}
          >
            <Select placeholder="Tình trạng sản phẩm">
              <Option value="ass">s</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={'retailUnit'}
            label="Đơn vị bán lẻ"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập đơn vị bán lẻ của sản phẩm!'
              }
            ]}
          >
            <Input placeholder="Đơn vị bán lẻ (gói, hộp, lon, túi ..v.v..)" />
          </Form.Item>

          <Form.Item
            label="Gắn thẻ (tags)"
            name="tags"
            rules={[{ required: false }]}
          >
            <Select mode="multiple" placeholder="Chọn thẻ (tag)">
              {tags.map((tag) => (
                <Option key={`current tags - ${tag._id}`} value={tag._id}>
                  <Tag color={tag.color}>{tag.name}</Tag>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Phân loại sản phẩm"
            name="classify"
            rules={[{ required: true, message: 'Thêm ít nhất 1 phân loại' }]}
          >
            <Form.List name="classify">
              {(fields, { add, remove }) => (
                <Row gutter={[8, 8]} justify="center">
                  {fields.map((field, index) => (
                    <Col
                      span={24}
                      key={field.key}
                      style={{
                        background: 'lightgray',
                        padding: 16,
                        borderRadius: '1rem'
                      }}
                    >
                      <Form.Item
                        name={[field.name, 'classifyName']}
                        label="Tên phân loại"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập tên phân loại!'
                          }
                        ]}
                      >
                        <Input placeholder="Tên phân loại" />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'classifyPrice']}
                        label="Giá phân loại"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập giá phân loại!'
                          }
                        ]}
                      >
                        <InputNumber
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }
                          placeholder="Giá phân loại"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'unitSales']}
                        label="Đơn vị bán"
                        rules={[
                          {
                            required: true,
                            message: 'Vui nhập chọn đơn vị bán'
                          }
                        ]}
                      >
                        <Input placeholder="Đơn vị bán" />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'convertToRetailUnit']}
                        label="Tỷ lệ chuyển đổi số lượng so với đơn vị bán lẻ"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập số lượng chuyển đổi'
                          }
                        ]}
                      >
                        <InputNumber
                          addonBefore={
                            form.getFieldValue([
                              'classify',
                              index,
                              'unitSales'
                            ]) &&
                            `1 ${form.getFieldValue([
                              'classify',
                              index,
                              'unitSales'
                            ])} =`
                          }
                          addonAfter={
                            form.getFieldValue('retailUnit') &&
                            form.getFieldValue('retailUnit')
                          }
                          placeholder="Tỷ lệ so với đơn vị bán lẻ"
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                      <Form.Item
                        name={[field.name, 'classifyImg']}
                        label="Ảnh phân loại:"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng tải lên 1 ảnh cho phân loại này'
                          }
                        ]}
                      >
                        <CropImageUploader
                          maxLength={1}
                          setValue={(value: string[]) =>
                            form.setFieldValue(
                              ['classify', index, 'classifyImg'],
                              value[0]
                            )
                          }
                        />
                      </Form.Item>
                      <Button
                        type="primary"
                        danger
                        onClick={() => remove(index)}
                        block
                      >
                        Xóa phân loại này
                      </Button>
                    </Col>
                  ))}
                  <Form.Item>
                    <Button
                      style={{ margin: 6 }}
                      type="dashed"
                      onClick={() => add()}
                      block
                    >
                      Thêm phân loại mới
                    </Button>
                  </Form.Item>
                </Row>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Lưu lại
            </Button>
          </Form.Item>
        </Form>
      )}
    </React.Fragment>
  )
}
