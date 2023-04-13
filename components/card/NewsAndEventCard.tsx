import React from 'react'
import { SettingOutlined, EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
const { Meta } = Card

// interface Props {}

export const NewsAndEventCard: React.FC = () => {
  return (
    <Card
      className="card hoverEffect"
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
