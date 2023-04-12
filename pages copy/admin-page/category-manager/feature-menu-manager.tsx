import {
  Button,
  Col,
  Divider,
  Input,
  message,
  Popconfirm,
  Popover,
  Row,
  Space
} from 'antd'
import {
  EditOutlined,
  SaveOutlined,
  DeleteOutlined,
  AlertOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'
import {
  createCategoryApi,
  deleteCategoryApi,
  getCategoryApi,
  updateCategoryApi
} from '../../../network/category-api'
import { useLoading, useUser } from '../../../hooks'
import { checkRes } from '../../../network/services/response-handler'
import { responseDefault, responseProps } from '../../../types/app-common-type'
import { ContentLoading } from '../../../components'

interface Category {
  _id: string | null
  text: string
  category: string
  rootId: string | null
  disabled: boolean
}
interface FullCategory extends Category {
  children: Category[]
}

interface handleCategoriesChangeProps {
  type: string
  rootIndex?: number
  childIndex?: number
  inputValue?: string
  _id?: string
}

interface SavePayloadProps {
  text: string
  rootId?: string | null
}
interface SaveButtonProps extends SavePayloadProps {
  disabled: boolean
  rootIndex: number
  type: 'saveRoot' | 'saveChild'
  _id: string | null
  childIndex?: number
  saveData: (data: handleCategoriesChangeProps) => void
}

const SaveButton: React.FC<SaveButtonProps> = ({
  disabled,
  rootIndex,
  rootId,
  childIndex,
  type,
  _id,
  text,
  saveData
}) => {
  const { token } = useUser()
  const { setIsLoading } = useLoading()
  const handleSaveInput = async () => {
    const payload: SavePayloadProps = {
      text: text,
      rootId: rootId
    }

    try {
      setIsLoading(true)
      let response: responseProps = responseDefault
      if (token && !_id) {
        response = await createCategoryApi({
          data: payload,
          token: token
        })
      } else if (token && _id) {
        response = await updateCategoryApi({
          data: {
            _id: _id,
            text: text
          },
          token: token
        })
      }
      checkRes(
        response,
        () => {
          if (!_id) {
            message.success(`Đã thêm mới thư mục gốc: ${text}`)
            if (type === 'saveChild') {
              saveData({
                type: 'updateChildId',
                rootIndex,
                childIndex,
                _id: response.data
              })
            } else {
              saveData({
                type: 'updateRootId',
                rootIndex,
                _id: response.data
              })
            }
          } else {
            message.success('Đã cập nhật!')
          }
        },
        () => message.error('Đã có lỗi xảy ra'),
        () => setIsLoading(false)
      )
    } catch (error) {
      message.error('Đã có lỗi xảy ra!')
    }
  }

  return (
    <Popover title={null} content="Lưu">
      <Button disabled={disabled} onClick={handleSaveInput} type="primary">
        <SaveOutlined />
      </Button>
    </Popover>
  )
}
interface DeleteButtonProps {
  type: 'deleteRoot' | 'deleteChild'
  _id: string | null
  rootIndex: number
  childIndex?: number
  saveData: (data: handleCategoriesChangeProps) => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  type,
  _id,
  rootIndex,
  childIndex,
  saveData
}) => {
  const { token } = useUser()
  const { setIsLoading } = useLoading()
  const handleDelete = async () => {
    try {
      if (!_id) {
        if (type == 'deleteChild') {
          saveData({ type, rootIndex, childIndex })
        } else if (type == 'deleteRoot') {
          saveData({ type, rootIndex })
        }
      } else {
        if (token && _id) {
          setIsLoading(true)
          const response = await deleteCategoryApi(token, _id)
          checkRes(
            response,
            () => {
              if (type == 'deleteChild') {
                saveData({ type, rootIndex, childIndex })
              } else if (type == 'deleteRoot') {
                saveData({ type, rootIndex })
              }
            },
            () => message.error('Xóa không thành công'),
            () => setIsLoading(false)
          )
        }
      }
    } catch (error) {
      message.error('Đã có lỗi xảy ra!')
    }
  }
  return (
    <Popover title={null} content="Xóa">
      <Popconfirm
        icon={<AlertOutlined style={{ color: 'red' }} />}
        title="Bạn muốn xóa danh mục gốc này ?"
        okText="Xóa"
        cancelText="Quay lại"
        onConfirm={handleDelete}
      >
        <Button type="primary" danger>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </Popover>
  )
}

export const MenuManager = () => {
  const { token } = useUser()
  const [tabLoading, setTabLoading] = useState(true)
  const [categories, setCategories] = useState<FullCategory[]>([])
  // console.log(categories)
  useEffect(() => {
    const fetchCategories = async (token: string) => {
      setTabLoading(true)
      const categories: responseProps = await getCategoryApi(token)
      checkRes(
        categories,
        () => {
          setCategories(categories.data.dataTable)
        },
        () => 1,
        () => setTabLoading(false)
      )
    }
    if (token) {
      fetchCategories(token)
    }
  }, [token])
  //handle categories change
  const handleCategoriesChange = useCallback(
    ({
      type,
      rootIndex,
      childIndex,
      inputValue,
      _id
    }: handleCategoriesChangeProps) => {
      // console.log(type)

      const cloneCategories = [...categories]

      switch (type) {
        case 'enableRootInput':
          if (rootIndex) cloneCategories[rootIndex].disabled = false
          break
        case 'enableChildInput':
          if (childIndex && rootIndex)
            cloneCategories[rootIndex].children[childIndex].disabled = false
          break
        case 'rootInputValueChange':
          if (rootIndex !== undefined && inputValue !== undefined) {
            cloneCategories[rootIndex].text = inputValue
          }
          break
        case 'childInputValueChange':
          if (
            rootIndex !== undefined &&
            childIndex !== undefined &&
            inputValue !== undefined
          ) {
            cloneCategories[rootIndex].children[childIndex].text = inputValue
          }
          break
        case 'addRootField':
          cloneCategories.push({
            rootId: null,
            _id: null,
            text: '',
            disabled: false,
            category: '',
            children: []
          })
          break
        case 'addChildField':
          if (typeof rootIndex === 'number' && rootIndex >= 0)
            cloneCategories[rootIndex].children.push({
              rootId: null,
              _id: null,
              text: '',
              disabled: false,
              category: ''
            })
          // console.log(cloneCategories)
          break
        case 'updateRootId':
          if (rootIndex !== undefined && _id) {
            const cloneCategory = cloneCategories[rootIndex]
            cloneCategory._id = _id
            cloneCategory.disabled = true
            cloneCategories[rootIndex] = cloneCategory
          }
          break
        case 'updateChildId':
          if (_id && rootIndex !== undefined && childIndex !== undefined) {
            const cloneCategory = cloneCategories[rootIndex]
            cloneCategory.children[childIndex]._id = _id
            cloneCategory.children[childIndex].disabled = true
          }
          break
        case 'deleteRoot':
          if (rootIndex !== undefined) {
            cloneCategories.splice(rootIndex, 1)
          }
          break
        case 'deleteChild':
          // console.log('noo')
          if (rootIndex !== undefined && childIndex !== undefined) {
            cloneCategories[rootIndex].children.splice(childIndex, 1)
          }
          break
        default:
          break
      }
      setCategories(cloneCategories)
    },
    [categories]
  )

  return (
    <Row
      justify="center"
      className="containerBoxShadow hideScrollBar"
      style={{ padding: '1rem', height: '70vh' }}
    >
      <Col
        xxl={12}
        xl={14}
        lg={16}
        md={24}
        className="containerBoxShadow hideScrollBar"
        style={{ background: 'white', padding: '1rem' }}
      >
        {tabLoading ? (
          <ContentLoading />
        ) : (
          <Row justify="center">
            <Divider>Danh mục sản phẩm</Divider>
            <Button
              block
              onClick={() => handleCategoriesChange({ type: 'addRootField' })}
              type="primary"
              style={{ marginBottom: 10 }}
            >
              <PlusOutlined /> Danh mục gốc
            </Button>
            {categories.map((item, index) => (
              <Row key={`root category-${index}`} style={{ marginTop: 8 }}>
                <Space key={`rootCate-${index}`} direction="vertical">
                  <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={18} lg={16}>
                      <Input
                        disabled={item.disabled}
                        addonBefore="Danh mục chính"
                        value={item.text}
                        defaultValue="mysite"
                        onChange={(e) =>
                          handleCategoriesChange({
                            type: 'rootInputValueChange',
                            rootIndex: index,
                            inputValue: e.target.value
                          })
                        }
                        addonAfter={
                          <EditOutlined
                            onClick={() =>
                              handleCategoriesChange({
                                type: 'enableRootInput',
                                rootIndex: index
                              })
                            }
                          />
                        }
                      />
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={8}>
                      <Row justify="end">
                        <Space>
                          <SaveButton
                            disabled={item.disabled}
                            rootId={null}
                            rootIndex={index}
                            type="saveRoot"
                            _id={item._id}
                            text={item.text}
                            saveData={handleCategoriesChange}
                          />
                          <DeleteButton
                            type="deleteRoot"
                            _id={item._id}
                            rootIndex={index}
                            saveData={handleCategoriesChange}
                          />
                        </Space>
                      </Row>
                    </Col>
                  </Row>

                  {item.children.map((childItem, childIndex) => {
                    return (
                      <Row
                        key={`childCate-${index}-${childIndex}`}
                        gutter={[8, 8]}
                        justify="end"
                      >
                        <Col xs={20} sm={20} md={12}>
                          <Input
                            disabled={childItem.disabled}
                            addonBefore=">>>"
                            value={childItem.text}
                            defaultValue="mysite"
                            onChange={(e) =>
                              handleCategoriesChange({
                                type: 'childInputValueChange',
                                rootIndex: index,
                                childIndex: childIndex,
                                inputValue: e.target.value
                              })
                            }
                            addonAfter={
                              <EditOutlined
                                onClick={() =>
                                  handleCategoriesChange({
                                    type: 'enableChildInput',
                                    rootIndex: index,
                                    childIndex: childIndex
                                  })
                                }
                              />
                            }
                          />
                        </Col>
                        <Col xs={24} sm={24} xl={8} lg={8} md={6}>
                          <Row justify="end">
                            <Space>
                              <SaveButton
                                disabled={childItem.disabled}
                                rootId={item._id}
                                rootIndex={index}
                                childIndex={childIndex}
                                type="saveChild"
                                _id={childItem._id}
                                text={childItem.text}
                                saveData={handleCategoriesChange}
                              />
                              <DeleteButton
                                type="deleteChild"
                                _id={childItem._id}
                                childIndex={childIndex}
                                rootIndex={index}
                                saveData={handleCategoriesChange}
                              />
                            </Space>
                          </Row>
                        </Col>
                      </Row>
                    )
                  })}
                  <Row justify="end">
                    <Col>
                      <Button
                        disabled={!item._id ? true : false}
                        onClick={() =>
                          handleCategoriesChange({
                            type: 'addChildField',
                            rootIndex: index
                          })
                        }
                        type="default"
                        block
                      >
                        <PlusOutlined /> Danh mục con
                      </Button>
                    </Col>
                  </Row>
                </Space>
              </Row>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  )
}
