const electron = require('electron')
///const {ipcMan} = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const Menu = electron.Menu
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createMenu(){
  var menuTemplate = [{
    label:'文件',
    submenu:[
      {
        label:'重启',
        click:function(){
          app.relaunch();
          app.quit();
        }
      },{type:'separator'},
      {
        label:'退出',
        click:function(){
          app.quit();
        }
      }
    ]
  }
  /*,{
    label:'商品',
    submenu:[
      {
        label:'商品档案列表',
        click:function(){
          mainWindow.webContents.send('event-toolbar-toggled','show-add-product-info-list-win');
        }
      },
      {type:'separator'},
      {
        label:'添加商品档案',
        click:function(){
          // ipcMain.on('asynchronous-message', function (event, arg) {
          //   event.sender.send('asynchronous-reply', 'show-product-info-win');
          // })
          mainWindow.webContents.send('event-toolbar-toggled','show-add-product-info-win');
        }
      },
      {
        type:'separator'
      },
      {
        label:'商品分类',
        click:function(){
          // ipcMain.on('asynchronous-message', function (event, arg) {
          //   event.sender.send('asynchronous-reply', 'show-product-type-win');
          // })
          mainWindow.webContents.send('event-toolbar-toggled','show-product-type-win');

        }
      },{type:'separator'},
      {
        label:'商品供应商',
        click:function(){
          mainWindow.webContents.send('event-toolbar-toggled','show-supplier-win');
        }
      }
    ]
  }*/];
  var menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

function handleMessage(){
  ipcMain.on('asynchronous-message', function (event, arg) {
    //console.log(arg);
    createMenu();
    if(arg == 'user-login'){
      //createMenu();
    }else if(arg == 'user-logout'){
      app.relaunch();
      app.quit();
    }else if(arg == 'user-quit'){
      app.quit();e
    }
  })
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 640})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    //localStorage.clear();
  })
  mainWindow.maximize();
  //createMenu();
  // var menu = Menu.buildFromTemplate([]);
  // Menu.setApplicationMenu(menu);
  handleMessage();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
  mainWindow.webContents.send('event-app-exit','app-exit');

  //localStorage.clear();
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
