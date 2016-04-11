title: 前端部署流程
speaker: fuyun.zhao
url: https://github.com/holyzfy/febu
transition: move
files: /style/ppt.css
theme: light

[slide]

# 前端部署流程
## [<i class="fa fa-github"></i>febu](https://github.com/holyzfy/febu)
fuyun.zhao

[slide]

## 目录
----
* 相关前端优化规则
* febu部署流程
* 约定规则

[slide]

## 相关前端优化规则
---
* 减小文件大小：min, gzip {:&.fadeIn}
* 减少HTTP请求数
* 静态资源缓存：域名分区，缓存，禁cookie

[slide]

## febu部署流程
---
* 发布到测试环境
* 发布到生产环境

[slide]

## 发布到测试环境
---
<iframe data-src="http://cdn.rawgit.com/holyzfy/d648767580c9c3daafda/raw/3c94ea5f0ff855a50448817f2b8040819a5bd651/febu_development.svg" src="about:blank;"></iframe>
[查看大图](http://cdn.rawgit.com/holyzfy/d648767580c9c3daafda/raw/3c94ea5f0ff855a50448817f2b8040819a5bd651/febu_development.svg)

[slide]

## 发布到生产环境
---
<iframe data-src="http://cdn.rawgit.com/holyzfy/d648767580c9c3daafda/raw/3c94ea5f0ff855a50448817f2b8040819a5bd651/febu_production.svg" src="about:blank;"></iframe>
[查看大图](http://cdn.rawgit.com/holyzfy/d648767580c9c3daafda/raw/3c94ea5f0ff855a50448817f2b8040819a5bd651/febu_production.svg)

[slide]

## 约定规则
---
**inc**：inc目录存放html碎片，html碎片里的静态资源路径是相对于仓库根目录 {: .align_left}

**js**：使用AMD规范的项目，约定模块名就是文件名，也就说js文件可以放到不同的目录里，但不能重名，示例：https://github.com/holyzfy/amd_demo  {: .align_left}

**生产环境**：模板文件里script，link标签可以使用以下属性 {: .align_left}

| 属性 | 描述 |
| :------- | :-------- |
| _group | 合并多个标签的外部资源 |
| _inline | 把静态资源的内容直接输出到页面 |
| _compress | 与_inline配合使用，打印压缩后的内容 |

[slide]

## _group示例
---
原始代码
```html
<link rel="stylesheet" href="style/common.css" _group="all">
<link rel="stylesheet" href="style/index.css" _group="all">
```
处理后
```html
<link rel="stylesheet" href="//img1.febucdn.com/my_project/style/all.f9e3196e67.css">
```

[slide]

## _inline和_compress示例
---
原始代码
```html
<script src="js/config.js" _inline _compress></script>
```
处理后
```html
<script>
require.config({waitSeconds:0,shim:{highcharts:["jquery"],highcharts_more:["highcharts"],url:{exports:"url"},"jquery.pagination":["jquery"],"jquery.event.drag":["jquery"],"jquery.validate":["jquery"],"jquery.validate_common":["jquery.validate"]},paths:{arttemplate:"//img1.febucdn.com/f2e/my_project/js/arttemplate-404a5647dd",common:"//img1.febucdn.com/f2e/my_project/js/common-77fc0b9010",detail:"//img1.febucdn.com/f2e/my_project/js/detail-35cbe12497"}});
</script>
```

[slide]

## End
---
<i class="fa fa-github"></i> https://github.com/holyzfy/febu
