'use strict'

import path from 'path';

import { app, protocol, BrowserWindow } from 'electron';
import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800, height: 600, webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: (process.env
      // .ELECTRON_NODE_INTEGRATION as unknown) as boolean
      nodeIntegration: true
    }
  }
  );
  // preload: path.join(__dirname, 'preload.ts');



  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


export function SayHello() {
  return 'hello';
}


// import readFileSync from 'fs';
// import writeFile from 'fs';
// preload.js 中使用nodejs
// const { readFileSync } = require('fs');
// const { writeFile } = require('fs');


/*
export default {
  MyClass() {
    const readConfig = function (filePath: string) {
      // globalThis.readConfig = function (filePath: string) {
      // window.readConfig = function (filePath: string) {
      // console.log("File has been successfully read!");
      // const data = readFileSync(filePath);
      // return data;
      return 'jj';
    };


    const writeFileConfig = function (filePath: string, anythingUWanaWrite: string) {
      // globalThis.writeFileConfig = function (filePath: string, anythingUWanaWrite: string) {
      // writeFile(filePath, anythingUWanaWrite, function () {
      //   console.log("File written done!");
      // });
      return 'kk';
    };
    //Below is the reference of the code above
    // fs.writeFile(_path, "electron + Javascript", function (err) {
    //     if (!err)
    //         console.log("写入成功！");
    // });

    // index.html 或其他vue脚本后加载的内容可以使用window.readConfig()方法，但不能使用Node.js特性
    // console.log(window.readConfig()) // 正常执行
    // console.log(readFileSync('./config.json')) // 报错
  }
} */