### 简介

banner宣传页是H5主要的营销方式，banner页主要是由一张背景图片构成，有时会添加若干链接，为简化这个开发步骤，遂写了这个小程序，用于快速生成前端代码。

### 安装

```
    npm install
```

### 使用

项目结构如下图，每个项目都需一个配置文件和一张背景图片。

```
    |—— src
    |   |—— blog
    |   |   |—— <背景图片>
    |   |   |—— config.json
```

创建项目的方式有两种，命令行创建和手动创建

###### 命令行创建一个项目

执行`node create`，命令行会提示你输入相关参数，如下：

```
    项目名称:  
    banner页标题:  (博客)
    背景色:  (#fff)
    背景图片:  (bg.jpg)
    点击区域id:
    点击区域链接:  (https://love-yoyo.github.io/blog/)
    点击区域样式名:  (click-area)
    点击区域宽度:  (0)
    点击区域高度:  (0)
    点击区域距图片头部长度:  (0)
    点击区域距图片左边长度:  (0)
```

`项目名称`必填，其余的参数选填，括号中是默认参数

###### 手动创建项目

在src目录下新建一个文件夹，比如添加了一个名为`blog`的项目。同时添加一张背景图片和`config.json`文件。

背景图片尽量选择在1M以下的图片

###### config.json配置文件说明

`config.json`参数说明：

* title : banner页的标题，String，可选，默认为`博客`
* bgColor : banner主页的背景色，String，可选，默认为`#fff`
* bgImg : 背景图片对象
    * src : 背景图片名称，String，可选，默认为`bg.jpg`
* links : 点击区域，一个数组
    * id : 点击域的id，String，可选
    * href : 点击域的链接地址，String，可选，默认为`https://love-yoyo.github.io/blog/`
    * className : 点击域的样式名，String，可选，默认为`click-area`
    * width : 点击域的宽度，String，可选，默认为`0`
    * height : 点击域的高度，String，可选，默认为`0`
    * top : 点击域的距离图片头的距离，String，可选，默认为`0`
    * left : 点击域的距离左边的距离，String，可选，默认为`0`
    * otherStyle : 点击域的样式，[String]，可选

`config.json`示例：

```
    {
        "title": "博客",
        "bgColor": "#b0dafd",
        "bgImg": {
            "src": "bg.png"
        },
        "links": [{
            "id": "",
            "href": "https://love-yoyo.github.io/blog/",
            "className": "hot-area",
            "height": "160",
            "width": "160",
            "top": "316",
            "left": "226",
            "otherStyle": [
                "color: red",
                "border: 1px solid red"
            ]
        }]
    }

    如果otherStyle的值为一个数组，不为空，那main.html的css代码为
    .hot-area {
        ...
        color: red;
        border: 1px solid red;
    }
```

