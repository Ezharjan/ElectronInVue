# electron-in-vue

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

------







## Project Tutorial

### 1. Create project:

```
vue create my-project
```



### 2. Go into the project root

```
cd my-project
```



### 3. Install dependancies:

```
npm install
```



### 4. Run in browser to check:

```
npm run serve
```



### 5. Git commit this repository:

```
git add .

git commit -m "vue initiated"

git remote add origin ****.git

git push -u origin master
```



### 6. Add electron-builder plugin:

```
vue add electron-builder
```



### 7. Choose the needed version of the electron-builder plugin.



### 8. Check whether the plugin works well both in electron-exe type and in web browser:

```
npm run electron:serve
```



### 9. To use the methods and packs of Node.js, Create vue.config.js in the root folder of the project and add the code below:

```javascript
module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            // Or, for multiple preload files:
            // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
            preload: { preload: 'src/preload.js' }
        }
    }
}
```



### 10.  As  is mentioned in the code shown above, create preload.js file in the projects' src folder to use the methods and functions and properties of Node.js in  it, for example:

```javascript
// preload.js 中使用nodejs
const { readFileSync, write } = require('fs');
const { readFile } = require('fs');
const { writeFile } = require('fs');

window.readConfig = function(filePath) {
    console.log("File has been successfully read!");
    const data = readFileSync(filePath);
    return data;
}


window.writeFileConfig = function(_path, anythingUWanaWrite) {
        writeFile(_path, anythingUWanaWrite, function() {
            console.log("File written done!");
        });
    }
	//Below is the reference of the code above
    // fs.writeFile(_path, "electron + Javascript", function (err) {
    //     if (!err)
    //         console.log("写入成功！");
    // });

// index.html 或其他vue脚本后加载的内容可以使用window.readConfig()方法，但不能使用Node.js特性
// console.log(window.readConfig()) // 正常执行
// console.log(readFileSync('./config.json')) // 报错
```



### 11. You can use *window.writeFileConfig(yourLocalPath,"Somthing you want to write")* in any *.vue file ot *.html file  rather than using directly the  original native methods of Node.js, for example:

```vu

```





create background.js file in src folder and add the code below:

```javascript
'use strict'
import path from 'path'
import { app, protocol, BrowserWindow } from 'electron'
import {
    createProtocol,
    /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
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
app.on('ready', async() => {
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
```

8. 
