import PageContainer from '@renderer/components/PageContainer'
import { useRxData } from 'rxdb-hooks'
import { App, Button, Card, Space, Typography } from 'antd'
import { StorageDocType } from '@db/schemas'
import { useParams } from 'react-router-dom'
import { AppChannel } from '@common/app-channel.enum'
import { useEffect, useState } from 'react'
import { ScanProcessResult } from '@common/scan-process-result.type'
import { useFileCount } from '@renderer/hooks/use-file-count.hook'
import { useFolderCount } from '@renderer/hooks/use-folder-count.hook'
import { useMovieCount } from '@renderer/hooks/use-movie-count.hook'
const { Paragraph } = Typography

const StorageDetailPage: React.FC = () => {
  const { message } = App.useApp()
  const { storageId } = useParams()
  const { result: storages } = useRxData<StorageDocType>('storages', (collection) =>
    collection.findOne().where('id').equals(storageId)
  )
  const storageInfo = storages[0]
  const fileCount = useFileCount(storageInfo?.storagePath || null)
  const folderCount = useFolderCount(storageInfo?.storagePath || null)
  const movieCount = useMovieCount(storageInfo?.storagePath || null)
  const [isFirst, setIsFirst] = useState(true)

  const [scanning, setScanning] = useState(false)

  const [scanProcessResult, setScanProcessResult] = useState<ScanProcessResult>({
    status: 'idle',
    recent: ''
  })

  useEffect(() => {
    window.electron.ipcRenderer.on(AppChannel.ScanFolderProcess, (_, result) => {
      setScanProcessResult(result)
    })
  }, [])

  const startScan = (scanPath: string) => {
    message.success('操作开始')
    setIsFirst(false)
    setScanning(true)
    window.electron.ipcRenderer.invoke(AppChannel.ScanFolder, scanPath)
  }

  useEffect(() => {
    if (scanning && scanProcessResult.status === 'idle') {
      message.destroy()
      message.success('操作完成')
      setScanning(false)
    }
  }, [scanProcessResult.status, scanning])

  const terminalScan = () => {
    setScanning(false)
    message.warning('操作中断')
    window.electron.ipcRenderer.send(AppChannel.TerminalScanFolderProcess)
  }

  return (
    <PageContainer name="管理存储">
      <Paragraph>存储路径：{storageInfo?.storagePath || '尚未设置'}</Paragraph>
      <Paragraph>
        {storageInfo && (
          <Space>
            {scanning ? (
              <Button onClick={() => terminalScan()}>停止扫描</Button>
            ) : (
              <Button
                type="primary"
                ghost={true}
                onClick={() => startScan(storageInfo.storagePath)}
              >
                {isFirst ? '开始扫描' : '重新扫描'}
              </Button>
            )}
          </Space>
        )}
      </Paragraph>
      <Space>
        <Card style={{ width: 150 }} size="small" title="文件">
          {fileCount}
        </Card>
        <Card style={{ width: 150 }} size="small" title="文件夹">
          {folderCount}
        </Card>
        <Card style={{ width: 150 }} size="small" title="电影">
          {movieCount}
        </Card>
      </Space>
      {scanProcessResult.recent && (
        <Paragraph style={{ marginTop: 10 }}>最近扫描：{scanProcessResult.recent}</Paragraph>
      )}
    </PageContainer>
  )
}

export default StorageDetailPage
