import React from 'react'
import { Card } from 'antd'
import Image from 'next/image'

const { Meta } = Card

interface newsAndEventCardProps {
  type: 'admin' | 'student'
  _id?: string
  status?: number
  createdAt: string
  cardImg?: string
}


export function NewsAndEventCard ({
  type,
  status,
  cardImg,
  createdAt
}: newsAndEventCardProps): JSX.Element {
  const imageUrl = cardImg ?? 'https://picsum.photos/260/260'
  let title: string = 'Đây là tiêu đề'
  let scheduleText: string = `Mô tả nè (${createdAt})`

  return (
    <Card
      className="hoverEffect"
      style={{ width: 260 }}
      cover={
        <Image
          alt="example"
          src={imageUrl}
          width={260}
          height={260}
        />
      }
      bodyStyle={{ padding: 0, margin: 0 }}
    >
      <Meta
        title={title}
        description={scheduleText}
        style={{margin:0, padding:0}}
      />
    </Card>
  )
}
