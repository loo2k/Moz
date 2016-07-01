module.exports = {
    name: '{{ name }}',
    serve: {
        port: 8808,
        index: 'index.html'
    },
    build: {
        hash: true,
        compress: {
            css: true,
            js: true
        }
    },
    ftp: {
        host: '',
        user: '',
        pass: '',
        path: '/'
    }
}
