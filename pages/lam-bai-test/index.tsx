import { ROLE } from '@/const/app-const'
import { ProtectPage } from '@/middleware/ProtectPage'
import { Row } from 'antd'

export default function TakeTheTest() {
  return (
    <ProtectPage role={ROLE.USER}>
      <Row>that tuyet voi phai khong nao</Row>
    </ProtectPage>
  )
}
