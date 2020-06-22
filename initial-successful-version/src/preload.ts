// preload.js 中使用nodejs
const { readFileSync, write } = require('fs')
const { readFile } = require('fs')
const { writeFile } = require('fs');
const { hasUncaughtExceptionCaptureCallback } = require('process');


this.readConfig = function() {
    // const data = readFileSync('./config.json')
    console.log("%%%%%%%%%%%%%%%%%");
    const data = readFileSync('D:/myText.txt')
    return data
}



this.writeFileConfig = function(_path, anythingUWanaWrite, my_callback) {

        writeFile(_path, anythingUWanaWrite, function() {
            console.log("OK!");
        });
    }
    // fs.writeFile(_path, "electron + Javascript", function (err) {
    //     if (!err)
    //         console.log("写入成功！")
    // })

// index.html 后加载的内容可以使用window.readConfig()方法，但不能使用Node.js特性
// console.log(window.readConfig()) // 正常执行
// console.log(readFileSync('./config.json')) // 报错