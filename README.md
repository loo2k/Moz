## Moz

[![npm](https://img.shields.io/npm/dt/moz.svg?maxAge=2592000)](https://www.npmjs.com/package/moz)
[![Travis](https://img.shields.io/travis/loo2k/Moz.svg?maxAge=2592000)](https://travis-ci.org/loo2k/Moz)

## 关于 Moz

Moz 集成了前端开发中调试，构建，部署，编译等一系列开发流程，帮助开发者提高开发效率；

## 使用指北

### 安装

Moz 依赖于 Node，需先安装 [Node.js](https://nodejs.org/en/)（建议使用LTS版本，目前最新版本为4.4.5），然后通过`npm`安装  Moz。

```shell
npm install moz -g
```

### 初始化

```shell
moz init
```

在项目文件夹使用 moz 初始化项目，初始化完成之后将会生成 moz 项目的目录结构以及配置文件 `moz.config.js`。

#### 初始化目录结构
```shell
.
├── app                 // 开发文件文件夹
│   ├── css             // 样式文件 *.less *.css
│   │   ├── partials
│   │   └── vendor
│   ├── js              // 脚本文件夹
│   │   └── vendor
│   ├── fonts           // 字体文件夹
│   ├── images          // 图片文件夹
│   ├── media           // 媒体文件夹
│   ├── template        // 模版文件夹
│   └── index.html
└── moz.config.js       // Moz 配置文件
```

#### 初始化配置文件
```js
module.exports = {
    name: 'Moz',
    serve: {
        port: 8080, // 调试服务端口
        open: '/', // 默认打开路径
        index: 'index.html' // 默认索引文件
    },
    build: {
        hash: true, // 是否使用 hash 缓存
        compress: {
            css: true, // 是否启用 CSS 文件压缩
            js: true // 是否启用 JS 文件压缩
        }
    },
    ftp: {
        host: '', // FTP 服务器
        user: '', // FTP 账号
        pass: '', // FTP 密码（允许为空，为空则在运行时提示输入密码）
        path: '/' // FTP 上传路径
    }
}
```

*提示: `ftp.pass` 属性允许留空，在执行 `deploy` 任务时将提示输入密码 :P*

### 本地调试

```shell
moz serve
```

运行后将会在项目文件夹启动一个 `browser-sync` 的静态文件服务器，实时编译 `less` 和 `swig`模版并自动刷新。

### 编译静态文件

```shell
moz build
```

运行后会将可以发布的静态文件编译并拷贝到 `./dist` 文件夹内，如果开启了 `rev` 则会对静态资源文件加 hash 防止缓存。

### 发布静态文件

```shell
moz deploy
```

运行后会将 `./dist` 目录中的所有文件通过 FTP 上传到 `config.ftpPath` 指定的路径上。

### 打包静态文件

```shell
moz pack // moz_1510291305.zip

moz pack -v 1.0.1 // moz_1.0.1.zip
```

运行后会将 `./dist` 目录中的所有文件压缩成 zip 文件到 `./package` 中，方便存档备份。

zip 文件的命名方式默认以 `config.name_版本号.zip` 命名，`-v` 参数可以指定版本号，不指定版本号则以当前时间作为版本号。
