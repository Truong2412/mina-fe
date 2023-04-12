import React from 'react'
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined
} from '@ant-design/icons'
import { Card } from 'antd'
const { Meta } = Card

// interface Props {}

export const ProductCard: React.FC = () => {
  return (
    <Card
      className="card"
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />]}
    >
      <Meta title="Card title" description="This is the description" />
    </Card>
  )
}
