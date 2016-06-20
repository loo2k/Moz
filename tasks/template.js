/**
 * 处理模版任务
 * @author lukezhu
 * @date 2016-03-24
 */

var combiner = require('stream-combiner2');
var merge    = require('merge-stream');

module.exports = function(gulp, $, conf, browserSync) {
    // swig 配置信息
    // Docs: http://paularmstrong.github.io/swig/docs/
    var swighljs    = require('../config/swig_hljs.js');
    var swigLocals  = conf.build.templateVars;
    var swigOptions = {
        defaults : { cache: false, locals: swigLocals },
        data     : { page: {} },
        setup    : function(swig) {
            // 在 swig 模版引擎中增加 highlight 标签 用于高亮代码片段
            // Usage: {% highlight 'js' %}code...{% endhighlight %}
            swig.setExtension(swighljs.ext.name, swighljs.ext.obj);
            swig.setTag('highlight', swighljs.parse, swighljs.compile, swighljs.ends, swighljs.block);
        }
    }

    gulp.task('template', function() {
        var combined = combiner.obj([
            gulp.src(conf.parsePwd(conf.tmplFiles), { base: conf.parsePwd(conf.app) }),
            $.swig(swigOptions),
            gulp.dest(conf.parsePwd(conf.tmp)),
            browserSync.stream()
        ]);

        combined.on('error', console.error.bind(console));

        return combined;
    });
}
