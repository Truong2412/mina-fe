import { menuitemsList } from '@/const/app-const'
import { Row, Col } from 'antd'
import Link from 'next/link'
export default function MenuTop() {
  return (
    <Row align="middle" gutter={[8, 0]} justify="center">
      {menuitemsList.map((item, i) => (
        <Col key={`'Menu item ${i}`}>
          <Link
            style={{ textAlign: 'center', cursor: 'pointer', color: '#fff' }}
            className="highlightText"
            href={`/${item.path}`}
          >
            {item.label}
          </Link>
        </Col>
      ))}
    </Row>
  )
}
