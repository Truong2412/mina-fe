import { Row, Tabs, TabsProps } from 'antd'
import { NewClass } from './NewClass'
import { ClassList } from './ClassList'

export function ClassManager(): JSX.Element {
  const items: TabsProps['items'] = [
    {
      key: 'classes',
      label: `Quản lý lớp học`,
      children: <ClassList />
    },
    {
      key: 'newclass',
      label: `Tạo lớp mới`,
      children: <NewClass />
    }
  ]
  const onChange = (key: string) => {
    console.log(key)
  }

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}
