import React from 'react'
import { Card } from 'antd'
import Image from 'next/image'
import { PostProps } from '@/entities/post.entities'
import { formatDate } from '@/ultis/dataConvert'

export function NewsAndEventCard({
  type,
  title,
  status,
  author,
  cardImg,
  createdAt
}: PostProps): JSX.Element {
  const imageUrl = cardImg ?? 'https://picsum.photos/260/260'
  const date = `Ngày đăng: ${formatDate(createdAt ?? '')}`

  return (
    <Card
      className="hoverEffect"
      cover={
        <div
          className="relative imgBg"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      }
      bodyStyle={{ padding: 0, margin: 0 }}
    >
      <div className="cardTitle">{title}</div>
      <div className="cardDescription">{date}</div>
    </Card>
  )
}
