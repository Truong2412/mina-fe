import { CLASS_STATUS } from '@/const/app-const'
import { ClassProps } from '@/entities/class.entities'
import { Button, Col, Divider, Row, Select, Space } from 'antd'
import React, { useState } from 'react'

export function ClassInfo(detail: ClassProps): JSX.Element {
  console.log(detail)
  const [saveAble, setSaveAble] = useState(false)
  return (
    <React.Fragment>
      <Divider className="textTheme">Thông tin lớp học</Divider>
      <Row>
        {!detail._id ? (
          <p
            className="textTheme"
            style={{ textAlign: 'center', width: '100%' }}
          >
            Click vào lớp để xem thông tin chi tiết
          </p>
        ) : (
          <Col span={24}>
            <Space align="center" direction="horizontal">
              <Button type="primary">Lưu thay đổi</Button>

              {detail.status === CLASS_STATUS.OPEN && (
                <Button type="dashed" danger>
                  Xoá
                </Button>
              )}
            </Space>
            <ul>
              <li className="textTheme">Level: {detail.classLevel ?? ''}</li>
              <li className="textTheme">Người tạo: {detail.creatorId ?? ''}</li>
              <li className="textTheme">
                Ngày tạo:{' '}
                {new Date(detail.createdAt).toLocaleDateString() ?? ''}
              </li>
              <li className="textTheme">
                <h3>Số học viên: {detail.numberOfStudents ?? ''}</h3>
              </li>
              <li className="textTheme">
                Giáo viên:{' '}
                <Select
                  placeholder="Giáo viên"
                  id="teacherId"
                  options={[]}
                  style={{ width: '100%' }}
                  defaultValue={detail.teacher}
                />
              </li>
            </ul>
          </Col>
        )}
      </Row>
    </React.Fragment>
  )
}
