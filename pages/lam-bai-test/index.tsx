import { ROLE } from '@/const/app-const'
import { ProtectPage } from '@/middleware/ProtectPage'
import { Row } from 'antd'

export default function TakeTheTest() {
  return (
    <ProtectPage role={ROLE.USER}>
      <Row className="textTheme">COMMING SOON</Row>
    </ProtectPage>
  )
}
