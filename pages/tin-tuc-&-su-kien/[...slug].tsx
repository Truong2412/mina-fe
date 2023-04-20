import { NotFoundPage } from '@/components/notFoundPage/NotFoundPage'
import { API } from '@/const/app-const'
import { REGEX } from '@/const/regexp'
import { ClassProps } from '@/entities/class.entities'
import { useLoading, useUser } from '@/hooks'
import { ResponseProps, checkRes } from '@/network/services/api-handler'
import { formatDate, formatTime } from '@/ultis/dataConvert'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  message
} from 'antd'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { CreateRegisClassApi } from '../api/regis-clas.api'
import { GetPostByIdApi } from '../api/post.api'
import { PostProps } from '@/entities/post.entities'

interface PostDetailProps {
  data: PostProps
}

export default function ClassDetail({ data }: PostDetailProps) {
  return (
    <Row className="roundedBox textTheme">
      <Col xxl={16}>
        <Row>
          <h3>{data.title}</h3>
          <div
            style={{ width: '100%' }}
            className="roundedBox textTheme richTextBox"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </Row>
      </Col>
      <Col xxl={8}>Các bài liên quan</Col>
    </Row>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const id = context.params.slug[0].split('&pid')[1] as string

    const result = await GetPostByIdApi(id ?? '')
    if (result.data !== null) {
      return {
        props: {
          data: result.data
        }
      }
    } else {
      return {
        props: {
          data: {}
        }
      }
    }
    // const { classId } = context.params
    // const result = await fetch(`${API}/class/${classId}`)
    // const resultData: ResponseProps<ClassProps> = await result.json()
    // const classData = resultData.data ?? ({} as ClassProps)
  } catch (error) {
    return {
      props: {
        data: {}
      }
    }
  }
}
