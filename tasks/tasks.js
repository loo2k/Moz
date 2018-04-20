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
        ['scripts', 'styles', 'template'],
        ['rollup']
    ]), function() {
        // 监听样式文件变化
        $.watch(conf.parsePwd(conf.stylesFiles4Watch), function(evt) {
            conf.gwChangeHandler(evt);
            gulp.start('styles');
        });

        // 监听脚本文件变化
        $.watch(conf.parsePwd(conf.scriptFiles4Watch), (evt) => {
            conf.gwChangeHandler(evt)
            gulp.start(gs.sync(['scripts', 'rollup']));
        });
        // $.watch(conf.parsePwd(conf.scriptFiles4Watch), function(evt) {
        //     conf.gwChangeHandler(evt);
        //     gulp.start('scripts');
        // });

        // 监听模版文件变化
        $.watch(conf.parsePwd(conf.tmplFiles4Watch), function(evt) {
            conf.gwChangeHandler(evt);
            gulp.start('template');
        });

        // 启动本地调试服务器
        browserSync.init({
            ui: false,
            open: "external",
            startPath: conf.serve.open,
            port: conf.serve.port,
            notify: false,
            server: {
                baseDir: conf.parsePwd([conf.tmp, conf.app]),
                index: conf.serve.index,
                // Enable CORS
                middleware: function (req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                }
            }
        })
    });

    // 发布任务 gulp build
    gulp.task('build', gs.sync([
        ['clean:tmp', 'clean:dist'],
        ['scripts', 'styles', 'template'],
        ['rollup'],
        'copy:tmp',
        'copy:dist'
    ]));
}
