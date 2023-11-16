import config from '@renderer/config'
import { Layout, Breadcrumb, theme } from 'antd'

const { Content, Footer } = Layout

type Props = {
  name: string
  children?: React.ReactNode
}

const PageContainer: React.FC<Props> = ({ name, children }: Props) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: config.name }, { title: name }]} />
      <Content
        style={{
          position: 'relative',
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: 10
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>{config.copyright}</Footer>
    </>
  )
}

export default PageContainer
