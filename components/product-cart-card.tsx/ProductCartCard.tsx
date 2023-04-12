import { Button, Checkbox, Col, InputNumber, Popconfirm, Row } from 'antd'
import React from 'react'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'

interface Props {
  _id: string
  name: string
  quantity: number
  image: string
}

export const ProductCartCard: React.FC<Props> = ({
  _id,
  name,
  quantity,
  image
}) => {
  return (
    <Row className="card" align="middle">
      <Col span={2}>
        <Checkbox />
      </Col>
      <Col span={22}>
        <Row gutter={4}>
          <Col span={5} style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
            <img src={image} alt="Ảnh sản phẩm" style={{ width: '100%' }} />
          </Col>
          <Col span={14}>
            <Row gutter={[6, 6]} align="middle" style={{ padding: 2 }}>
              <Col
                span={24}
                style={{
                  fontWeight: 'bolder',
                  marginBottom: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {name}
              </Col>
              <Col>Số lượng :</Col>
              <Col>
                <InputNumber defaultValue={1} min={1} />
              </Col>
            </Row>
          </Col>
          <Col span={4} style={{ alignSelf: 'center' }}>
            <Popconfirm
              placement="topLeft"
              title={'Bạn có chắc muốn xóa ?'}
              description={null}
              // onConfirm={() => {}}
              okText="Xóa"
              cancelText="Không"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button type="primary" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
