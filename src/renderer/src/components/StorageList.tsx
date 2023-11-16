import { StorageDocType } from '@db/schemas'
import { Card, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useRxData } from 'rxdb-hooks'

const StorageList: React.FC = () => {
  const { result: storages, isFetching } = useRxData<StorageDocType>('storages', (collection) =>
    collection.find()
  )
  const navigate = useNavigate()

  if (isFetching) {
    return 'Loading storages...'
  }

  return (
    <Space>
      {storages.length === 0 && <>尚未添加存储</>}
      {storages.map((storage) => (
        <Card
          key={storage.storagePath}
          title="Storage"
          size="small"
          bodyStyle={{
            width: 200,
            height: 80,
            wordBreak: 'break-all',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            fontSize: 12
          }}
          actions={[
            <span
              onClick={() => {
                navigate(`/storage-detail/${storage.id}`)
              }}
              key={`storage-detail-link-${storage.id}`}
            >
              详细
            </span>,
            <span
              onClick={() => {
                storage.remove()
              }}
              key={`storage-detail-delete-${storage.id}`}
            >
              删除
            </span>
          ]}
        >
          {storage.storagePath}
        </Card>
      ))}
    </Space>
  )
}
export default StorageList
