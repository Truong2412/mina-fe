import { Col, Menu, MenuProps, Row, Switch } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
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
import { PATH } from '../../const/app-const'
import { ClassManager } from './class/ClassManager'
import { NotFoundPage } from '@/components/notFoundPage/NotFoundPage'
import { Posted } from './post/Posted'
import { NewPost } from './post/NewPost'
import { RegisClassManager } from './regisClass/RegisClassManager'
import { QuestionManager } from './question/QuestionManager'

// import { useNavigate } from 'react-router'
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

export const adminNavOption = [
  {
    key: 'class',
    component: <ClassManager />
  },
  {
    key: 'regis-class',
    component: <RegisClassManager />
  },
  {
    key: 'post',
    component: null,
    child: [
      {
        key: 'post-posted',
        component: <Posted />
      },
      {
        key: 'post-new',
        component: <NewPost />
      }
    ]
  },
  {
    key: 'question',
    component: <QuestionManager />
  }
]

export const adminNav: MenuItem[] = [
  getItem(
    'Lớp học',
    `class`,
    <ShopOutlined style={{ fontSize: '1.5rem', color: 'blue' }} />
  ),
  getItem(
    'Đơn đăng ký học',
    `regis-class`,
    <ShopOutlined style={{ fontSize: '1.5rem', color: 'blue' }} />
  ),
  // getItem(
  //   'Học viên',
  //   `student`,
  //   <ShopOutlined style={{ fontSize: '1.5rem', color: 'blue' }} />
  // ),
  getItem('Bài viết', `post`, <ContainerOutlined />, [
    getItem('Đã đăng', `post-posted`, null),
    getItem('Đăng bài mới', `post-new`, null)
  ]),
  getItem(
    'Quản lý câu hỏi',
    `question`,
    <ShopOutlined style={{ fontSize: '1.5rem', color: 'blue' }} />
  )
]

interface SidebarAdminProps {
  changeFeature: (newFeature: ReactElement) => void
}

export function SidebarAdmin({
  changeFeature
}: SidebarAdminProps): JSX.Element {
  const [current, setCurrent] = useState(`class`)

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    console.log(e.keyPath)
    let component: ReactElement | null
    if (e.keyPath.length === 2) {
      console.log(e.keyPath)
      const parent = adminNavOption.find((item) => item.key === e.keyPath[1])
      console.log(parent)
      component =
        parent?.child?.find((item) => item.key === e.keyPath[0])?.component ??
        null
    } else if (e.keyPath.length === 1) {
      component =
        adminNavOption.find((item) => item.key === e.keyPath[0])?.component ??
        null
    } else {
      component = null
    }

    if (component !== null) {
      changeFeature(component)
    }
  }

  return (
    <Menu
      onClick={onClick}
      style={{ width: '100%', height: '100%' }}
      // defaultOpenKeys={['sub1', 'sub2', 'sub4']}
      selectedKeys={[current]}
      mode="inline"
      items={adminNav}
    />
  )
}
