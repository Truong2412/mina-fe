import { Col, Menu, MenuProps, Row, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  // MailOutlined,
  // AppstoreOutlined,
  // SettingOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  ContainerOutlined,
  GiftOutlined,
  DollarTwoTone
} from '@ant-design/icons'
import { useTheme } from '../../hooks'
import { PATH, THEME } from '../../const/app-const'
import { useNavigate } from 'react-router'
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}
export const adminNav: MenuItem[] = [
  getItem(
    'Trang bán hàng',
    `${PATH.MANAGER}/${PATH.STORE}`,
    <ShopOutlined style={{ fontSize: '1.5rem', color: 'blue' }} />
  ),
  getItem(
    'Quản lý Đơn hàng',
    `${PATH.MANAGER}/${PATH.ORDER}`,
    <ContainerOutlined />
  ),

  getItem(
    'Quản lý sản phẩm',
    `${PATH.MANAGER}/${PATH.PRODUCT}`,
    <UnorderedListOutlined />
  ),
  getItem(
    'Kho hàng',
    `${PATH.MANAGER}/${PATH.WAREHOUSE}`,
    <UnorderedListOutlined />
  ),
  getItem(
    'Quản lý danh mục',
    `${PATH.MANAGER}/${PATH.CATEGORY}`,
    <UnorderedListOutlined />
  ),
  getItem(
    'Chương trình khuyến mãi',
    `${PATH.MANAGER}/${PATH.PROMOTIONS}`,
    <GiftOutlined />
  ),
  getItem(
    'Thống kê doanh số',
    `${PATH.MANAGER}/${PATH.SALES_STATISTICS}`,
    <DollarTwoTone twoToneColor="gold" style={{ fontSize: '1.5rem' }} />
  )
]

export const SidebarMenu: React.FC = () => {
  const { theme, changeTheme } = useTheme()
  const [current, setCurrent] = useState(`${PATH.MANAGER}/${PATH.STORE}`)
  const [activeSwitch, setActiveSwitch] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    let active = false
    if (theme.text === THEME.LIGHT.text) {
      active = true
    }
    setActiveSwitch(active)
  }, [theme])

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    navigate(e.key)
  }

  return (
    <React.Fragment>
      <Menu
        theme={theme.text}
        onClick={onClick}
        style={{ width: 256, minHeight: '80vh' }}
        defaultOpenKeys={['sub1', 'sub2', 'sub4']}
        selectedKeys={[current]}
        mode="inline"
        items={adminNav}
      />

      <Row
        style={{ color: 'white', padding: 12 }}
        gutter={16}
        justify="center"
        align="middle"
      >
        <Col span={24}>
          <Switch
            checked={activeSwitch}
            onChange={(checked) =>
              checked
                ? changeTheme(THEME.LIGHT.text)
                : changeTheme(THEME.DARK.text)
            }
            checkedChildren="Sáng"
            unCheckedChildren="Tối"
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}
