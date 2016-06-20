/**
 * 处理样式任务
 * @author lukezhu
 * @date 2016-03-24
 */

module.exports = function(gulp, $, conf, browserSync) {
    gulp.task('styles', function() {
        var autoprefixerOpts = { browsers: ['> 1%', 'IE 7'] };

        return gulp.src(conf.parsePwd(conf.styleFiles))
            .pipe($.if(!conf.isProduction, $.sourcemaps.init()))
            .pipe($.less()).on('error', conf.errorHandler('Less'))
            .pipe($.autoprefixer(autoprefixerOpts)).on('error', conf.errorHandler('Autoprefixer'))
            .pipe($.cleanCss())
            .pipe($.if(!conf.isProduction, $.sourcemaps.write()))
            .pipe(gulp.dest(conf.parsePwd([conf.tmp, '/css'].join(''))))
            .pipe(browserSync.stream());
    });
}
