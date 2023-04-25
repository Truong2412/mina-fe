import { Menu, MenuProps } from 'antd'
import React, { ReactElement, useState } from 'react'
import {
  ShopOutlined,
  ContainerOutlined,
  FormOutlined,
  QuestionOutlined
} from '@ant-design/icons'
import { ClassManager } from './class/ClassManager'
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
    <div className="menuItem">
      <ShopOutlined style={{ fontSize: '1.5rem' }} />
      &nbsp;&nbsp;Lớp học
    </div>,
    `class`
  ),
  getItem(
    <div className="menuItem">
      <FormOutlined style={{ fontSize: '1.5rem' }} />
      &nbsp;&nbsp;Đơn đăng ký học
    </div>,
    `regis-class`
  ),
  getItem(
    <div className="menuItem">
      <ContainerOutlined style={{ fontSize: '1.5rem' }} />
      &nbsp;&nbsp;Bài viết
    </div>,
    `post`,
    null,
    [
      getItem(<div className="menuItem">Đã đăng</div>, `post-posted`),
      getItem(<div className="menuItem">Đăng bài mới</div>, `post-new`)
    ]
  ),
  getItem(
    <div className="menuItem">
      <QuestionOutlined style={{ fontSize: '1.5rem' }} />
      &nbsp;&nbsp;Quản lý câu hỏi
    </div>,
    `question`
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
      className="textTheme"
      onClick={onClick}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
      }}
      selectedKeys={[current]}
      mode="inline"
      items={adminNav}
    />
  )
}
