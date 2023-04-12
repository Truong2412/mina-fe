import React from 'react'
import { Row, Col, Avatar, Badge } from 'antd'
import { ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons'
import './style.css'

export const AppHeader: React.FC = () => {
  return (
    <Row>
      <Col md={{ span: 12 }}></Col>
      <Col md={{ span: 12 }}>
        <Row justify="end">
          <Avatar />
          <span> Username</span>
          <Col>
            <Badge count={5}>
              <ShoppingCartOutlined className="icon" />
            </Badge>
          </Col>
          <Col push={1}>
            <SettingOutlined
              // onClick={() => handleOpenDrawer()}
              className="icon"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
