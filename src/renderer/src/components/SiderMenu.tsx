import { Menu } from 'antd'
import { HomeOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const SiderMenu: React.FC = () => {
  const getItem = (
    label: React.ReactNode,
    url: string,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label: <Link to={url}>{label}</Link>
    } as MenuItem
  }

  const items: MenuItem[] = [
    getItem('控制面板', '/', '0', <HomeOutlined />),
    getItem('存储位置', '/storage', '1', <AppstoreAddOutlined />)
  ]

  return <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline" items={items} />
}

export default SiderMenu
