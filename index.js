const { app, BrowserWindow, Menu, MenuItem } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false
    }
  })
  win.loadFile('index.html');
  win.maximize();
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('web-contents-created', (e, contents) => {
  contents.on('new-window', (e, url) => {
    e.preventDefault();
    require('open')(url);
  });
  contents.on('will-navigate', (e, url) => {
    if (url !== contents.getURL()) e.preventDefault(), require('open')(url);
  });
});
/*
const template = [
  {
    label: app.name,
    submenu: [
      {
      role: 'about'
      }
    ]
  },

  {
    label: 'File',
    submenu: [
      {
        label: 'Save'
      }
    ]
  },

  {
     role: 'editMenu'
  },
  
  {
     role: 'viewMenu'
  },
  
  {
     role: 'windowMenu'
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
*/