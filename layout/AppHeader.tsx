import React, { useEffect, useState } from 'react'
import { Row, Col, Switch, Button, Avatar, Badge, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import MenuTop from '@/components/menu/MenuTop'
import { useTheme, useUser } from '@/hooks'
import { Router, useRouter } from 'next/router'
import { PATH, ROLE } from '@/const/app-const'
import {
  CrownTwoTone,
  EnvironmentOutlined,
  FacebookOutlined,
  PhoneOutlined,
  YoutubeOutlined
} from '@ant-design/icons'
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
        <Row justify="space-between" align="middle">
          <Col>
            <Row>
              <Col style={{ padding: '0.6rem', color: 'red' }}>
                <EnvironmentOutlined />
                &nbsp;adghklmn
              </Col>
              <Col style={{ padding: '0.6rem 0', color: 'red' }}>
                <PhoneOutlined rotate={90} />
                &nbsp;751893751
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col>
                <Link
                  href="https://www.youtube.com/channel/UCEypAcOaTK_tpwvzhLBUpaA"
                  target="_blank"
                >
                  <div className="youtube">
                    <YoutubeOutlined className="yticon" />
                    &nbsp;Youtube
                  </div>
                </Link>
              </Col>
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
        </Row>
      </Col>
      <Col
        id="header"
        className="lightSection"
        span={24}
        style={{ padding: '0 1rem' }}
      >
        <Row align="middle">
          <Col span={6}>
            <Row
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/')}
              align="middle"
            >
              <Col>
                <Image
                  src="/favicon.svg"
                  alt="Trung tâm tiếng nhật Mina"
                  width={80}
                  height={80}
                />
              </Col>
              <Col>
                <p
                  style={{
                    fontFamily: 'Poltawski Nowy, serif',
                    marginLeft: '-0.6rem'
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
                <Switch
                  checked={activeSwitch}
                  onChange={(checked: Boolean) =>
                    checked ? changeTheme('light') : changeTheme('dark')
                  }
                  checkedChildren="Sáng"
                  unCheckedChildren="Tối"
                />
              </Col>
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
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
