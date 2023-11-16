import { BrowserWindow } from 'electron'
import fs from 'fs'
import path from 'path'
import { AppChannel } from '../common/app-channel.enum'

export const scanFolder = (folderPath: string, mainWindow: BrowserWindow) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err)
      return
    }

    if (!global.scanning) {
      return
    }

    files.forEach((file) => {
      if (!global.scanning) {
        return
      }
      const filePath = path.join(folderPath, file)
      const stats = fs.statSync(filePath)
      console.log('filePath', filePath)

      if (stats.isDirectory()) {
        mainWindow.webContents.send(AppChannel.SaveFolder, {
          filePath
        })
        scanFolder(filePath, mainWindow)
      } else {
        mainWindow.webContents.send(AppChannel.SaveFile, {
          filePath
        })
        if (filePath.endsWith('.mp4')) {
          mainWindow.webContents.send(AppChannel.SaveMovie, {
            filePath
          })
        }
      }
    })
  })
}
