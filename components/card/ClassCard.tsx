import React from 'react'
import { SettingOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Row } from 'antd'
import Image from 'next/image'
const { Meta } = Card

// interface Props {}

export const ClassCard: React.FC = () => {
  return (
    <Card
      className="card hoverEffect"
      style={{ width: '100%' }}
      cover={
        <div
          className="relative imgBg"
          style={{ backgroundImage: `url("https://picsum.photos/200/300")` }}
        ></div>
      }
      actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />]}
    >
      <Meta title="Card title" description="This is the description" />
    </Card>
  )
}
