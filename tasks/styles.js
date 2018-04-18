/**
 * 处理样式任务
 * @author lukezhu
 * @date 2016-03-24
 */

est = require('less-plugin-est');
estPlugin = new est();

module.exports = function(gulp, $, conf, browserSync) {
    gulp.task('styles', function() {
        var compress = conf.build.compress !== true ? !!conf.build.compress.css : true;
        return gulp.src(conf.parsePwd(conf.styleFiles), { base: conf.parsePwd(conf.app) })
            .pipe($.if(!conf.isProduction, $.sourcemaps.init()))
            .pipe($.less({javascriptEnabled: true, plugins: [estPlugin]}))
                .on('error', conf.errorHandler('Less'))
            .pipe($.autoprefixer({ cascade: false }))
                .on('error', conf.errorHandler('Autoprefixer'))
            .pipe($.if(conf.isProduction && compress, $.cleanCss({compatibility: 'ie7'})))
            .pipe($.if(!conf.isProduction, $.sourcemaps.write()))
            .pipe(gulp.dest(conf.parsePwd(conf.tmp)))
            .pipe(browserSync.stream());
    });
}
