import React, { useEffect, useState } from 'react'
import { Row, Col, Switch, Button, Avatar, Badge, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import MenuTop from '@/components/menu/MenuTop'
import { useTheme, useUser } from '@/hooks'
import { Router, useRouter } from 'next/router'
import { PATH, ROLE } from '@/const/app-const'
import { CrownTwoTone, FacebookOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { AdminMenu } from '@/components/menu/AdminMenu'
import { UserMenu } from '@/components/menu/UserMenu'
import Image from 'next/image'

export default function AppHeader(): JSX.Element {
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
    <Row>
      <Col style={{ background: 'white' }} span={24}>
        <Row style={{ padding: 2 }} justify="end" align="middle">
          <Col>
            <Link
              href="https://www.facebook.com/TrungTamTiengNhatMina1/"
              target="_blank"
            >
              <div className="facebook">
                <FacebookOutlined className="faceicon" />
                &nbsp;Facebook
              </div>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col
        id="header"
        className="lightSection"
        span={24}
        style={{ padding: '0 8px 0 8px' }}
      >
        <Row align="middle">
          <Col span={6}>
            <Row
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/')}
              align="middle"
              justify="start"
            >
              <Col>
                <Image
                  src="/favicon.svg"
                  alt="Trung tâm tiếng nhật Mina"
                  width={80}
                  height={80}
                  style={{ marginLeft: '1rem' }}
                />
              </Col>
              <Col>
                <p
                  style={{
                    fontFamily: 'Poltawski Nowy, serif',
                    marginLeft: '-0.8rem'
                  }}
                >
                  TIẾNG NHẬT CHO MỌI NGƯỜI
                </p>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <MenuTop />
          </Col>

          <Col span={6}>
            <Row align="middle" gutter={[18, 0]} justify="end">
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
                        {user.role === ROLE.ADMIN ||
                        user.role === ROLE.STAFF ? (
                          <AdminMenu
                            userName={user.name ?? ''}
                            role={user.role}
                          />
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
      </Col>
    </Row>
  )
}
