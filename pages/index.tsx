import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Col, Divider, Row, Typography } from 'antd'
import { useTheme } from '@/hooks'
import { API, textWhite } from '@/const/app-const'
import { ClassCard } from '@/components'
import { ClassProps } from '@/entities/class.entities'
import { ResponseProps } from '@/network/services/api-handler'
import { PagingResponseProps } from '@/network/services/api-handler'
import Link from 'next/link'
import { PATH } from '@/const/app-const'

const inter = Inter({ subsets: ['latin'] })
interface HomeProps {
  classesData: ClassProps[] | null
}
export default function Home({ classesData }: HomeProps) {
  console.log(classesData)
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
              {classesData &&
                classesData.map((item, i) => (
                  <Col xxl={5}>
                    <Link href={`/${PATH.CLASS}/${item._id}`}>
                      <ClassCard
                        type="admin"
                        daysOfWeek={item.daysOfWeek}
                        createdAt={item.createdAt}
                        classLevel={item.classLevel}
                        cardImg={item.cardImg}
                        numberOfRecruits={item.numberOfRecruits}
                        numberOfStudents={item.numberOfStudents}
                        recruiting={item.recruiting}
                        schedule={item.schedule}
                        status={item.status}
                        time={item.time}
                      />
                    </Link>
                  </Col>
                ))}
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
        <Row>
          <Divider>
            <h3> Góc học tập</h3>
          </Divider>
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

export async function getStaticProps() {
  const res: Response = await fetch(
    `${API}/class/search?status=0&page=1&pageSize=20`
  )
  const classes: ResponseProps<PagingResponseProps<ClassProps[] | null>> =
    await res.json()
  const classesData = classes.data.dataTable
  return {
    props: { classesData }
  }
}
