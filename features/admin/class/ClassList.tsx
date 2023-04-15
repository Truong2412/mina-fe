import { CardLoading, ClassCard, ContentLoading } from '@/components'
import { CLASS_STATUS, classLevelOption } from '@/const/app-const'
import { ClassProps } from '@/entities/class.entities'
import { checkRes } from '@/network/services/api-handler'
import { Button, Col, Divider, Pagination, Row, Select, message } from 'antd'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { ClassInfo } from './ClassList-ClassInfo'
import { SearchClassApi } from '@/pages/api/class.api'

interface FilterProps {
  status?: CLASS_STATUS
  recruiting?: Boolean
  classLevel?: string
  pageSize: number
  page: number
}
export function ClassList() {
  const [filter, setFilter] = useState<FilterProps>({
    status: CLASS_STATUS.OPEN,
    page: 1,
    pageSize: 9
  })
  const [params, setParams] = useState<string>('page=1&pageSize=9')

  const [loading, setLoading] = useState(false)

  const [classList, setClassList] = useState<ClassProps[]>([])
  const [total, setTotal] = useState(0)

  const [detail, setDetail] = useState<ClassProps>({} as ClassProps)
  async function searchClass(searchParams: string) {
    setLoading(true)
    const result = await SearchClassApi(searchParams)
    checkRes(
      result,
      () => {
        if (result.data !== null) {
          setClassList(result.data.dataTable)
          setTotal(result.data.totalCount)
        }
      },
      () => {
        message.error('Lấy danh sách lớp không thành công!')
      },
      () => setLoading(false)
    )
  }

  useEffect(() => {
    searchClass(params)
  }, [params])

  //handle filter change
  function handleFilterChange(
    name: keyof FilterProps,
    value: CLASS_STATUS | Boolean | undefined
  ) {
    if (value === undefined) {
      let cloneFilter = { ...filter }
      delete cloneFilter[name]
      setFilter(cloneFilter)
    } else {
      setFilter((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleSearch() {
    const searchParamsString = queryString.stringify(filter)
    setParams(searchParamsString)
  }

  function handleViewDetail(i: number) {
    setDetail(classList[i])
  }

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Row className="roundedBox" gutter={[16, 0]}>
          <Col>
            <label className="textTheme">Trạng thái lớp: </label>
            <Select
              placeholder="Trạng thái lớp"
              style={{ width: 160 }}
              defaultValue={CLASS_STATUS.OPEN}
              allowClear
              onChange={(value) => handleFilterChange('status', value)}
              options={[
                { value: CLASS_STATUS.OPEN, label: 'Đang tuyển' },
                { value: CLASS_STATUS.PROCESSING, label: 'Đang hoạt động' },
                { value: CLASS_STATUS.END, label: 'Đã kết thúc' }
              ]}
            />
          </Col>
          <Col>
            <label className="textTheme">Trạng thái tuyển sinh: </label>
            <Select
              placeholder="Trạng thái tuyển sinh"
              style={{ width: 180 }}
              onChange={(value) => handleFilterChange('recruiting', value)}
              allowClear
              options={[
                { value: true, label: 'Đang tuyển' },
                { value: false, label: 'Ngừng tuyển' }
              ]}
            />
          </Col>
          <Col>
            <label className="textTheme">Level: </label>
            <Select
              placeholder="Level"
              style={{ width: 180 }}
              onChange={(value) => handleFilterChange('classLevel', value)}
              allowClear
              options={classLevelOption}
            />
          </Col>
          <Col>
            <Button onClick={handleSearch} type="primary">
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Col>

      <Col xxl={16}>
        {loading ? (
          <ContentLoading />
        ) : (
          <Row gutter={[16, 16]}>
            {classList.map((item, i) => (
              <Col
                onClick={() => handleViewDetail(i)}
                className="cardBox"
                xxl={8}
                key={`class card ${i}`}
              >
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
              </Col>
            ))}
            <Col span={24}>
              <Row justify="center">
                <Pagination
                  className="roundedBox"
                  pageSize={filter.pageSize}
                  showQuickJumper={total > 100}
                  defaultCurrent={1}
                  total={total}
                  onChange={(page) => handleFilterChange('page', page)}
                />
              </Row>
            </Col>
          </Row>
        )}
      </Col>
      <Col className="roundedBox" xxl={8}>
        <ClassInfo {...detail} />
      </Col>
    </Row>
  )
}
