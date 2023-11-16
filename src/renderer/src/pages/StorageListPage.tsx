import { AppChannel } from '@common/app-channel.enum'
import PageContainer from '@renderer/components/PageContainer'
import StorageList from '@renderer/components/StorageList'
import { Button, Divider, Space, Typography } from 'antd'
import { useState } from 'react'
import { useRxCollection } from 'rxdb-hooks'

const { Paragraph } = Typography

const StoragePage: React.FC = () => {
  const collection = useRxCollection('storages')
  const [storagePath, setStoragePath] = useState('')
  const handleClick = async () => {
    window.electron.ipcRenderer
      .invoke(AppChannel.SelectFolderPath)
      .then((returnValue: Electron.OpenDialogReturnValue) => {
        if (!returnValue.canceled && returnValue.filePaths.length === 1) {
          setStoragePath(returnValue.filePaths[0])
        }
      })
  }
  return (
    <PageContainer name="存储位置">
      <Divider orientation="left">添加新的存储位置</Divider>
      <Paragraph>StoragePath: {storagePath || '尚未选择'}</Paragraph>
      <Space>
        {!storagePath && <Button onClick={handleClick}>选择存储位置</Button>}
        {storagePath && (
          <Button
            type="primary"
            onClick={() => {
              collection?.upsert({
                id: String(new Date().getTime()),
                storageName: storagePath,
                storagePath,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime()
              })
              setStoragePath('')
            }}
          >
            确认添加
          </Button>
        )}
        {storagePath && <Button onClick={() => setStoragePath('')}>取消</Button>}
      </Space>
      <Divider orientation="left">已添加的存储位置</Divider>
      <StorageList />
    </PageContainer>
  )
}

export default StoragePage
