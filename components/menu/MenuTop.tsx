import { menuitemsList } from '@/const/app-const'
import { Row, Col } from 'antd'
import { useRouter } from 'next/router'
export default function MenuTop() {
  const router = useRouter()
  function navigate(path: string) {
    return router.push(path)
  }
  return (
    <Row align="middle" gutter={[8, 0]} justify="center">
      {menuitemsList.map((item, i) => (
        <Col key={`'Menu item ${i}`}>
          <h4
            onClick={() => navigate(`/${item.path}`)}
            style={{ textAlign: 'center', cursor: 'pointer' }}
            className="highlightText"
          >
            {item.label}
          </h4>
        </Col>
      ))}
    </Row>
  )
}
