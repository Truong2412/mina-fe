import { CLASS_STATUS } from '@/const/app-const'
import { SearchClassApi } from '@/pages/api/admin.api'
import { Row } from 'antd'
import queryString from 'query-string'
import { useEffect } from 'react'

export function ClassList() {
  const searchParams = { status: CLASS_STATUS.OPEN, page: 1, pageSize: 10 }
  const searchParamsString = queryString.stringify(searchParams)
  async function searchClass(params: string) {
    const result = await SearchClassApi(params)
    console.log(result)
  }

  useEffect(() => {
    searchClass(searchParamsString)
  }, [])

  return <Row></Row>
}
