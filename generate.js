var fse = require('fs-extra');
var path = require('path');
var gulp = require('gulp');
var template = require('gulp-template');
var rimraf = require('rimraf');
var sizeOf = require('image-size');
var yaml = require('js-yaml');
var argv = require('optimist').argv;

var projectName = '';

if (!argv.p) {
    console.log('请输入参数：-p   例如：node generate -p blog ');
    return
} else {
    if ((typeof argv.p)== 'boolean') {
        console.log('请输入参数：-p   例如：node generate -p blog ');
        return
    }

    if (!fse.existsSync(path.join('./src', argv.p))) {
        console.log('项目不存在:' + path.join('./src', argv.p));
        return
    }

    projectName = argv.p;
}

//clean dist folder
rimraf.sync(path.join("./dist", "**"));

try {
    var cfgConst = yaml.safeLoad(fse.readFileSync('./config.yml', 'utf8'));
    // console.log(cfgConst);
} catch (e) {
    console.log(e);
}

var toPercent = function(num) {
    num = num * 100;
    num = num.toFixed(2);
    return '' + num + '%';
}

var caculateScale = function(config, imgSize) {
    var imgWidth = imgSize.width;
    var imgHeight = imgSize.height;
    console.log('image size: ' + imgWidth + "*" + imgHeight);

    config.title = config.title || cfgConst.title;
    config.bgColor = config.bgColor || cfgConst.bgColor;
    config.bgImg.src = config.bgImg.src || cfgConst.bgImg.src;

    for (var i = 0; i < config.links.length; i++) {
        var link = config.links[i];

        link.href = link.href || cfgConst.link.href;
        link.className = link.className || cfgConst.link.className;
        link.top = link.top || cfgConst.link.top;
        link.left = link.left || cfgConst.link.left;
        link.width = link.width || cfgConst.link.width;
        link.height = link.height || cfgConst.link.height;

        link.top = toPercent(link.top / imgHeight);
        link.left = toPercent(link.left / imgWidth);
        link.width = toPercent(link.width / imgWidth);
        link.height = toPercent(link.height / imgHeight);
    }
    return config;
}


var generate = function(projectName) {

    var config = fse.readJsonSync(path.join('./src', projectName, 'config.json'), { throws: false });
    console.log(config);

    var imgSize = sizeOf(path.join('./src', projectName, config.bgImg.src));

    config = caculateScale(config, imgSize);

    gulp.src('./template/main.html')
        .pipe(template(config))
        .pipe(gulp.dest(path.join('./dist', projectName)));

    gulp.src([
            path.join('./src', projectName, '**'),
            '!' + path.join('./src', projectName, 'config.json ')
        ])
        .pipe(gulp.dest(path.join('./dist', projectName)));
}

generate(projectName);
