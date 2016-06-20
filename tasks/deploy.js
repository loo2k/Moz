/**
 * 自动 FTP 部署任务
 * @author lukezhu
 * @date 2016-03-24
 */

var combiner = require('stream-combiner2');
var vfs      = require('vinyl-fs');
var vftp     = require('vinyl-ftp');
var vpath    = require('vinyl-paths');

module.exports = function(gulp, $, conf) {
    // ftp 配置信息
    var ftpSvr = vftp.create({
        host     : conf.ftp.host,
        user     : conf.ftp.user,
        password : conf.ftp.pass,
        port     : conf.ftp.port,
        parallel : 5,
        log      : $.util.log,
    });

    gulp.task('deploy', function() {
        vfs.src([conf.parsePwd([conf.dist, '/**'].join(''))], { buffer: false })
            .pipe(ftpSvr.dest(conf.ftp.path));
    });
}
