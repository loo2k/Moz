/**
 * 处理脚本任务
 * @author lukezhu
 * @date 2016-03-24
 */

var combiner = require('stream-combiner2');

module.exports = function(gulp, $, conf, browserSync) {
    var gs = $.sync(gulp);
    // 开发任务 gulp --dev
    gulp.task('serve', gs.sync([
        'clean:tmp',
        ['scripts', 'styles', 'template']
    ]), function() {
        // 监听样式文件变化
        gulp.watch(conf.parsePwd(conf.stylesFiles4Watch), ['styles'])
            .on('change', function(evt) { conf.changeHandler(evt); });

        // 监听脚本文件变化
        gulp.watch(conf.parsePwd(conf.scriptFiles), ['scripts'])
            .on('change', function(evt) { conf.changeHandler(evt); });

        // 监听模版文件变化
        gulp.watch(conf.parsePwd(conf.tmplFiles4Watch), ['template'])
            .on('change', function(evt) { conf.changeHandler(evt); });

        // 启动本地调试服务器
        browserSync.init({
            ui: false,
            open: "external",
            startPath: conf.serve.open,
            port: conf.serve.port,
            notify: false,
            server: {
                baseDir: conf.parsePwd([conf.tmp, conf.app]),
                index: conf.serve.index
            }
        })
    });

    // 发布任务 gulp build
    gulp.task('build', gs.sync([
        ['clean:tmp', 'clean:dist'],
        ['scripts', 'styles', 'template', 'copy:tmp'],
        'copy:dist'
    ]));
}
