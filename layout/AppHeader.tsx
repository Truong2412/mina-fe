import React, { useEffect, useState } from 'react'
import { Row, Col, Switch, Button, Avatar, Badge, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import MenuTop from '@/components/menu/MenuTop'
import { useTheme, useUser } from '@/hooks'
import { useRouter } from 'next/router'
import { PATH, ROLE } from '@/const/app-const'
import { CrownTwoTone } from '@ant-design/icons'
import Link from 'next/link'
import { AdminMenu } from '@/components/menu/AdminMenu'
import { UserMenu } from '@/components/menu/UserMenu'
import Image from 'next/image'

export default function AppHeader() {
  const router = useRouter()
  const { user } = useUser()
  const { theme, changeTheme } = useTheme()
  const [activeSwitch, setActiveSwitch] = useState(false)
  useEffect(() => {
    let active = false
    const header = document.getElementById('header')
    if (theme.section === 'lightSection') {
      header?.classList.add('lightSection')
      header?.classList.remove('darkSection')
      console.log('sai ha')
      active = true
    } else {
      header?.classList.add('darkSection')
      header?.classList.remove('lightSection')
    }
    return setActiveSwitch(active)
  }, [theme])

  function handleNavigate() {
    router.push(`/${PATH.LOGIN}`)
  }

  return (
    <Row
      id="header"
      className="lightSection"
      align="middle"
      style={{ padding: '0 8px 0 8px' }}
    >
      <Col xl={5}>
        <Row align="middle">
          <Col>
            <Image
              src="/favicon.svg"
              alt="Trung tâm tiếng nhật Mina"
              width={60}
              height={60}
            />
          </Col>
          <Col>
            <p>Tiếng nhật cho mọi người</p>
          </Col>
        </Row>
      </Col>

      <Col xl={14}>
        <MenuTop />
      </Col>

      <Col xl={5}>
        <Row gutter={[18, 0]} justify="end">
          <Col>
            <Row gutter={[4, 0]}>
              {user.token && user.token !== '' ? (
                <React.Fragment>
                  <Col>
                    <Avatar
                      src={
                        user.avatar ??
                        'https://xsgames.co/randomusers/avatar.php?g=pixel'
                      }
                    />
                  </Col>
                  <Col>
                    {user.role === ROLE.ADMIN || user.role === ROLE.STAFF ? (
                      <AdminMenu userName={user.name ?? ''} role={user.role} />
                    ) : (
                      <UserMenu userName={user.name ?? ''} />
                    )}
                  </Col>
                </React.Fragment>
              ) : (
                <Button type="primary" onClick={handleNavigate}>
                  Đăng nhập
                </Button>
              )}
            </Row>
          </Col>

          <Col>
            <Switch
              checked={activeSwitch}
              onChange={(checked: Boolean) =>
                checked ? changeTheme('light') : changeTheme('dark')
              }
              checkedChildren="Sáng"
              unCheckedChildren="Tối"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
