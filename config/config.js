var _      = require('underscore');
var path   = require('path');
var gutil  = require('gulp-util');
var file   = require('file-utils');
var moment = require('moment');
var colors = require('colors');

var pathConf = {
    app     : 'app',
    tmp     : '.tmp',
    dist    : 'dist',
    package : 'package'
}

var config = {

    // 项目名称
    name: 'Moz',

    // 调试服务器配置
    serve: {
        port: 8099,
        open: '/',
        index: 'index.html'
    },

    // 编译配置
    build: {
        hash: true,
        compress: {
            css: true,
            js: true
        },
        templateVars: {}
    },

    // 发布服务器配置
    ftp: {
        host: '',
        user: '',
        pass: '',
        port: 21,
        path: '/'
    },

    // 开发文件目录
    app               : pathConf.app,

    // 临时文件目录
    tmp               : pathConf.tmp,

    // 编译文件目录
    dist              : pathConf.dist,

    // 打包文件目录
    package           : pathConf.package,

    // 需要复制的静态文件
    staticFiles       : [
        path.join(pathConf.app, '/fonts/**/*'),
        path.join(pathConf.app, '/images/**/*'),
        path.join(pathConf.app, '/media/**/*'),
        path.join(pathConf.app, '/css/**/*.css')
    ],

    // 需编译样式文件
    styleFiles        : [
        path.join(pathConf.app, '/css/*.less'),
        path.join('!', pathConf.app, '/css/_*.less')
    ],

    // 需编译模版文件
    tmplFiles         : [
        path.join(pathConf.app, '/*.html'),
        path.join('!', pathConf.app, '/_*.html')
    ],

    // 脚本文件
    scriptFiles       : [
        path.join(pathConf.app, '/js/**/*.js'),
        path.join('!', pathConf.app, '/js/**/_*.js')
    ],

    // 需监听的样式文件
    stylesFiles4Watch : [
        path.join(pathConf.app, '/css/**/*.less')
    ],

    // 需监听的模版文件
    tmplFiles4Watch   : [
        path.join(pathConf.app, '/**/*.html')
    ],

    // 需要监听的脚本文件
    scriptFiles4Watch: [
        path.join(pathConf.app, '/js/**/*.js')
    ],

    // 需要 ES6 模块支持的文件
    es6Files: [],

    // rev 需要拷贝的文件
    revFiles          : path.join(pathConf.tmp, '/**/*'),

    // rev 需要忽略的文件
    revIgnore         : [
        /^\/favicon.ico$/ig,
        /^\/js\/vendor\//ig
    ],

    // rev 需要忽略重命名文件
    revIgnoreRename   : [
        '.html'
    ],

    // rev 不需要在这个文件检索替换
    revIgnoreSearch   : [],

    // rev 不需要更新他的版本的文件
    revIgnoreUpdate   : [
        '.html'
    ],

    // 判断是否为生产环境
    isProduction      : process.argv[2] !== 'serve',

    // 错误处理函数
    errorHandler: function(title) {
        return function(err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    },

    // 处理文件变化事件
    // 高亮显示变化的文件
    changeHandler: function(evt) {
        var file = evt.path.split('/');
        var filename = file[file.length - 1];
        gutil.log('File:', gutil.colors.cyan(filename), 'was', gutil.colors.magenta(evt.type));
    },

    // gulp-wather 回调处理器
    gwChangeHandler: function(evt) {
        var file = evt.path.split('/');
        var filename = file[file.length - 1];
        gutil.log('File:', gutil.colors.cyan(filename), 'was', gutil.colors.magenta(evt.event));
    },

    // 解析运行环境的目录
    parsePwd: function(pwd) {
        var parsedPwd;
        if (Array.isArray(pwd)) {
            parsedPwd = [];
            pwd.forEach(function(dir, index) {
                if (dir.substr(0, 1) === '!') {
                    parsedPwd.push(path.join(dir.substr(0, 1), process.env.pwd, dir.substr(1)));
                } else {
                    parsedPwd.push(path.join(process.env.pwd, dir));
                }
            });
        } else {
            if (pwd.substr(0, 1) === '!') {
                parsedPwd = path.join(pwd.substr(0, 1), process.env.pwd, pwd.substr(1));
            } else {
                parsedPwd = path.join(process.env.pwd, pwd);
            }
        }

        return parsedPwd;
    }
}

// 获取用户的配置文件
if (file.exists( config.parsePwd('moz.config.js') )) {
    config = _.extend(config, require( config.parsePwd('moz.config.js') ));
}

module.exports = config;
