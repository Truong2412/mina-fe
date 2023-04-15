import React, { ReactNode, useEffect } from 'react'
import { Layout, Row } from 'antd'
import { AppFooter } from './AppFooter'
import { useLoading, useTheme, useUser } from '../hooks'
import { FullPageLoading } from '../components/loading/FullPageLoading'
import AppHeader from './AppHeader'

type Props = {
  children: ReactNode
}

const { Content, Footer } = Layout

export const AppLayout: React.FC<Props> = ({ children }) => {
  const { isLoading } = useLoading()
  const { theme } = useTheme()
  const { user } = useUser()
  console.log(user)

  useEffect(() => {
    const content = document.getElementById('content-mina')
    const footer = document.getElementById('footer-mina')
    if (theme.section === 'lightSection') {
      content?.classList.replace('darkTheme', 'lightTheme')
      footer?.classList.replace('darkSection', 'lightSection')
    } else {
      content?.classList.replace('lightTheme', 'darkTheme')
      footer?.classList.replace('lightSection', 'darkSection')
    }
  }, [theme])
  // const [collapsed, setCollapsed] = useState(false)
  return (
    <Row style={{ background: 'lightgray' }}>
      <Layout
        className="containerBoxShadow"
        style={{
          margin: '0 auto',
          minHeight: '100vh',
          maxWidth: 1400,
          position: 'relative'
        }}
      >
        {isLoading && <FullPageLoading />}

        <AppHeader />

        <Content className="lightTheme" id="content-mina">
          {children}
        </Content>

        <Footer className="lightSection" id="footer-mina">
          <AppFooter />
        </Footer>
      </Layout>
    </Row>
  )
}
