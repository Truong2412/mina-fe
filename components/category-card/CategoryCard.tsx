import { Card } from 'antd'
import React from 'react'
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
const { Meta } = Card

export const CategoryCard: React.FC = () => {
  return (
    <Card
      className="card"
      style={{ width: 300 }}
      actions={[<EyeOutlined key="setting" />, <EditOutlined key="edit" />]}
    >
      <Meta title="Card title" description="This is the description" />
    </Card>
  )
}
