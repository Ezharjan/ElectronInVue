//This file loads only the preloadable things
//Move this file into the dist_electron folder when you want to run the code below in electron

// preload.js 中使用nodejs
const { readFileSync } = require('fs');
const { writeFile } = require('fs');

var NeDB = require('nedb');
var db = new NeDB({
    filename: './user.db',
    autoload: true,
});



window.readConfig = function(filePath) {
    console.log("File has been successfully read!");
    const data = readFileSync(filePath);
    return data;
};


window.writeFileConfig = function(filePath, anythingUWanaWrite) {
    writeFile(filePath, anythingUWanaWrite, function() {
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


/*
(window as any).insertInfo = function (nameToInsert = 'Alexander', ageToInsert = 25, rankToInsert = 1) {
    db.insert({
        name: nameToInsert,
        age: ageToInsert,
        rank: rankToInsert,
    }, function (err, doc) {
        console.log('inserted:', doc)
    });
};

(window as any).findInfo = function (nameToFind = 'Alexander') {
    db.find({
        name: nameToFind,
    }, function (err, docs) {
        console.log(nameToFind + ' found:', docs)
    });
}; */