module.exports = {
    name: 'moztest',
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
