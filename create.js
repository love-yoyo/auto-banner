var fse = require('fs-extra');
var path = require('path');
var prompt = require('prompt');
var yaml = require('js-yaml');
var _ = require('lodash');

try {
    var doc = yaml.safeLoad(fse.readFileSync('./config.yml', 'utf8'));
    // console.log(doc);
} catch (e) {
    console.log(e);
}

var schema = {
    properties: {
        project: {
            description: "项目名称",
            message: '项目名称不能为空',
            conform: function(name) {
                return !!name
            },
            required: true
        },
        title: {
            description: "banner页标题",
            default: doc.title
        },
        bgColor: {
            description: "背景色",
            default: doc.bgColor
        },
        bgImg_src: {
            description: "背景图片",
            default: doc.bgImg.src
        },
        link_id: {
            description: "点击区域id",
            default: doc.link.id
        },
        link_href: {
            description: "点击区域链接",
            default: doc.link.href
        },
        link_className: {
            description: "点击区域样式名",
            default: doc.link.className
        },
        link_width: {
            description: "点击区域宽度",
            default: doc.link.width
        },
        link_height: {
            description: "点击区域高度",
            default: doc.link.height
        },
        link_top: {
            description: "点击区域距图片头部长度",
            default: doc.link.top
        },
        link_left: {
            description: "点击区域距图片左边长度",
            default: doc.link.left
        }

    }
};


var creatProject = function(cfg) {
    var _dir = './src/' + cfg.project;
    fse.ensureDirSync(_dir);
    delete cfg.project;
    cfg.links = [cfg.link];
    delete cfg.link;
    fse.writeJsonSync(_dir + '/config.json', cfg);
}

prompt.message = '';

prompt.start();

prompt.get(schema, function(err, result) {

    _.forEach(result, function(v0, k0) {
        k0 = k0.replace(/_/g, '.');
        _.set(doc, k0, v0);

    })

    if (!result) {
        return 
    }

    console.log('\n配置如下：');
    console.log(JSON.stringify(doc, null, 2));
    console.log('\n');

    prompt.get({
        properties: {
            isOK: {
                description: "上述参数是否正确？(y/n)",
                default: 'y'
            }
        }
    }, function(err, result) {
        if (result.isOK.toLowerCase().charAt(0) == 'y') {
            creatProject(doc);
        }
    })

});
