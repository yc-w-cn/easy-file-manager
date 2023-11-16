import { AppChannel } from '../common/app-channel.enum'
import { BrowserWindow, ipcMain, dialog } from 'electron'
import { scanFolder } from './scanner'

export const addAppListeners = (mainWindow: BrowserWindow) => {
  global.scanning = false

  ipcMain.handle(AppChannel.SelectFolderPath, async () => {
    console.log(AppChannel.SelectFolderPath)
    return dialog.showOpenDialog({ properties: ['openDirectory'] })
  })

  ipcMain.handle(AppChannel.ScanFolder, async (_, scanPath: string) => {
    console.log(AppChannel.ScanFolder)
    global.scanning = true
    scanFolder(scanPath, mainWindow)
  })

  ipcMain.on(AppChannel.TerminalScanFolderProcess, () => {
    console.log(AppChannel.TerminalScanFolderProcess)
    global.scanning = false
  })
}
