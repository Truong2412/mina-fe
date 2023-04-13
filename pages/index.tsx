import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Col, Divider, Row, Typography } from 'antd'
import { useTheme } from '@/hooks'
import { textWhite } from '@/const/app-const'
import { ClassCard } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Trung tâm tiếng nhật Mina</title>
        <meta name="description" content="Trung tâm tiếng nhật Mina - Hà Nội" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./asset/minamg.png" />
      </Head>
      <main>
        {/* banner and effect, regis form */}
        <div style={{ width: '100%', position: 'relative' }}>
          <img
            src="/banner.jpeg"
            alt="mina - tieng nhat cho moi nguoi"
            style={{ width: '100%' }}
          />
        </div>

        <Row>
          <Divider>
            <h3> Lớp học đang tuyển sinh</h3>
          </Divider>
          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              <Col xl={5}>
                <ClassCard />
              </Col>
              <Col xl={5}>
                <ClassCard />
              </Col>
              <Col xl={5}>
                <ClassCard />
              </Col>
              <Col xl={5}>
                <ClassCard />
              </Col>
            </Row>
          </Col>
        </Row>
        <h3
          className="highLightText"
          style={{ textAlign: 'center', cursor: 'pointer' }}
        >
          Xem thêm {'> >'}
        </h3>
        {/* news and envents and  Studiy Space */}
        <Row>
          <Divider>
            <h3>Tin tức và sự kiện</h3>
          </Divider>
          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              <Col xl={5}>
                <ClassCard />
              </Col>
              <Col xl={5}>
                <ClassCard />
              </Col>
              <Col xl={5}>
                <ClassCard />
              </Col>
              <Col xl={5}>
                <ClassCard />
              </Col>
            </Row>
          </Col>
        </Row>
        <h3
          className="highLightText"
          style={{ textAlign: 'center', cursor: 'pointer' }}
        >
          Xem thêm {'> >'}
        </h3>
        <Row>
          <Divider>
            <h3> Góc học tập</h3>
          </Divider>
          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              <Col xl={5}>
                <ClassCard />
              </Col>
              <Col xl={5}>
                <ClassCard />
              </Col>
              <Col xl={5}>
                <ClassCard />
              </Col>
              <Col xl={5}>
                <ClassCard />
              </Col>
            </Row>
          </Col>
        </Row>
        <h3
          className="highLightText"
          style={{ textAlign: 'center', cursor: 'pointer' }}
        >
          Xem thêm {'> >'}
        </h3>
      </main>
    </>
  )
}
