import { Tabs } from 'antd'
import { MenuManager } from './feature-menu-manager'
import { TagManager } from './feature-tag-manager'

export const CategoryManager: React.FC = () => {
  // const { theme } = useTheme()
  return (
    <Tabs
      centered={true}
      defaultActiveKey="1"
      items={[
        {
          label: 'Quản lý menu',
          key: '1',
          children: <MenuManager />
        },
        {
          label: 'Quản lý thẻ',
          key: '2',
          children: <TagManager />
        }
      ]}
    />
  )
}
