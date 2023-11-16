import { GithubOutlined } from '@ant-design/icons'
import PageContainer from '@renderer/components/PageContainer'
import Versions from '@renderer/components/Versions'
import { Button, Typography, Divider } from 'antd'

const { Title, Paragraph } = Typography

const HomePage: React.FC = () => {
  return (
    <PageContainer name="概览">
      <Title level={3}>EasyFileManager</Title>
      <Paragraph>
        基于 Electron + Ant Design 的本地存储管理器，缓存本地文件信息到 IndexedDB 实现高效检索。
      </Paragraph>
      <Paragraph>
        <Button
          size="small"
          icon={<GithubOutlined />}
          onClick={() => {
            window.open('https://github.com/yc-w-cn/easy-file-manager', '_blank')
          }}
        >
          代码仓库
        </Button>
      </Paragraph>
      <Divider orientation="left">版本信息</Divider>
      <Versions />
    </PageContainer>
  )
}

export default HomePage
