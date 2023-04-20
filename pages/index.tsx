import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Col, Divider, Row } from 'antd'

import { API, POST_TYPE } from '@/const/app-const'
import { ClassCard } from '@/components'
import { ClassProps } from '@/entities/class.entities'
import { ResponseProps, checkRes } from '@/network/services/api-handler'
import { PagingResponseProps } from '@/network/services/api-handler'
import Link from 'next/link'
import { PATH } from '@/const/app-const'
import { useEffect, useState } from 'react'
import { SearchClassApi } from './api/class.api'
import { useLoading } from '@/hooks'
import { SearchPostApi } from './api/post.api'
import { PostProps } from '@/entities/post.entities'

const inter = Inter({ subsets: ['latin'] })
interface HomeProps {
  classes: ClassProps[]
  news: PostProps[]
  study: PostProps[]
}
function Home({ classes, news, study }: HomeProps) {
  console.log(news, 'n')
  console.log(study, 'st')
  return (
    <>
      <Head>
        <title>Trung tâm tiếng nhật Mina</title>
        <meta name="description" content="Trung tâm tiếng nhật Mina - Hà Nội" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../public/favicon.svg" />
      </Head>
      <main>
        {/* banner and effect, regis form */}
        <div style={{ width: '100%', position: 'relative' }}>
          {/* con me no cai anh ma` no loi~ hoai` ` */}
          <img
            src="/banner.jpeg"
            alt="mina - tieng nhat cho moi nguoi"
            style={{ width: '100%' }}
          />
        </div>

        {/* news and envents and  Studiy Space */}
        <Row style={{ marginTop: '1rem' }}>
          <div className="titleSection textTheme">Tin tức và sự kiện</div>

          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              {/* <Col xl={5}>
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
              </Col> */}
            </Row>
          </Col>
        </Row>
        <h3
          className="highLightText"
          style={{ textAlign: 'center', cursor: 'pointer' }}
        >
          Xem thêm {'> >'}
        </h3>

        <Row style={{ marginTop: '1rem' }}>
          <div className="titleSection textTheme">Lớp học đang tuyển sinh</div>

          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              {classes &&
                classes.map((item, i) => (
                  <Col xxl={5} key={`class mina ${i}`}>
                    <Link href={`/${PATH.CLASS}/${item._id}`}>
                      <ClassCard
                        type="student"
                        daysOfWeek={item.daysOfWeek}
                        createdAt={item.createdAt}
                        classLevel={item.classLevel}
                        numberOfStudents={item.numberOfStudents}
                        numberOfLessons={item.numberOfLessons}
                        recruiting={item.recruiting}
                        startDate={item.startDate}
                        status={item.status}
                        time={item.time}
                      />
                    </Link>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
        {classes.length > 8 && (
          <h3
            className="highLightText"
            style={{ textAlign: 'center', cursor: 'pointer' }}
          >
            Xem thêm {'> >'}
          </h3>
        )}

        <Row>
          <div className="titleSection textTheme">Góc học tập</div>
          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              {/* <Col xl={5}>
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
              </Col> */}
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

export async function getServerSideProps() {
  try {
    const getClassRecruiting = await SearchClassApi(
      `page=1&pageSize=20&recruiting=true`
    )
    const getStudyPost = await SearchPostApi(
      `page=1&pageSize=8&status=1&type=${POST_TYPE.STUDY}`
    )
    const getNewsPost = await SearchPostApi(
      `page=1&pageSize=8&status=1&type=${POST_TYPE.NEWS}`
    )

    return {
      props: {
        classes: getClassRecruiting.data?.dataTable ?? [],
        study: getStudyPost.data?.dataTable ?? [],
        news: getNewsPost.data?.dataTable ?? []
      }
    }
  } catch (error) {
    return {
      classes: [],
      study: [],
      news: []
    }
  }
}

export default Home
