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
import { Carousel } from '@/components/carousel/Carousel'
import { NewsAndEventCard } from '@/components/card/NewsAndEventCard'
import { removeMark } from '@/ultis/dataConvert'

const inter = Inter({ subsets: ['latin'] })
interface HomeProps {
  classes: ClassProps[]
  news: PostProps[]
  study: PostProps[]
}
function Home({ classes, news, study }: HomeProps) {
  console.log(classes)
  return (
    <>
      <Head>
        <title>Trung tâm tiếng nhật Mina</title>
        <meta name="description" content="Trung tâm tiếng nhật Mina - Hà Nội" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        {/* banner and effect, regis form */}
        <div style={{ width: '100%', position: 'relative' }}>
          <img
            src="/banner.jpeg"
            alt="mina - tieng nhat cho moi nguoi"
            width="100%"
          />
        </div>

        {/* news and envents and  Studiy Space */}
        <Row style={{ marginTop: '1rem' }}>
          <div className="titleSection">Tin tức và sự kiện</div>

          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              <Carousel>
                {news.map((item, i) => (
                  <Col key={`event ${i}`}>
                    <Link
                      href={`/tin-tuc-&-su-kien/${removeMark(item.title)}&pid${
                        item._id
                      }`}
                    >
                      <NewsAndEventCard {...item} />
                    </Link>
                  </Col>
                ))}
              </Carousel>
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <Link href={`/tin-tuc-&-su-kien`}>
              <h3 className="seeMore">Xem thêm {'> >'}</h3>
            </Link>
          </Col>
        </Row>

        <Row style={{ marginTop: '1rem' }}>
          <div className="titleSection">Lớp học đang tuyển sinh</div>

          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              {classes &&
                classes.map((item, i) => (
                  <Col xxl={5} xs={21} key={`class mina ${i}`}>
                    <Link href={`/${PATH.CLASS}/${item._id}`}>
                      <ClassCard
                        type="student"
                        cardImg={item.cardImg}
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
        {/* {classes.length > 8 && ( */}
        <Row justify="center">
          <Col span={24}>
            <h3 className="seeMore">Xem thêm {'> >'}</h3>
          </Col>
        </Row>
        {/* )} */}

        <Row style={{ marginTop: '1rem' }}>
          <div className="titleSection">Góc học tập</div>
          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              {study.map((item, i) => (
                <Col xxl={5} xs={22} key={`card study ${i}`}>
                  <Link
                    href={`/goc-hoc-tap/${removeMark(item.title)}&pid${
                      item._id
                    }`}
                  >
                    <NewsAndEventCard {...item} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24}>
            <Link href={`/goc-hoc-tap`}>
              <h3 className="seeMore">Xem thêm {'> >'}</h3>
            </Link>
          </Col>
        </Row>
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
    console.log(error)
    return {
      props: {
        classes: [],
        study: [],
        news: []
      }
    }
  }
}

export default Home
