import { ContentLoading } from '@/components'
import { Row, Table, Tabs, TabsProps } from 'antd'
import React, { useState } from 'react'


export function RegisClassManager(): JSX.Element {
  const [loading, setLoading] = useState(false)

  return (
    <React.Fragment>
          {loading ? (
          <ContentLoading />)
          :  <Table />} 
    </React.Fragment>
   
  )
}
