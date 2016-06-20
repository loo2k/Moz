/**
 * gulpfile.js
 * @author lukezhu
 * @date 2016-03-24
 */

var fs          = require('fs');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var $           = require('gulp-load-plugins')();
var conf        = require('./config/config.js');

// 加载 gulp 任务
var tasks = fs.readdirSync('./tasks/');
tasks.forEach(function(task) {
    require('./tasks/' + task)(gulp, $, conf, browserSync);
});
