const { app, BrowserWindow, Menu, shell, ipcMain} = require('electron');
const path = require('path');

let win;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  //win.webContents.openDevTools();
  win.loadFile('src/index.html');

  const menu = Menu.buildFromTemplate([
      {
          label : 'Menu',
          submenu : [
              {label : 'Adjust Notification Value'},
              {type:'separator'},
              {
                  label : 'Coin MarketCap',
                  click() {
                      shell.openExternal("https://coinmarketcap.com");
                  }
              },
              {type:'separator'},
              {
                  label : 'Exit',
                  click() { app.quit(); }
              }
          ] 
      }
  ]);

  Menu.setApplicationMenu(menu);
  return win;

}

app.whenReady().then(() => {win = createWindow();});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('main:add', event => {
  const modalPath = path.join('File://', __dirname, 'src/add.html')
  let win = new BrowserWindow({
      width: 400, height: 200,
      frame: false, transparent: true, alwaysOnTop : true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      }
    });

  win.on('close', function() { win=null; });
  win.loadURL(modalPath);
  win.show();

});


ipcMain.on('update-notify-value', (event, arg) => {
  win.webContents.send('targetPriceVal', arg);
});

