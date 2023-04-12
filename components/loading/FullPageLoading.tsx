import { Row, Spin } from 'antd'
import React from 'react'

export const FullPageLoading: React.FC = () => {
  return (
    <Row
      align="middle"
      justify="center"
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        // background: 'lightblue',
        zIndex: 9999,
        opacity: 1
      }}
    >
      <Spin size="large" />
    </Row>
  )
}
