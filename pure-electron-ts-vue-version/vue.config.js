/* const electron = require('electron');


module.exports = {
    install: function(Vue) {
        Object.defineProperties(Vue.prototype, {
            $electron: {
                get() {
                    return electron;
                },
            },
        });
    },
} */

module.exports = {
    // 创建多窗口应用
    pages: {
        index: {
            // 文件的入口，一般为vue的main.js 文件
            entry: 'src/main.js',
            // 模板的来源，可以是HTML文件，即你该项目的出口文件
            template: 'public/index.html',
            // filename，打包完成后作为什么文件输出
            filename: 'index.html',
            // 设置文件的主入口
            chunks: ['main', 'chunk-vendors', 'chunk-common', 'index'],
            // title: 当使用title选项时，template中的title标签需要是<title><%=htmlWebpackPlugin.optons.title %></title>
            title: '******'
        },
        email: {
            entry: 'src/email.js',
            template: 'pubilc/email.html',
            filename: 'email.html',
            chunks: ['chunk-vendors', 'chunk-common', 'email'],
            title: '****'
        }
    },
    // 添加插件的配置
    pluginOptions: {
        // electron-builder的配置文件
        electronBuilder: {
            builderOptions: {
                files: [{
                    'filter': ['**/*']
                }],
                extraFiles: ['./extensions/'],
                // 应用名称
                productName: '私塾钉钉',
                // 版权
                copyright: 'Copyright © 私塾国际学府',
                appId: 'com.sishucuefu.sscloud',
                compression: "maximum",
                publish: [{
                    provider: 'generic',
                    url: 'http://windows.sishuxuefu.com/download',
                    channel: 'latest'
                }],
                // 是否打包加密
                asar: true,
                // 项目打包生成的文件目录
                directories: {
                    output: 'build'
                },
                // window的icon头标
                win: {
                    icon: 'pubilc/icon.ico'
                },
                // 是否静默安装
                nsis: {
                    oneClick: false,
                    allowToChangeInstallationDirectory: true
                }
            },
            // 渲染线程的配置文件
            chainWebpackRendererProcess: config => {
                // 渲染线程的一些其他配置
            },
            // 主入口文件
            mainProcessFile: 'src/main/main.js',
            mainProcessWatch: ['src/main'],
            mainProcessArgs: []
        }
    },
    // 打包时不生成.map文件，减少体积，加快速度如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'src/renderer/static',
    // 跨域配置
    devServer: {
        disableHostCheck: true
    },
    // css 样式
    css: {}
}