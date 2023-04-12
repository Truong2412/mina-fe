import { Button, Col, Divider, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { AddAndEditProduct } from './feature-add-edit-info'
import { ProductManagerFilter } from './feature-product-filter'
// interface Props {}
interface ModalProps {
  open: boolean
  type: 'add' | 'edit'
  data: any
}
export const ProductManager: React.FC = () => {
  const [modal, setModal] = useState<ModalProps>({
    open: false,
    type: 'add',
    data: null
  })

  return (
    <Row className="containerBoxShadow" style={{ padding: '1rem' }}>
      <Col span={18}>
        <ProductManagerFilter />
      </Col>
      <Col span={4}>
        <Button
          onClick={() => setModal({ ...modal, open: true, type: 'add' })}
          type="primary"
        >
          Thêm sản phẩm mới
        </Button>
      </Col>
      <Modal
        // style={{ width: '90vh' }}
        open={modal.open}
        onCancel={() => setModal({ ...modal, open: false })}
        footer={null}
        title={
          <Divider>
            {modal.type === 'add'
              ? 'Tạo mới sản phẩm'
              : modal.type === 'edit'
              ? 'Chỉnh sửa sản phẩm'
              : null}
          </Divider>
        }
      >
        <AddAndEditProduct type={modal.type} data={modal.data} />
      </Modal>
    </Row>
  )
}
