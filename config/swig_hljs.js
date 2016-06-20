var hljs = require('highlight.js');

exports.parse = function (str, line, parser, types, options) {
    parser.on(types.STRING, function (token) {
        // strip quote or double quote, they _also_ get matched
        var hlLanguage = token.match.replace(/^("|')|("|')$/g, '');
        // check if language is supported
        if (hljs.getLanguage(hlLanguage) !== undefined) {
            this.out.push(hlLanguage);
        } else {
            throw new Error('Unsupported code-highlight "' + hlLanguage + '" on line ' + line + '.');
        }
    });

    return true;
};

exports.compile = function(compiler, args, content, parents, options, blockName) {
    var highlightCompileStrings = [
        {
            compile: '  var __tpl = _ext.hljs.highlightAuto(_output);\n',
            include: "  __o += '<pre><code class=\"hljs ' + (__tpl.language || '') + '\">' + __tpl.value + '</code></pre>';\n"
        },
        {
            compile: "  var __tpl = _ext.hljs.highlight('" + args[0] + "', _output);\n",
            include: "  __o += '<pre><code class=\"hljs " + args[0] + "\">' + __tpl.value + '</code></pre>';\n"
        }
    ];

    var chosen = highlightCompileStrings[0]; // no language specified
    if (args.length > 0) {
        chosen = highlightCompileStrings[1];
    }

    return '(function () {\n' +
        '  var __o = _output;\n' +
        '  _output = "";\n' +
        compiler(content, parents, options, blockName).replace(/"\\n/, '"').replace(/\\n"/, '"') + '\n' +
        chosen.compile +
        chosen.include +
        '  _output = __o;\n' +
        '})();\n';
};

exports.ends = true;
exports.block = false;

exports.ext = {
    name: 'hljs',
    obj: hljs
};

exports.apply = function (swig) {
    swig.setExtension(exports.ext.name, exports.ext.obj);
    swig.setTag('highlight', exports.parse, exports.compile, exports.ends, exports.block);
};
