import { NotFoundPage } from '@/components/notFoundPage/NotFoundPage'
import { API } from '@/const/app-const'
import { REGEX } from '@/const/regexp'
import { ClassProps } from '@/entities/class.entities'
import { useLoading, useUser } from '@/hooks'
import { ResponseProps, checkRes } from '@/network/services/api-handler'
import { formatDate, formatTime } from '@/ultis/dataConvert'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  message
} from 'antd'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { CreateRegisClassApi } from '../api/regis-clas.api'

interface ClassDetailProps {
  classData: ClassProps
}
const learnToOption = [
  {
    label: 'Nâng cao kiến thức',
    value:'Nâng cao kiến thức'
  },
  {
    label: 'Phục vụ công việc',
    value: 'Phục vụ công việc'
  },
  {
    label: 'Khác',
    value:'Khác'
  },
]
export default function ClassDetail({ classData }: ClassDetailProps) {
  const [openModal, setOpenModal] = useState(false)
  const {setIsLoading} = useLoading()
  const {user} = useUser()
  const initValues = {
    email: user.email ?? undefined,
    everStudied: false,
  }

  async function RegisCLass(values: any) {
    setIsLoading(true)
    const  result = await CreateRegisClassApi({...values, userId: user._id ?? '', classId: classData._id})
    checkRes(result,
      ()=>{
        if(result.data !== null){
          message.success('Đã tạo đơn đăng ký thành công!')
          setOpenModal(false)
        }else{
          message.error('Đã có lỗi xảy ra!')
        }
      },
      ()=>{ message.error('Đã có lỗi xảy ra!')},
      ()=> setIsLoading(false))
  }

  return (
    <React.Fragment>
      {!classData._id ? (
        <NotFoundPage />
      ) : (
        <Row style={{ padding: '1rem' }} gutter={[16, 16]}>
          <Col span={24}>BREAD CRUMB</Col>
          <Col xxl={16}>
            <Row gutter={[16, 0]}>
              <Col xxl={6}></Col>
              <Col className="roundedBox" xxl={12}>
                <Row align="middle">
                  <Col xxl={4}>
                    <h3 className="textTheme"> Cấp độ</h3>
                  </Col>
                  <Col xxl={19}>
                    <h3 className="textBox">{classData.classLevel}</h3>
                  </Col>
                </Row>

                <Row align="middle">
                  <Col xxl={4}>
                    <h3 className="textTheme">Ngày học</h3>
                  </Col>
                  <Col xxl={19}>
                    <h3 className="textBox">
                      {formatTime(classData.time[0])}
                      {' - '}
                      {formatTime(classData.time[1])}{' '}
                      {classData.daysOfWeek.toString()}
                    </h3>
                  </Col>
                </Row>

                <Row align="middle">
                  <Col xxl={4}>
                    <h3 className="textTheme">Ngày dự kiến khai giảng</h3>
                  </Col>
                  <Col xxl={19}>
                    <h3 className="textBox">
                      {formatDate(classData.startDate)}
                    </h3>
                  </Col>
                </Row>
                <Button onClick={() => setOpenModal(true)} block type="primary">
                  Đăng ký
                </Button>
              </Col>
            </Row>
            <Row>
              <Divider className="textTheme" orientation="left">
                Thông tin thêm
              </Divider>
              <div
                style={{ width: '100%' }}
                className="roundedBox textTheme richTextBox"
                dangerouslySetInnerHTML={{ __html: classData.description }}
              />
            </Row>
          </Col>

          <Col className="textTheme roundedBox" xxl={8}>
            <h4>
              Chào mừng các bạn đến với khoá học tại nhật ngữ Mina! Chúng tôi tự
              hào là một trong những trung tâm dạy ngoại ngữ hàng đầu tại địa
              phương, và chúng tôi cam kết cung cấp cho các bạn một trải nghiệm
              học tập tiếng Nhật đầy thú vị và hiệu quả.
            </h4>
            <p>
              Tại trung tâm chúng tôi, các bạn sẽ được học từ những giáo viên có
              trình độ chuyên môn cao, giàu kinh nghiệm và nhiệt tình. Chúng tôi
              sử dụng các phương pháp giảng dạy hiện đại, kết hợp giữa lý thuyết
              và thực hành, giúp các bạn phát triển kỹ năng ngôn ngữ một cách
              toàn diện.
            </p>
            <p>
              Khi đăng ký khoá học tại trung tâm chúng tôi, các bạn sẽ được
              hưởng một số quyền lợi đặc biệt, bao gồm:
            </p>
            <ul>
              <li>Học phí hợp lý và đảm bảo chất lượng giáo dục</li>
              <li>Hỗ trợ tư vấn học tập </li>
              <li>
                Học viên có thể tự tin về kiến thức của mình sau khi hoàn thành
                khoá học
              </li>
              <li>
                Các hoạt động ngoại khóa và buổi giao lưu để giúp các bạn rèn
                luyện kỹ năng giao tiếp tiếng Nhật một cách tự tin và hiệu quả.
              </li>
            </ul>
            <p>
              Chúng tôi hy vọng rằng sau khi học tại trung tâm của chúng tôi,
              các bạn sẽ có thể sử dụng tiếng Nhật một cách thông thạo và tự tin
              trong các tình huống học tập, làm việc và giao tiếp hàng ngày.
              Chúng tôi mong đợi được đón tiếp các bạn học viên {'<3 !'}
            </p>
          </Col>
        </Row>
      )}
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        title="Đăng ký lớp học"
      >
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={RegisCLass}
          autoComplete="off"
          initialValues={initValues}
        >
          <Form.Item
            label="Họ & tên"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng điền đầy đủ thông tin!' }
            ]}
          >
            <Input placeholder='Họ & tên' />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng điền đầy đủ thông tin!' },
              {
                validator: ((rule,value)=>{
                  if(REGEX.PHONE.test(value)){
                    return Promise.resolve()
                  }else{
                    return Promise.reject('Số điện thoại không hợp lệ!')
                  }
                })
              }
            ]}
          >
            <Input placeholder='Số điện thoại' />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              { required: true, message: 'Vui lòng điền đầy đủ thông tin!' },
            ]}
          >
            <Input placeholder='Địa chỉ' />
          </Form.Item>

          <Form.Item
            label="Facebook link"
            name="facebookLink"
            rules={[
              { required: true, message: 'Vui lòng điền đầy đủ thông tin!' },
            ]}
          >
            <Input placeholder='Facebook link' />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng điền đầy đủ thông tin!' },
              {
                type: 'email', message: 'Email không hợp lệ!'
              }
            ]}
          >
            <Input placeholder='Số điện thoại' />
          </Form.Item>

          <Form.Item
            label="Bạn biết đến Mina từ đâu"
            name="knowFrom"
            rules={[
              { required: true, message: 'Vui lòng điền đầy đủ thông tin!' }
            ]}
          >
            <Input placeholder='Bạn biết đến Mina từ đâu' />
          </Form.Item>

          <Form.Item
            label="Bạn đã từng học tiếng nhật chưa ?"
            name="everStudied"
          >
            <Radio.Group>
            <Radio value={true}>Đã từng học </Radio>
            <Radio value={false}>Chưa</Radio>
          </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Mục đích học tập"
            name="leanTo"
            rules={[
              { required: true, message: 'Vui lòng điền đầy đủ thông tin!' }
            ]}
          >
            <Select placeholder="Mục đích học tập" options={learnToOption} />
        
          </Form.Item>

          <Form.Item
            label="Ghi chú"
            name="note"
            rules={[
              { required: false }
            ]}
          >
            <Input.TextArea placeholder='Ghi chú' />
        
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const { classId } = context.params
    const result = await fetch(`${API}/class/${classId}`)
    const resultData: ResponseProps<ClassProps> = await result.json()
    const classData = resultData.data ?? ({} as ClassProps)
    return {
      props: {
        classData
      }
    }
  } catch (error) {
    return {
      props: {
        classData: {}
      }
    }
  }
}
