//This file loads only the preloadable things
//Move this file into the dist_electron folder when you want to run the code below in electron

// preload.js 中使用nodejs
const { readFileSync } = require('fs');
const { writeFile } = require('fs');


// declare var window: Window & typeof globalThis;
// declare namespace window {
//     interface readFile {
//         myFunction(filePath: string): void;
//     }
// }


// same as `import module "fs"`
const fs = require("fs");

// same as `export function readFile`
module.exports.readFile = function (f) {

    console.log('hello worrld');

    return fs.readFileSync(f);
}



// (window as any).readConfig = function (filePath: string) {
dunyah.readConfig = function (filePath) {
    // globalThis.readConfig = function (filePath: string) {
    // window.readConfig = function (filePath: string) {
    console.log("File has been successfully read!");
    const data = readFileSync(filePath);
    return data;
};


dunyah.writeFileConfig = function (filePath, anythingUWanaWrite) {
    // globalThis.writeFileConfig = function (filePath: string, anythingUWanaWrite: string) {
    writeFile(filePath, anythingUWanaWrite, function () {
        console.log("File written done!");
    });
};
//Below is the reference of the code above
// fs.writeFile(_path, "electron + Javascript", function (err) {
//     if (!err)
//         console.log("写入成功！");
// });

// index.html 或其他vue脚本后加载的内容可以使用window.readConfig()方法，但不能使用Node.js特性
// console.log(window.readConfig()) // 正常执行
// console.log(readFileSync('./config.json')) // 报错
