/**
 * 自动 FTP 部署任务
 * @author lukezhu
 * @date 2016-03-24
 */

var combiner = require('stream-combiner2');
var vfs      = require('vinyl-fs');
var vftp     = require('vinyl-ftp');
var vpath    = require('vinyl-paths');
var readline = require('readline-sync');

module.exports = function(gulp, $, conf) {
    gulp.task('deploy', function() {
        if (conf.ftp.pass === '') {
            conf.ftp.pass = readline.question('Type your ftp server\'s password: ');
        }

        // ftp 配置信息
        var ftpSvr = vftp.create({
            host     : conf.ftp.host,
            user     : conf.ftp.user,
            password : conf.ftp.pass,
            port     : conf.ftp.port,
            parallel : 5,
            log      : $.util.log,
        });

        vfs.src([conf.parsePwd([conf.dist, '/**'].join(''))], { buffer: false })
            .pipe(ftpSvr.dest(conf.ftp.path));
    });
}
