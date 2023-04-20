import { NewsAndEventCard } from '@/components/card/NewsAndEventCard'
import React from 'react'
import { HomeOutlined, SearchOutlined } from '@ant-design/icons'
import { Breadcrumb, Col, Row, Input } from 'antd'

export default function ListNewsAndEvents() {
  return (
    <div style={{ margin: 0, padding: '10px 20px' }}>
      <Row justify="space-between">
        <Col>
          <Breadcrumb
            items={[
              {
                href: '',
                title: <HomeOutlined style={{ color: 'black' }} />
              },
              {
                href: '',
                title: (
                  <span style={{ color: 'black' }}>Tin tức và sự kiện</span>
                )
              }
            ]}
            style={{ margin: '0 0 20px 0' }}
          />
        </Col>
        <Col>
          <Input
            placeholder="Tìm kiếm"
            suffix={<SearchOutlined style={{ color: '#1677ff' }} />}
            allowClear
            size="small"
            style={{ border: '1px solid #1677ff' }}
          />
        </Col>
      </Row>
      <Row gutter={[60, 0]} justify='center' style={{marginBottom:'40px'}}>
        <Col>
        <NewsAndEventCard type='student' createdAt='ngay tao' />
        </Col>
        <Col>
        <NewsAndEventCard type='student' createdAt='ngay tao' />
        </Col>
        <Col>
        <NewsAndEventCard type='student' createdAt='ngay tao' />
        </Col>
        <Col>
        <NewsAndEventCard type='student' createdAt='ngay tao' />
        </Col>
      </Row>
      <Row gutter={[60, 0]} justify='center' style={{marginBottom:'40px'}}>
        <Col>
        <NewsAndEventCard type='student' createdAt='ngay tao' />
        </Col>
        <Col>
        <NewsAndEventCard type='student' createdAt='ngay tao' />
        </Col>
        <Col>
        <NewsAndEventCard type='student' createdAt='ngay tao' />
        </Col>
        <Col>
        <NewsAndEventCard type='student' createdAt='ngay tao' />
        </Col>
      </Row>
    </div>
  )
}
