import { Row, Col } from 'antd'
export const HomePage = () => {
  return (
    <div style={{ width: '100%' }}>
      <Row>
        <Col xs={{ span: 24 }} xl={16}></Col>
        <Col xs={{ span: 24 }} xl={8}></Col>
      </Row>
      <Row>
        <Col xs={{ span: 12 }}></Col>
        <Col xs={{ span: 12 }}></Col>
      </Row>
    </div>
  )
}
