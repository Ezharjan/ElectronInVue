import { read } from "fs";

// preload.js 中使用nodejs
const { readFileSync, write } = require('fs')
const { readFile } = require('fs')
const { writeFile } = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');




const readConfig = function () {
    console.log("%%%%%%%%%%%%%%%%%");
    const data = readFileSync('D:/myText.txt')
    return data
};



const writeFileConfig = function (_path, anythingUWanaWrite) {

    writeFile(_path, anythingUWanaWrite, function () {
        console.log("OK!");
    });
};




(window as any).reader = this.readConfig();
(window as any).writer = this.writeConfig();


// index.html 后加载的内容可以使用window.readConfig()方法，但不能使用Node.js特性
// console.log(window.readConfig()) // 正常执行
// console.log(readFileSync('./config.json')) // 报错