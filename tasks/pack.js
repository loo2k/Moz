/**
 * 打包任务
 * @author lukezhu
 * @date 2016-03-24
 */

var combiner = require('stream-combiner2');
var moment   = require('moment');

module.exports = function(gulp, $, conf) {
    // gulp pack 以时间为版本命名文件
    // gulp pack -v 1.1.0 可指定版本号
    gulp.task('pack', function() {
        var version = $.util.env.v ? $.util.env.v : moment().format('YYMMDDHHmm');
        var packageName = [conf.name, version].join('_');

        var combined = combiner.obj([
            gulp.src([
                conf.parsePwd([conf.dist, '/**/*'].join(''))
            ]),
            $.zip([packageName, 'zip'].join('.')),
            gulp.dest(conf.parsePwd(conf.package))
        ]);

        combined.on('error', console.error.bind(console));

        combined.on('end', function() {
            $.util.log(['Package Success: ', packageName, '.zip has been created on ', conf.package].join(''));
        });

        return combined;
    });
}
