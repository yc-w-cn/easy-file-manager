import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { App, ConfigProvider } from 'antd'
import { magenta } from '@ant-design/colors'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Provider } from 'rxdb-hooks'
import { initialize } from '@db/initialize'
import { Database } from '@db/database.type'
import { AppChannel } from '@common/app-channel.enum'

const Root = () => {
  const [db, setDb] = useState<Database>()

  useEffect(() => {
    initialize().then((db) => {
      setDb(db)

      // Add Listeners
      window.electron.ipcRenderer.on(AppChannel.SaveFile, (_, result) => {
        db.files.upsert({
          fileName: result.filePath,
          fullFilePath: result.filePath,
          fileSize: 0, // TODO
          createdAt: new Date().getTime(), // TODO
          updatedAt: new Date().getTime()
        })
        console.log(AppChannel.SaveFile, result)
      })

      window.electron.ipcRenderer.on(AppChannel.SaveFolder, (_, result) => {
        db.folders.upsert({
          folderName: result.filePath, // TODO
          fullFolderPath: result.filePath,
          createdAt: new Date().getTime(), // TODO
          updatedAt: new Date().getTime()
        })
        console.log(AppChannel.SaveFolder, result)
      })

      window.electron.ipcRenderer.on(AppChannel.SaveMovie, (_, result) => {
        db.movies.upsert({
          destination: result.filePath,
          type: '', // TODO
          tags: [], // TODO
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime()
        })
        console.log(AppChannel.SaveMovie, result)
      })
    })
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: magenta.primary
        }
      }}
    >
      <Provider db={db}>
        <App>
          <RouterProvider router={router} />
        </App>
      </Provider>
    </ConfigProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
