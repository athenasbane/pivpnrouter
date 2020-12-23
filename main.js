const { app, BrowserWindow } = require('electron')
const path = require('path')

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 480,
    frame: false,
    kiosk: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

function hideCursor() {
  document.body.style.cursor = "none";
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

setTimeout(hideCursor, 1000)