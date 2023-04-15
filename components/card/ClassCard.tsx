import React from 'react'
import { SettingOutlined, EditOutlined } from '@ant-design/icons'
import { Badge, Card, Row } from 'antd'
import Image from 'next/image'
import { CLASS_STATUS } from '@/const/app-const'
const { Meta } = Card

interface ClassCardProps {
  type: 'admin' | 'student'
  _id?: string
  status?: number
  time?: string[]
  schedule?: string[]
  recruiting?: Boolean
  daysOfWeek: string[]
  numberOfStudents?: number
  numberOfRecruits?: number
  createdAt?: string
  classLevel?: string
  cardImg?: string
}

export function ClassCard({
  type,
  schedule,
  status,
  time,
  daysOfWeek,
  recruiting,
  numberOfStudents,
  cardImg,
  classLevel,
  createdAt
}: ClassCardProps): JSX.Element {
  const imageUrl = cardImg ?? 'https://picsum.photos/200/300'
  // console.log(imageUrl)
  let title: string = ''
  if (classLevel !== undefined) {
    title += `Cấp độ: ${classLevel}`
  }
  if (type === 'admin' && numberOfStudents !== undefined) {
    title += ` - ${numberOfStudents} học viên`
  }

  let scheduleText: string = ''
  if (time !== undefined) {
    console.log(time)
    const startTime =
      new Date(time[0]).getHours().toString().padStart(2, '0') +
      ':' +
      new Date(time[0]).getMinutes().toString().padStart(2, '0')
    const endTime =
      new Date(time[1]).getHours().toString().padStart(2, '0') +
      ':' +
      new Date(time[1]).getMinutes().toString().padStart(2, '0')
    scheduleText += `${startTime} - ${endTime}`
  }

  let days: string = ''
  if (daysOfWeek !== undefined) {
    // console.log(schedule)
    // const startDate
  }

  return (
    <Badge.Ribbon
      color={
        status === CLASS_STATUS.OPEN
          ? '#c72e2e'
          : status === CLASS_STATUS.PROCESSING
          ? '#425ae3'
          : '#179b19'
      }
      text={
        status === CLASS_STATUS.OPEN
          ? 'Đang tuyển sinh'
          : status === CLASS_STATUS.PROCESSING
          ? 'Đang hoạt động'
          : 'Đã kết thúc'
      }
    >
      <Card
        className="card hoverEffect"
        style={{ width: '100%' }}
        cover={
          <div
            className="relative imgBg"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        }
      >
        <Meta title={title} description={scheduleText} />
        {daysOfWeek !== undefined && (
          <Meta description={daysOfWeek.toString()} />
        )}
      </Card>
    </Badge.Ribbon>
  )
}
