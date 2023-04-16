import { NotFoundPage } from '@/components/notFoundPage/NotFoundPage'
import { API } from '@/const/app-const'
import { ClassProps } from '@/entities/class.entities'
import { ResponseProps } from '@/network/services/api-handler'
import { formatDate, formatTime } from '@/ultis/dataConvert'
import { Col, Divider, Input, Row, Select, Space } from 'antd'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

interface ClassDetailProps {
  classData: ClassProps
}
export default function ClassDetail({ classData }: ClassDetailProps) {
  console.log(classData)
  return (
    <React.Fragment>
      {!classData._id ? (
        <NotFoundPage />
      ) : (
        <Row style={{ padding: '1rem' }} gutter={[16, 16]}>
          <Col span={24}>BREAD CRUMB</Col>
          <Col xxl={16}>
            <Row gutter={[16, 16]}>
              <Col xxl={12}>
                <div className="imgColBox">
                  <Image
                    className="imageStyle"
                    src={`https://picsum.photos/200/300`}
                    alt={classData.classLevel}
                    fill
                  />
                </div>
              </Col>
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
                    <h3 className="textTheme">Thời gian khoá học</h3>
                  </Col>
                  <Col xxl={19}>
                    <h3 className="textBox">
                      {formatDate(classData.schedule[0])}
                      {' - '}
                      {formatDate(classData.schedule[1])}
                    </h3>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Divider className="textTheme" orientation="left">
                Thông tin thêm
              </Divider>
              <div
                style={{ width: '100%' }}
                className="roundedBox textTheme"
                dangerouslySetInnerHTML={{ __html: classData.description }}
              />
            </Row>
          </Col>

          <Col className="textTheme roundedBox" xxl={8}>
            các kiểu tương tác khuyến mại, giới thiệu về khoá học chung chung
            dành cho mọi bài viết
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}

export async function getServerSideProps(context: any) {
  const { classId } = context.params
  const result = await fetch(`${API}/class/${classId}`)
  const resultData: ResponseProps<ClassProps> = await result.json()
  const classData = resultData.data ?? ({} as ClassProps)
  return {
    props: {
      classData
    }
  }
}
