const PHPServer = require('php-server-manager');
const { Electron, shell } = require('electron');

const app = Electron.app;
const Menu = Electron.Menu;
const BrowserWindow = Electron.BrowserWindow;

const phpRuntime = new PHPServer({
  port: 5555,
  directory: __dirname + "/source",
  directives: {
    display_errors: 1,
    expose_php: 1
  }
});

let mainWindow;
function createWindow() {
  let runtimePromise = phpRuntime.run();

  mainWindow = new BrowserWindow({width: 1024, height: 600});
  mainWindow.loadURL('http://'+server.host+':'+server.port+'/');

  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    phpRuntime.close();
    mainWindow = null;
  })
}

function initializeWindow() {
  const Dimensions = {
      config.get('Electron.Width'),
      config.get('Electron.Height'),
  };

  let MainWindow = new BrowserWindow({})
}


app.on('ready', () => {
  if (process.platform === 'darwin') {
    var template = [{
      label: 'FromScratch',
      submenu: [{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() { app.quit(); }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:'
      }]
    }];
    var osxMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(osxMenu);
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow) // <== this is extra so commented, enabling this can show 2 windows..

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // PHP SERVER QUIT
    server.close();
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})