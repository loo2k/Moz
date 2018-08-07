/**
 * 处理样式任务
 * @author lukezhu
 * @date 2016-03-24
 */

const est = require('less-plugin-est');
const LessFuntion = require('less-plugin-functions');
const estPlugin = new est();
const LessFuntionPlugin = new LessFuntion();

module.exports = function(gulp, $, conf, browserSync) {
    gulp.task('styles', function() {
        var compress = conf.build.compress !== true ? !!conf.build.compress.css : true;
        var styleFiles = process.env.styleFile ? process.env.styleFile : conf.parsePwd(conf.styleFiles);
        return gulp.src(styleFiles, { base: conf.parsePwd(conf.app) })
            .pipe($.if(!conf.isProduction, $.sourcemaps.init()))
            .pipe($.less({javascriptEnabled: true, plugins: [LessFuntionPlugin, estPlugin]}))
                .on('error', conf.errorHandler('Less'))
            .pipe($.autoprefixer({
                cascade: false,
                browsers: [
                    "last 1 version",
                    "> 1%",
                    "IE 9"
                ]
            }))
                .on('error', conf.errorHandler('Autoprefixer'))
            .pipe($.if(conf.isProduction && compress, $.cleanCss({compatibility: 'ie7'})))
            .pipe($.if(!conf.isProduction, $.sourcemaps.write()))
            .pipe(gulp.dest(conf.parsePwd(conf.tmp)))
            .pipe(browserSync.stream());
    });
}
