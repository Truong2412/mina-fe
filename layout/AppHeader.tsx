import React, { useEffect, useState } from 'react'
import { Row, Col, Avatar, Badge, Switch } from 'antd'
import { ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons'
import MenuTop from '@/components/menu/MenuTop'
import { useTheme } from '@/hooks'
import { lightTheme } from '@/contexts/ThemeContext'

export default function AppHeader() {
  const { theme, changeTheme } = useTheme()
  const [activeSwitch, setActiveSwitch] = useState(false)
  useEffect(() => {
    let active = false
    if (theme === lightTheme) {
      active = true
    }
    setActiveSwitch(active)
  }, [theme])

  return (
    <Row style={{ padding: '0 8px 0 8px' }} className={theme.section}>
      <Col xl={5}>
        <Row align="middle">
          <Col>
            <img
              src="/favicon.ico"
              alt="Trung tâm tiếng nhật Mina"
              style={{ width: 60 }}
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
        <Row align="middle" justify="end">
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
        {/* <Row justify="end" align="middle">
          <Avatar />
          <span> Username</span>
          <Col>
            <Badge count={5}>
              <ShoppingCartOutlined className="icon" />
            </Badge>
          </Col>
          <Col push={1}>
            <SettingOutlined
              // onClick={() => handleOpenDrawer()}
              className="icon"
            />
          </Col>
        </Row> */}
      </Col>
    </Row>
  )
}
