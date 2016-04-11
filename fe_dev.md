title: 前后端分离实践
speaker: fuyun.zhao
transition: move
files: /style/ppt.css,/bower_components/mermaid/dist/mermaid.css,/bower_components/mermaid/dist/mermaid.min.js,/js/fe_dev.js
theme: light

[slide]

# 前后端分离实践
fuyun.zhao

[slide]

## 目录
-------
0. 为什么要分别开发
0. 前后端协作流程
0. 基于require.js的前端开发

[slide style="background-color: #F09609;"]

# 为什么要分别开发

[slide]

- 并行开发
- 独立测试
- 分别部署

[slide style="background-color: #1BA1E2;"]

# 前后端协作流程

[slide]

## 准备工作
-----
- 静态服务器
    - 开发 http://127.0.0.1/static/
    - 测试 http://10.xxx.xxx.28/static/f2e/
    - 生产 http://static.tcredit.com/
- 构建工具 [<i class="fa fa-github"></i> febu](https://github.com/holyzfy/febu)
    - 测试
    - 生产

[slide]

## 前端本地开发
------
## velocityServer

<span class="label label-primary">静态服务</span>
+
<span class="label label-primary">模板渲染</span>

------

- 路由结构：请后端在gitlab的wiki里填写
- 假数据
 - vm: 约定与模板文件同名的js文件为假数据
 - ajax: mock/path/to/xxx.json

[slide]

## 后端本地测试
--------
<div class="mermaid" style="height: 300px;">
graph LR
    git(前端git仓库) --> febu((febu))
    febu --> vm[vm/*]
    febu --> static[static/*]
    vm --> project[后端工程]
    static --> nginx[静态资源服务器<br>localhost]
</div>

写成shell脚本更方便操作

dev.sh {:.text_left.gray2}
```bash
cd path/to/febu
gulp development --repo [前端git仓库地址] --publicPath http://127.0.0.1/static/
cp -rf febu/data/development/xxx/static/* /path/to/local_nginx ## 复制静态资源
cp -rf febu/data/development/xxx/vm/* /path/to/project/vm ## 复制模板
```

[slide]


## 前后端联调
-------
<div class="mermaid" style="height: 300px;">
graph LR
    git(前端git仓库) --> febu((febu))
    febu --> vm[vm/*]
    febu --> static[static/*]
    vm --> project[后端测试机]
    static --> nginx[nginx<br>10.xxx.xxx.28]
</div>

qa.sh {:.text_left.gray2}

```
cd febu
gulp development --repo [前端git仓库地址]
rsync -vrtopg --progress febu/data/development/xxx/static/* user@10.xxx.xxx.28:/data/static/f2e/xxx
```

[slide]

## 上线
------
<div class="mermaid" style="height: 300px;">
graph LR
    git(前端git仓库) --> febu((febu))
    febu --> vm[vm/*]
    febu --> static[static/*]
    vm --> project[后端web服务器]
    static --> nginx[nginx<br>static.tcredit.com]
</div>

release.sh {:.text_left.gray2}

```
cd febu
gulp production --repo [前端git仓库地址]
```

剩下的事儿手工上传 :joy: ... {:.text_left.yellow}

[slide style="background-color: #A200FF;"]

# 基于require.js的前端开发

![require.js logo](http://requirejs.org/i/logo.png)

[slide]

## 传统的脚本管理
-----
demo.html {:.text_left.gray2}

```html
<script src="path/to/jquery.js"></script>
<script src="path/to/arttempate.js"></script>
<script src="path/to/dialog.js"></script>
<script>
dialog.success(message, callback);
</script>
```

- 缺点 {:&.fadeIn}
    - 命名污染（使用命名空间会好一些，但还不够） {:.red}
    - 需要手工维护依赖关系 {:.red}
    - 不方便按需加载 {:.red}

[slide]

## TODO {:.yellow}

- 不仅仅是文件级别的模板化 {:&.fadeIn}
- 限制变量作用域
- 依赖管理
- 按需加载

[slide]

## 常见的解决方案
-----
规范 | 使用场景
-----|-----
ES6 | [Babel](https://babeljs.io/)
AMD | [RequireJS](http://requirejs.org/)
CommonJS | [Node.js](https://nodejs.org/en/)

<br>

- 咱们选这个 :point_right: [RequireJS](http://requirejs.org/) {:&.bounceIn}

[slide]

## 定义一个模块 
-----
dialog.js {:.text_left.gray2}

```js
define(function(require) {
    // 引入依赖
    var $ = require('jquery');
    var template = require('arttemplate');
    
    var success = function(message, callback) {
        // ...
    };

    var fail = function(message, callback) {
        // ...
    };
    
    // 导出模块
    return {
        success: success,
        fail: fail
    };
});
```

[slide]

## 使用模块
------

demo.html {:.text_left.gray2}

```html
<html>
...
<body>
...
<script src="path/to/require.js"></script>
<script>
require.config({
    // ...
});
</script>
<script>
require(['dialog'], function(dialog) {
    dialog.success('提交成功', function callback() {
        // ...
    });
});
</script>
</body>
</html>
```




