import React, { ReactNode } from 'react'
import { Layout } from 'antd'
import { SidebarMenu } from '../components/sidebar-menu.tsx/SidebarMenu'
import { AppFooter } from './AppFooter'
import { useLoading, useTheme } from '../hooks'
import { FullPageLoading } from '../components/loading/FullPageLoading'
import AppHeader from './AppHeader'

type Props = {
  children: ReactNode
}

const { Header, Content, Footer, Sider } = Layout

export const AppLayout: React.FC<Props> = ({ children }) => {
  const { isLoading } = useLoading()
  const { theme } = useTheme()
  // const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout
      className="containerBoxShadow"
      style={{
        margin: '0 auto',
        minHeight: '100vh',
        maxWidth: 1400
      }}
    >
      {isLoading && <FullPageLoading />}

      <AppHeader />

      <Layout>
        {/* <Sider
          theme={theme.text}
          breakpoint="sm"
          collapsedWidth="0"
          width={256}
          // collapsible
          // collapsed={collapsed}
          // onCollapse={(value) => setCollapsed(value)}
        >
          <SidebarMenu />
        </Sider> */}

        <Layout>
          <Content className={theme.content}>{children}</Content>
        </Layout>
      </Layout>
      <Footer className={theme.section}>
        <AppFooter />
      </Footer>
    </Layout>
  )
}
