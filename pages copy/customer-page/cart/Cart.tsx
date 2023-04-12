import { Button, Col, Divider, Row, Space } from 'antd'
import React from 'react'
import { ProductCartCard } from '../../../components/product-cart-card.tsx/ProductCartCard'

interface Props {}

export const Cart: React.FC<Props> = () => {
  return (
    <Row style={{ padding: '1rem' }}>
      <Col span={12}>
        <Col span={24}>
          <Divider>Giỏ hàng</Divider>
        </Col>
        <Col span={24}>
          <Row justify="end">
            <Space>
              <Button type="primary">Chọn tất cả</Button>
              <Button type="default">Bỏ chọn</Button>
            </Space>
          </Row>
        </Col>

        <Col
          lg={{ span: 24 }}
          xs={24}
          md={18}
          style={{ height: '80vh', overflowY: 'auto', padding: 4 }}
        >
          <Space wrap>
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />{' '}
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />{' '}
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />{' '}
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />{' '}
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />{' '}
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />{' '}
            <ProductCartCard
              _id="s"
              image="https://picsum.photos/200"
              name="San pham that la tuyet voi"
              quantity={9}
            />
          </Space>
        </Col>
      </Col>

      <Col span={12}></Col>
    </Row>
  )
}
