var cp     = require('child_process');
var pkg    = require('./package.json');
var file   = require('file-utils');
var path   = require('path');
var semver = require('semver');
var colors = require('colors');
var moment = require('moment');

var updateFile = path.resolve(__dirname, './update.json');
var updateInfo = { timestamp: 0 };
var updateTime = moment().unix();

// 禁用 file-utils 日志
file.option('logger', { warn: function() {}, write: function() {} });

// 如果有更新信息文件则加载
if (file.exists(updateFile)) {
    updateInfo = require(updateFile);
}

// 超过一天则检查更新
if (updateTime - updateInfo.timestamp > 86400) {

    var args = [
        'info',
        'moz',
        'version',
        '--registry=https://registry.npm.taobao.org'
    ];
    var result = cp.spawnSync('npm', args, { timeout: 1000 });
    if (!result.error) {
        var currentVer = pkg.version;
        var latestVer  = result.stdout.toString().trim();

        if (semver.neq(currentVer, latestVer)) {
            showUpdateHint(currentVer, latestVer);
        }
    }

    // 写入更新记录
    file.write(updateFile, JSON.stringify({timestamp: updateTime}));
}

// 显示更新提示
function showUpdateHint(currentVer, latestVer) {
    console.log('');
    console.log('目前 Moz 最新版本为 %s, 当前版本为 %s, 建议升级到最新版本 :)', latestVer.green, currentVer.red);
    console.log('升级命令: $ %s', 'npm install -g moz'.green);
    console.log('');
}
