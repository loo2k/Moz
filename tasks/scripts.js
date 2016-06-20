/**
 * 处理脚本任务
 * @author lukezhu
 * @date 2016-03-24
 */

module.exports = function(gulp, $, conf, browserSync) {
    gulp.task('scripts',function() {
        return gulp.src(conf.parsePwd(conf.scriptFiles))
            .pipe($.if(!conf.isProduction, $.sourcemaps.init()))
            .pipe($.if(conf.isProduction, $.uglify()))
            .pipe($.if(!conf.isProduction, $.sourcemaps.write()))
            .pipe(gulp.dest(conf.parsePwd([conf.tmp, '/js'].join(''))))
            .pipe(browserSync.stream());
    });
}
