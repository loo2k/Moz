/**
 * 处理样式任务
 * @author lukezhu
 * @date 2016-03-24
 */

module.exports = function(gulp, $, conf, browserSync) {
    gulp.task('styles', function() {
        var compress = conf.build.compress !== true ? !!conf.build.compress.css : true;
        return gulp.src(conf.parsePwd(conf.styleFiles))
            .pipe($.if(!conf.isProduction, $.sourcemaps.init()))
            .pipe($.less()).on('error', conf.errorHandler('Less'))
            .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
            .pipe($.if(conf.isProduction && compress, $.cleanCss({compatibility: 'ie7'})))
            .pipe($.if(!conf.isProduction, $.sourcemaps.write()))
            .pipe(gulp.dest(conf.parsePwd([conf.tmp, '/css'].join(''))))
            .pipe(browserSync.stream());
    });
}
