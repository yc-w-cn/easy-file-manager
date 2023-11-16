import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import SiderLogo from './SiderLogo'
import SiderMenu from './SiderMenu'

const { Sider } = Layout

const PageLayout: React.FC = () => {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <SiderLogo></SiderLogo>
          <SiderMenu></SiderMenu>
        </Sider>
        <Layout style={{ padding: '0 24px 0 24px' }}>
          <Outlet />
        </Layout>
      </Layout>
    </>
  )
}

export default PageLayout
