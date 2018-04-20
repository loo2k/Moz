/**
 * 处理 rollup 脚本
 * @author lukezhu
 * @date 2018-04-20
 */
const path = require('path')
const rollup = require('rollup')
const rollupEach = require('gulp-rollup-each')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const babelConfig = {
    babelrc: false,
    presets: [[require('babel-preset-env'), {
        modules: false
    }]]
}

module.exports = function(gulp, $, conf, browserSync) {
    gulp.task('rollup', () => {
        return gulp.src(conf.parsePwd(conf.es6Files), {base: conf.parsePwd(conf.app)})
            .pipe(rollupEach({
                plugins: [babel(babelConfig), commonjs(), resolve()],
                external: ['jquery']
            }, (file) => {
                return {
                    format: 'umd',
                    globals: { jquery: '$' },
                    name: path.basename(file.path, '.js')
                }
            }, rollup))
            .pipe(gulp.dest(conf.parsePwd(conf.tmp)))
            .pipe(browserSync.stream())
    })
}
