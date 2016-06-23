/**
 * 处理脚本任务
 * @author lukezhu
 * @date 2016-03-24
 */

module.exports = function(gulp, $, conf, browserSync) {
    gulp.task('scripts',function() {
        var compress = conf.build.compress !== true ? !!conf.build.compress.js : true;
        return gulp.src(conf.parsePwd(conf.scriptFiles), { base: conf.parsePwd(conf.app) })
            .pipe($.if(!conf.isProduction, $.sourcemaps.init()))
            .pipe($.if(conf.isProduction && compress, $.uglify()))
            .pipe($.if(!conf.isProduction, $.sourcemaps.write()))
            .pipe(gulp.dest(conf.parsePwd(conf.tmp)))
            .pipe(browserSync.stream());
    });
}
