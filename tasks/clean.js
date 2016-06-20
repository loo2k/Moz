/**
 * 清空编译目录任务
 * @author lukezhu
 * @date 2016-03-24
 */

var combiner = require('stream-combiner2');
var del      = require('del');

module.exports = function(gulp, $, conf) {
    // 清除发布目录
    gulp.task('clean:dist', function() {
        return new Promise(function(resolve, reject) {
            del(conf.parsePwd([conf.dist, '/**/*'].join('')), { force: true })
                .then(resolve)
                .catch(reject);
        });
    });

    // 清除临时目录
    gulp.task('clean:tmp', function() {
        return new Promise(function(resolve, reject) {
            del(conf.parsePwd([conf.tmp, '/**/*'].join('')), { force: true })
                .then(resolve)
                .catch(reject);
        });
    });
}
