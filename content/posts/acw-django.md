---
title: "AcWing Django 框架课" # 标题
date: 2022-10-29T18:23:59+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- AcWing
- Django
- Projects
- 新技能
keywords: # 关键词
- Tech
- AcWing
- Django
- Projects
- 新技能
description: "" # 描述
weight: # 输入1可以顶置文章，用来给文章展示排序，不填就默认按时间排序
slug: ""
draft: false # 是否为草稿
comments: true # 是否展示评论
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: true # 顶部显示当前路径
cover:
    image: "" #图片路径 例：posts/tech/123/picture.png
    caption: "" # 图片底部描述
    alt: ""
    relative: false
---

- [AcWing Django 框架课 | Colopen's blog](https://www.colopen-blog.com/Engineer/acw_django/)
- [AcWing Django 框架课](https://www.acwing.com/activity/content/punch_the_clock/72/)
***
## [WarOfWarlock](https://github.com/Xancoding/WarOfWarlock)
### 搭建工具
- `HTML & CSS & JavaScript & Django`
### 参考资料
- [AcWing Django 框架课 | Colopen's blog](https://www.colopen-blog.com/Engineer/acw_django/)
- [AcWing Django框架课](https://www.acwing.com/activity/content/punch_the_clock/72/)
# Django 项目创建
- [2.1上课笔记 | 栎](https://www.acwing.com/solution/content/72577/)
- [2.1上课笔记 | Andrew1729](https://www.acwing.com/solution/content/73097/)
***
## 启动初始项目
1. `django-admin startproject acapp`：在当前目录下创建名为`acapp`的`django`项目
2. `python3 manage.py runserver 0.0.0.0:8000`：启动项目
	1. 打开`settings.py`，找到`ALLOWED_HOSTS=[]`，修改成`ALLOWED_HOSTS=["自己的服务器的公网IP"]`
	2. 通过`自己的服务器公网IP:8000` 打开Django页面
## 创建管理员登录页面
1. 在一级`acapp`文件夹下，`python3 manage.py startapp XXX`，`XXX`是可以自定义的app名，这里用`game`示例，这时候会多一个文件夹`game`，树形结构如图：
```
|-- game
|   |-- __init__.py
|   |-- admin.py          # 管理员页面
|   |-- apps.py           # 用的不多
|   |-- migrations        # 存储数据库
|   |   `-- __init__.py
|   |-- models.py         # 定义网站里的数据库表
|   |-- tests.py
|   `-- views.py          # 视图，即函数
```
2. `python3 manage.py migrate`：将所有修改更新进数据库
3. 创建一个 **管理员用户**：
```
$ python3 manage.py createsuperuser
> Username (leave blank to use 'acs'): admin
> Email address: 
> Password: 123456
> Password (again): 123456
> Superuser created successfully.
```
然后利用该 **管理员用户** 登录 `admin` 页面，即可成功登陆
## 创建用户登录页面
### `game` 下的各个文件作用
1. `templates`目录：管理 `html`  文件
2. `urls`目录：管理路由，即链接与函数的对应关系 (接收链接，调用相对应的函数)
3. `views`目录：管理 `http` 函数（接收浏览器请求，返回字符串至浏览器）
4. `models`目录：管理数据库数据 
5. `static`目录：管理静态文件
6. `consumers`目录：管理`websocket`函数
### 实现一个路由重定向
- `url` 输入网址 -> `acapp.urls` -> `game.urls` -> `game.views.index` -> 展示页面

**game.views**

这其中，`HttpResponse()`内部使用`html`的语法，返回的响应就直接用这个字符串作为页面，转换成`html`
```
from django.http import HttpResponse

def index(request):
    line1 = '<h1 style="text-align: center"> 第一个网页 </h1>'
    return HttpResponse(line1)
```
**game.urls**

这其中，``path('PATH', function, name)``的含义是，在用户访问网站的时候，如果是``网站/game/PATH``，就会调用``function``，名字为``name``，这是在``/game/``目录下的调用，所以这个``PATH``是在``/game/``的基础上的**相对路径**，所以他的**绝对路径**是``网站/game/PATH``
```
from django.urls import path
from game.views import index

urlpatterns = [ 
    path("", index, name="index"),
]
```
**acapp.urls**

这其中，``path('PATH', include('game.urls'))``的含义是：在用户访问网站的时候，如果是``网站/PATH``，就会走到``/game/urls``，并根据``/game/urls.py``来跑路由，就是说，用户在访问``网站/``的时候，由于此时调用的函数是``include('game.urls')``，所以访问``网站/``相当于根据``game/urls``访问
```
from django.contrib import admin
from django.urls import path, include

urlpatterns = [ 
    path('', include('game.urls')),
    path('admin/', admin.site.urls),
] 
```
然后直接打开 `ip:socket` 可以直接显示 `index` 返回的网页
# 创建菜单界面
- [3. 创建菜单界面 | 讲义](https://www.acwing.com/file_system/file/content/whole/index/content/3199626/)
- [3.1 上课笔记 | 大家好今天是](https://www.acwing.com/solution/content/73121/)
- [3.1 上课笔记 | 栎](https://www.acwing.com/solution/content/73707/)
***
## 构建项目框架
### 项目系统设计
- `menu`：菜单页面
- `playground`：游戏界面
- `settings`：设置界面
### 项目文件结构
```
.
|-- README.md
|-- acapp
|   |-- __init__.py    # 文件夹在加上 __init__.py 文件后，python 便可以通过 import 来引用该文件夹
|   |-- asgi.py
|   |-- settings.py
|   |-- urls.py
|   `-- wsgi.py
|-- db.sqlite3
|-- game
|   |-- __init__.py
|   |-- admin.py
|   |-- apps.py
|   |-- migrations
|   |   `-- __init__.py
|   |-- models
|   |   `-- __init__.py
|   |-- static
|   |   |-- css
|   |   |   `-- game.css    # 一般一个工程，只有一个 css 文件就足够了
|   |   |-- image
|   |   |   `-- menu
|   |   |       `-- background.gif
|   |   `-- js
|   |       |-- dist
|   |       |   `-- game.js
|   |       `-- src
|   |           `-- zbase.js    # 总的 js 文件，命名以 z 开头会自动在字典序最后
|   |-- templates
|   |   `-- multiends
|   |       `-- web.html
|   |-- tests.py
|   |-- urls
|   |   |-- __init__.py
|   |   |-- index.py
|   |   |-- menu
|   |   |   |-- __init__.py
|   |   |   `-- index.py
|   |   |-- playground
|   |   |   |-- __init__.py
|   |   |   `-- index.py
|   |   `-- settings
|   |       |-- __init__.py
|   |       `-- index.py
|   `-- views
|       |-- __init__.py
|       |-- index.py
|       |-- menu
|       |   `-- __init__.py
|       |-- playground
|       |   `-- __init__.py
|       `-- settings
|           `-- __init__.py
|-- manage.py
`-- scripts
    `-- compress_game_js.sh
```
#### `js` 文件管理
一般一个工程会有很多个 `.js` 源文件，为了加快网络的传输，也为了每次写新的 `.js` 文件不用每个 `html` 都额外引入一次

考虑用一个 `src` 源文件夹来存储所有的 `.js` 源文件

然后用 `dist` 文件夹来存放由 `src` 下所有源文件整合生成的一个目标 `.js` 文件

这样既实现了快速传输的好处，也方便了后续编写 `html` 文件时，引入 `.js` 的便利

创建一个脚本实现上述 **整合** 的功能
`~/acapp/scripts/compress_game_js.sh`
```
#! /bin/bash

JS_PATH=/home/acs/acapp/game/static/js/
JS_PATH_DIST=${JS_PATH}dist/
JS_PATH_SRC=${JS_PATH}src/

find $JS_PATH_SRC -type f -name '*.js' | sort | xargs cat > ${JS_PATH_DIST}game.js
```
#### `html` 文件管理
在 `templates` 文件夹下创建 `menu`、`playground`、`settings`、`multiends` 四个文件夹，用于存储三个模块和终端的 `html` 文件

在 `multiends` 下创建 `web.html` 文件
```
{% load static %}
<!-- Django 中引入全局setting里的变量 static 的语法-->
<head>
    <link rel="stylesheet" href="https://cdn.acwing.com/static/jquery-ui-dist/jquery-ui.min.css">
    <script src="https://cdn.acwing.com/static/jquery/js/jquery-3.3.1.min.js"></script>
    <!-- 上述两句引入 jQuery 库 -->
    <!-- 使用引入的变量 static 的语法如下 -->
    <link rel="stylesheet" href="{% static 'css/game.css' %}">
    <script src="{% static 'js/dist/game.js' %}"></script>
    <!-- 分别引入 css 文件和总的 js 文件 -->
</head>

<body style="margin: 0">
    <div id="ac_game_12345678"></div>
    <script>
        $(document).ready(function(){
            let ac_game = new AcGame("ac_game_12345678")
        })
    </script>
</body>
```
#### `views` 视图管理
在 `views` 文件夹下新建三个模块的视图文件夹

写一个 `index.py` 文件，目的是在 `web` 端被访问时，返回上面写的 `web.html` 文件
```
from django.shortcuts import render

def index(request):
  return render(request, "multiends/web.html")
```
#### `urls` 路由管理
```
                                     /-- "" -- index
                                    / -- "menu/" -- menu.index
             / "" --> "game.url" --> 
            /                       \ -- "playground/" -- playground.index
id:scoket ->                         \-- "settings/" -- settings.index
            \
             \ "/admin" -- 到达管理员页面
```
`~/acapp/acapp/urls.py`
```
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
  path('', include('game.urls.index')),
  path('admin/', admin.site.urls),
]
```
`~/acapp/game/urls/index.py`
```
from django.urls import path, include
from game.views.index import index

urlpatterns = [ 
    path("", index, name="index"),
    path("menu/", include("game.urls.menu.index")),
    path("playground/", include("game.urls.playground.index")),
    path("settings/", include("game.urls.settings.index"))
]
```
#### 网页渲染流程
根据用户的链接，首先进入`acapp/urls.py`，根据`path`再进入`game/urls/index.py`，再根据`path`进入下一层`url`或调用相对应的`views`中的`index.py`函数，函数接收参数，在网页端渲染`templates/multiends`下的`web.html`，`html`中有`JS`执行

注意：本项目为前后端分离，即通过`JS`在`client`中渲染项目(动态生成页面)，而不是在`server`渲染项目
### 修改全局配置
#### 设置时区
修改项目的 **UTC** 时间为 **CN** 时间
```
$ vim /acapp/settings.py

******
TIME_ZONE = 'Asia/Shanghai' # 原来默认是 UTC
******
```
#### 添加配置文件
将新创建的 `game` 下的 `apps.py` 中的 `GameConfig` 加到 `settings.py` 下
```
$ vim /acapp/settings.py

******
INSTALLED_APPS = [
  'game.apps.GameConfig',
  ......
]
******
```
声明将静态文件路径 `STATIC_ROOT` 和 `MEDIA_ROOT`
```
$ vim /acapp/settings.py

******
import os

......

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
******
```
## 创建菜单 `menu` 界面
### 搭建菜单 `menu` 界面的框架
我们采用的 **前后端分离式** 开发，所有的 **html** 渲染都要求在前端完成

开发流程就是，先在 **html** 里创建好一个有 **id** 的 **div**

然后利用 **js** 文件，捕获到该 **div**，并进行 **渲染**

`/templates/multiends/web.html`
```
...
    <div id="ac_game_12345678"></div>
    <script>
        $(document).ready(function(){
            let ac_game = new AcGame("ac_game_12345678")
        })
    </script>
...
```
`js/src/zbase.js`
```
class AcGame {
    constructor(id) {
        this.id = id; 
        this.$ac_game = $('#' + id);
        this.menu = new AcGameMenu(this);
    }   
}
```
`js/src/menu/zbase.js`
```
class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(` 
<div class="ac-game-menu">
</div>
`);
        this.root.$ac_game.append(this.$menu); 
}
```
`css/game.css`
```
.ac-game-menu {
    width: 100%;
    height: 100%;
    background-image: url('/static/image/menu/background.gif');
    background-size: 100% 100%;
    user-select: none;
}
```
这里的 **代码逻辑** 如下：
1. `html` 页面执行到 `js` 代码，利用 `AcGame类` 创建对象 `ac_game` 同时传递参数 `div` 的 `id`
2. `AcGame` 开始执行构造函数，在构造函数中，捕获 `html` 标签，并利用 `AcGameMenu类` 创建对象 `menu`，并将整个对象作为参数下传
3. `AcGameMenu` 开始执行构造函数，然后创建 `html` 代码，加到捕获到的 `html` 代码下
4. 最终成功渲染出背景图片
### 设置菜单 `menu` 页面的内容
主要内容就是在主页面中，显示：单人模式、多人模式、设置，三个按钮的选项
`js/src/menu/zbase.js`
```
class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            单人模式
        </div>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings-mode">
            设置
        </div>
    </div>
</div>
`);
        this.root.$ac_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.ac-game-menu-field-item-multi-mode');
        this.$settings_mode = this.$menu.find('.ac-game-menu-field-item-settings-mode');
    }
}
```
`css/game.css`
```
.ac-game-menu {
    width: 100%;
    height: 100%;
    background-image: url('/static/image/menu/background.gif');
    background-size: 100% 100%;
    user-select: none;
}
.ac-game-menu-field {
    width: 20vw;
    position: relative;
    top: 40vh;
    left: 19vh;
}
.ac-game-menu-field-item {
    height: 7vh;
    width: 18vw;
    color: white;
    font-size: 6vh;
    font-style: italic;
    padding: 2vh;
    margin: 1vh 0;
    cursor: pointer;
    text-align: center;
    background-color: rgba(39, 21, 28, 0.6);
    border-radius: 10px;
    letter-spacing: 0.5vw;
}
.ac-game-menu-field-item:hover {
    transform: scale(1.2);
    transition: 100ms;
}
```
### 添加 '单人模式' 监听函数 —— 打开游戏界面 功能
这里要实现的 **逻辑**：
1. 点击 '单人模式' 按钮触发 `click` 事件，随即触发监听函数，开始执行
2. 关闭 `menu` 页面
3. 打开 `playground` 页面

因此，我们先简易的实现一个 `playground` 页面，方便调试该功能
`js/src/playground/zbase.js`
```
class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div>游戏界面</div>`);

        this.hide();
        this.root.$ac_game.append(this.$playground);

        this.start();
    }
    start() {

    }
    show() {    //打开 playground 界面
        this.$playground.show();
    }
    hide() {    //关闭 playground 界面
        this.$playground.hide();
    }

}
```
在实现监听函数功能之前，先在 `/src/zbase.js` 即主 `js` 文件下，利用 `AcGamePlayground` 类创建好 `playground` 对象

这样我们就能在前端，渲染出两个界面了，分别是：`menu` 和 `playground`

`js/src/zbase.js`
```
class AcGame {
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.menu = new AcGameMenu(this);
        // 把 playground 对象也建好，这样我们就同时有两个界面了
        this.playground = new AcGamePlayground(this);

        this.start();
    }                    
    start() {

    }
}
```
然后，我们开始实现 `ac-game-menu-field-item-single-mode` 标签的 `click` 事件的监听函数

其功能之前讲过了，就是关闭 `menu` 页面，打开 `playground` 页面

`js/src/menu/zbase.js`
```
class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            单人模式
        </div>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings-mode">
            设置
        </div>
    </div>
</div>
`);
        this.root.$ac_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.ac-game-menu-field-item-multi-mode');
        this.$settings_mode = this.$menu.find('.ac-game-menu-field-item-settings-mode');

        this.start();
    }
    start() {
        this.add_listening_events();
    }
    add_listening_events() {
        let outer = this;
        this.$single_mode.click(function(){
            outer.hide();   // 关闭主页面
            outer.root.playground.show();   // 打开游戏界面
        });
    }

    show() {    //显示menu界面
        this.$menu.show();
    }
    hide() {    //隐藏menu界面
        this.$menu.hide();
    }
}
```
# 创建游戏界面
- [4.1 上课笔记 | Andrew1729](https://www.acwing.com/solution/content/79181/)
***
> **若修改`static文件夹`下的相关文件，需在`~/acapp`下执行`./scripts/compress_game_js.sh`来打包文件**
## 前端的模块化引入
由于在 `html` 代码部分，是将整个 `game.js` 文件引入

这样会导致在 `game.js` 中定义的变量，会变成整个网页的 **全局变量**（之后可能会引起变量重名的诸多问题）

因此，我们考虑使用 **模块化引入** 的功能，让网页只引入在 `html` 中需要的部分

修改 `web.html`
```
<!-- 首先，先删掉上面整个引入 game.js 的部分 -->
<!-- 然后，下方创建对象的部分，先使用模块化引入 -->
......
    <script type="module">
        import {AcGame} from "{% static 'js/dist/game.js' %}"
        $(document).ready(function(){
            let ac_game = new AcGame("ac_game_12345678")
        })
    </script>
......
```
此外，还有修改引入的类，在前面加上 `export`，如下修改 `js/src/zbase.js`
```
export class AcGame {
    ......
}
```
这样，在全局中，只会出现引入的模块，其他的 `.js` 代码不会出现在全局中
## 构建游戏界面框架
`static/js/src/playground/zbase.js`
```
......
    this.$playground = $(`<div class="ac-game-playground"></div>`);
......
```
`game.css`
```
......
.ac-game-playground {
    height: 100%;
    width: 100%;
    user-select: none;  // 禁用右键弹菜单
} 
```
## 实现游戏引擎框架
游戏中，物体在移动，其实现原理是：每一个动作都会渲染多张图片出来，然后图片快速的切换，从而实现动的过程

因此，需要先实现一个游戏引擎的基类 `AcGameObject` ，使得每帧能渲染一张图片出来

该基类需要具备的功能有：

1. `start()` 在游戏开始的第一帧时需要执行的任务（一般是创建对象）
2. `update()` 在游戏开始后的每一帧均会执行的任务（一般是渲染当前对象的各种状态）
3. `on_destroy()` 删掉该物体前需要执行的任务（一般是删掉动画，或者给对手加分）
4. `destroy()` 删掉该物体

根据上述逻辑，我们就可以基本搭建出来一个游戏引擎的基类了，具体如下：
`/static/js/playground/ac_game_object/zbase.js`
```js
let AC_GAME_OBJECTS = [];   // 用于记录当前画布中，需要渲染的对象有哪些

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);  // 将当前新建的对象，加入到全局的画布中去，参与渲染

        this.has_called_start = false;  // 是否执行过 start 函数
        this.timedelta = 0;             // 当前帧距离上一帧的时间间隔
        // 该数据记录是为了后续计算速度等参数的
    }
    start() {   // 只会在第一帧执行一次

    }
    update() {  // 每一帧均会执行一次

    }
    on_destroy() {  // 在被销毁前执行一次

    }
    destroy() { // 删掉该物体
        this.on_destroy();  //删掉该物体前，执行删前的操作

        // 在全局渲染物体中，找到该物体，并将其删掉
        for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
            if (AC_GAME_OBJECTS[i] === this) {  // 三等号，在js里额外加了一层类型相等约束
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp) {  // 回调函数，实现：每一帧重绘时，都会执行一遍
    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
        let obj = AC_GAME_OBJECTS[i];
        if (!obj.has_called_start) { // 如果还未执行初始帧动作，就先执行
            obj.start();
            obj.has_called_start = true;
        }
        else {  // 执行过初始帧，就执行每一帧的任务
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp; // 更新最后一次时间戳
    requestAnimationFrame(AC_GAME_ANIMATION);
}

requestAnimationFrame(AC_GAME_ANIMATION);   // JS的API，可以调用1帧里面的函数。(有些浏览器的一秒帧数不一定相等)
```
> **接下来所有的一切游戏，都是基于这个引擎的基类完成的**
## 实现游戏地图功能
目标：实现一个每一秒都在渲染的纯黑背景

虽然现阶段要实现的地图较为简单，但为了后期的拓展性，故还是考虑新建一个文件夹来完成

然后在 `js` 中，已经封装好了一个 `canvas` 的 `api` 来帮助实现背景画布，直接调用即可

先铺开画布，然后设置为黑色

`static/js/playground/zbase.js`
```js
class AcGamePlayground {
    constructor(root) {
        ......
        // $('.playground')对象已经在 css 文件里渲染出高宽了
        // 现在把他的高宽存下来，往下传递
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        ......
    }
    .....
}
```
`static/js/playground/game-map/zbase.js`
```js
class GameMap extends AcGameObject {    // 继承自游戏引擎基类
    constructor(playground) {
        super();    // 自函数功能：调用基类的构造函数
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`); // 创建一个canvas的jQuery对象，就是我们要实现的画布
        this.ctx = this.$canvas[0].getContext('2d'); // jQuery对象是一个数组，第一个索引是html对象
        // 设置画布的宽高
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start() {
    }
    update() {  // 游戏地图每帧都要渲染
        this.render();
    }
    render() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
 }
```
## 实现玩家显示功能
毛坯版玩家显示，每个玩家定义成一个圆，然后渲染在前端

需要对于玩家类定义多个参数，以方便日后拓展：

1. `x` 当前位置的横坐标
2. `y` 当前位置的纵坐标
3. `radius` 当前的半径
4. `speed` 当前的速度
5. `is_me` 该对象是否是当前玩家操控的对象（一是区别于 bot，二是区别于 日后联机的其他玩家）

`static/js/playground/zbase.js`
```js
class AcGamePlayground {
    constructor(root) {
        ......
        this.players = [];  // 存放当前游戏中的所有玩家
        // 将玩家加入游戏中
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, true));
        ......
    }
    .....
}
```
`static/js/playground/player/zbase.js`
```js
class Player extends AcGameObject {
    constructor(playground, x, y, radius, color, speed, is_me) {
        super();
        // 把信息都存下来
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed;
        this.radius = radius;
        this.is_me = is_me;
        // 用于浮点数运算
        this.eps = 0.1;
    }
    start() {
    }
    update() {
        this.render();
    }
    render() {  // 渲染一个圆
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    on_destroy() {
    }
}
```
## 实现玩家移动功能
移动的实现逻辑很简单，就是让每帧渲染的圆的位置发生移动即可

上述简单逻辑的实现如下：

```js
class Player extends AcGameObject {
    constructor(....)
    {
        ...
        this.vx = 1;
        this.vy = 1;
        ...
    }
    ...
    update() {
        this.x += x;
        this.y += y;
        this.render();
    }
}
```
然后我们来实现一个向鼠标点击位置移动的功能

这就需要设置一个 `click` 事件的监听函数，分别传递：

1. 鼠标点击事件
2. 鼠标点击位置的横坐标
3. 鼠标点击位置的纵坐标

然后开始让圆的位置逐步向鼠标点击位置进行移动
```js
start() {
    if (this.is_me) {   // 对于用户玩家，加上监听函数
        this.add_listening_events();
    }
}
add_listening_events() {
    let outer = this;
    // 把鼠标右键调出菜单栏的功能关掉
    this.playground.game_map.$canvas.on("contextmenu", function() {
        return false;
    });
    // 把右键控制移动功能加上
    this.playground.game_map.$canvas.mousedown(function(e) {
        // 左键:1 中键:2 右键:3
        if (e.which === 3) {
            outer.move_to(e.clientX, e.clientY);
        }
    });
}
```
然后，我们来实现移动功能的函数 `move_to(tx, ty)`
```js
constructor(...){
    ...
    this.vx = 0;    // x方向上的移动速度
    this.vy = 0;    // y方向上的移动速度
    this.move_length = 0;   // 剩余移动距离
    ...
}
...
get_dist (x1, y1, x2, y2) { // 求两点的欧几里得距离
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
move_to(tx, ty) {
    // 计算移动距离
    this.move_length = this.get_dist(this.x, this.y, tx, ty);
    // 计算移动角度，api接口：atan2(dy, dx)
    let angle = Math.atan2(ty - this.y, tx - this.x);
    // 位移 1 个单位长度（向着矢量方向移动到单位圆上）
    this.vx = Math.cos(angle);  // 极直互化
    this.vy = Math.sin(angle);
}
update() {
    // 浮点数精度运算
    if (this.move_length < this.eps) {
        this.move_length = 0;
        this.vx = this.vy = 0;
    } else {
        // 计算单位帧里的移动距离
        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        // 还要减掉移动的距离
        this.move_length -= moved;
    }
    this.render();
}
...
```
这样就实现了玩家的移动功能了，可以登录 `id:socket` 调试该功能
## 实现火球技能的功能
火球对象的建立与玩家基本一致，直接照搬，在从细节上改改即可

`js/src/playground/skill/fireball/zbase.js`
```js
class FireBall extends AcGameObject {
    constructor(playground, player, x, y, radius, vx, vy, color, speed, move_length, damage) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.player = player;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.move_length = move.length;
        this.damage = damage;
        this.eps = 0.1;
    }
    start() {

    }
    update() {
        if (this.move_length < this.eps) {
            this.destroy();
            return false;
        } else {
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
            this.x += this.vx * moved;
            this.y += this.vy * moved;
            this.move_length -= moved;
        }
        this.render();
    }
    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math * Pi, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
} 
```
然后在玩家身上实现发火球的功能

基本实现逻辑：当前选中了火球技能，鼠标左键点击一处，向该处发射一个火球

因此，为了知道用户是否选择了技能，需要加一个键盘触发事件监听函数，然后加一个鼠标左键触发事件监听函数

然后发射一个火球即可

`js/src/playground/player/zbase.js`
```js
constructor(...) {
    ...
    this.cur_skill = null;  // 记录当前选择的技能
    ...
}
add_listening_events() {
    ...
    this.playground.game_map.$canvas.mousedown(function(e) {
        // 左键:1 中键:2 右键:3
        if (e.which === 3) {
            outer.move_to(e.clientX, e.clientY);
        } else if (e.which === 1) {     // 鼠标左键事件
            if (outer.cur_skill === "fireball") {   // 当前已经选中火球技能
                outer.shoot_fireball(e.clientX, e.clientY);
            }
        }
        outer.cur_skill = null; // 清空当前技能
    });
    $(window).keydown(function(e) {
        if (e.which === 81) {       // 键盘按下事件
            outer.cur_skill = "fireball";
            return false;
        }
    });
}
shoot_fireball(tx, ty) {
    // 确定火球的参数
    let x = this.x, y = this.y; // 火球发射点就是当前玩家的位置
    let radius = this.playground.height * 0.01;
    let angle = Math.atan2(ty - this.y, tx - this.x);
    let vx = Math.cos(angle), vy = Math.sin(angle);
    let color = "orange";
    let speed = this.playground.height * 0.5;
    let move_length = this.playground.height * 1.0;
    let damage = this.playground.height * 0.01;
    new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length, damage);
}
```
这样就成功实现了玩家发射火球的功能了
## 实现单人模式下的人机功能
先创建好 5 个人机
`playground/zbase.js`
```js
...
//创建好 5 个人机
for (len i = 0; i < 5; i ++ ) {
    this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "blue", this.height * 0.15, false));
}
...
```
这样创建出来的 5 个人机是不会行动的

我们写一个简易的 AI 程序，让他们也会移动

这里实现的逻辑是：每次随机一个目的地，向目的地移动，然后再随机一个目的地，循环下去

根据该逻辑，修改两个函数即可

`playground/player/zbase.js`
```js
...
start() {
    if (this.is_me) {   // 对于用户玩家，加上监听函数
        this.add_listening_events();
    } else {
        let tx = Math.random() * this.playground.width;
        let ty = Math.random() * this.playground.height;
        this.move_to(tx, ty);
    }
}
...
 update() {
    if (this.move_length < this.eps) {
        this.move_length = 0;
        this.vx = this.vy = 0;
        if (!this.is_me) {   // 如果是人机，停下来时再随机一个方向前进
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;
            this.move_to(tx, ty);
        }
    }
    ...
}
on_destroy() {
    for (let i = 0; i < this.playground.players.length; i ++ ) {
        if (this.playground.players[i] === this) {
            this.playground.players.splice(i, 1);
        }
    }
}
```
## 实现技能命中效果（碰撞检测功能）
实现逻辑：检测两个圆的中心距离是否小于两个圆的半径之和

小于等于时，代表发生碰撞，开始执行命中效果：

1. 被击中用户掉血
2. 被击中用户收到向后击退效果

碰撞检测写在火球类里，击退效果写在玩家类里

`fireball/zbase.js`
```js
update() {
    if (...) {
        ...
    } else {
        ...

        // 碰撞检测
        for (let i = 0; i < this.playground.players.length; i ++ ) {
            let player = this.playground.players[i];
            if (this.player !== player && this.is_collision(player)) {  // 碰撞发生一定是在非施法者身上
                this.attack(player);    // 火球命中，目标玩家执行击退效果
            }
        }
    }
    this.render();
}
get_dist(x1, y1, x2, y2) {  // 获得两点的欧几里得距离
        let dx = x2 - x1;
        let dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
is_collision(player) {  // 检测两个圆的中心距离是否小于两个圆的半径之和
    let distance = this.get_dist(this.x, this.y, player.x, player.y);
    if (distance < (this.radius + player.radius))
        return true;
    return false;
}
attack(player) {    // 火球命中，目标玩家执行击退效果
    let angle = Math.atan2(player.y - this.y, player.x - this.x);   // 计算角度
    player.is_attacked(angle, this.damage); // 火球命中，目标玩家执行击退效果
    this.destroy(); // 火球命中后，自然消失
}
```
**被击退的时候，原来的移动速度应该置为 0，当前的移动应该转为向被击中方向上的移动**
`player/zbase.js`
```js
is_attacked(angle, damage) {
    this.radius -= damage;  // 受伤，半径减少
    if (this.radius < 10) { // 当半径小于10像素时，代表死亡
        this.destroy();
        return false;
    }
    // 开始执行击退效果
    this.damage_vx = Math.cos(angle);
    this.damage_vy = Math.sin(angle);
    this.damage_speed = damage * 100;

    this.speed *= 0.5;  // 被击中以后移动速度减半
}
update() {
    if (this.damage_speed > this.eps) {   // 当前仍处于击退效果中
        this.vx = this.vy = 0;
        this.move_length = 0;
        this.x += this.damage_vx * this.damage_speed * this.timedelta / 1000;
        this.y += this.damage_vy * this.damage_speed * this.timedelta / 1000;
        this.damage_speed *= this.friction; // 击退速度乘以摩擦系数，已达到削减的目的
    } else {
        ...
    }
    ...
}
```
## 被击中以后的粒子效果特效
实现逻辑：被击中以后，在玩家附近随机生成一些粒子小球

因此我们要先实现 粒子小球 对象

`static/js/src/playground/particle/zbase.js`
```js
class Particle extends AcGameObject {
    constructor(playground, x, y, radius, vx, vy, color, speed) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.friction = 0.9;
    }
    start() {
    }
    update() {
        if (this.speed < this.eps) {
            this.destroy;
            return false;
        }
        this.x += this.vx * this.speed * this.timedelta / 1000;
        this.y += this.vy * this.speed * this.timedelta / 1000;
        this.speed *= this.friction;
        this.render();
    }
    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
} 
```
然后我们在被击退功能模块，实现生成粒子小球的效果

- 粒子小球释放弧度为 $[0,2π)$ 的随机数
	- 粒子小球的 x, y 分量比率根据弧度来设定
- 粒子小球的起始坐标应与玩家的坐标相同
- 粒子小球的颜色与玩家颜色相同
- 粒子小球的速度为玩家移动速度的 $10$ 倍

`js/src/playground/player/zbase.js`
```js
is_attacked(angle, damage) {
    // 粒子小球效果
    for (let i = 0; i < 10 + Math.random() * 5; i ++ ) {
        let x = this.x, y = this.y;
        let radius = this.radius * Math.random() * 0.1;
        let angle = 2 * Math.PI * Math.random();
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = this.color;
        let speed = this.speed * 10;
        new Particle(this.playground, x, y, radius, vx, vy, color, speed);
    }
    ...
}
```
## 一些小优化
### 人机随机颜色
`js/src/playground/zbase.js`
```js
constructor(root) {
    ......
    // 创建好 5 个人机
    for (let i = 0; i < 5; i ++ ) {
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, this.get_random_color(), this.height * 0.15, false));
    }
    ......
}
get_random_color() {
    let colors = ["blue", "red", "pink", "grey", "green"];
    return colors[Math.floor(Math.random() * 5)];
}
```
### 人机AI随机攻击操作 
`js/src/playground/player/zbase.js`
```js
constructor (...) {
    ...
    this.spent_time = 0;    // 初始人机冷却攻击时间
}
...
update() {
    this.spent_time += this.timedelta / 1000;
    if (!this.is_me && this.spent_time > 4 && Math.random() * 180 < 1) {
        let player = this.playground.players[Math.floor(Math.random() * this.playground.players.length)];
        this.shoot_fireball(player.x, player.y);
}
```
# 部署nginx与对接acappஐ
- [5. 部署nginx与对接acapp | 讲义](https://www.acwing.com/file_system/file/content/whole/index/content/3257028/)
- [5.1 上课笔记 | Andrew1729](https://www.acwing.com/solution/content/79244/)
- [5.1. 上课笔记 | 菊花](https://www.acwing.com/solution/content/78903/)
- [Ngnix 介绍](https://zhuanlan.zhihu.com/p/364622127)
- [nginx 和uwsgi的区别与作用](https://www.jianshu.com/p/36187963b553)
***
## Nginx是什么？
> **Nginx是一款自由的、开源的、高性能的HTTP服务器和反向代理服务器**
> 
> **Nginx可以作为一个HTTP服务器进行网站的发布处理，另外Nginx可以作为反向代理进行负载均衡的实现**
> 
> **Nginx中HttpUwsgiModule的作用是与uWSGI服务器进行交换**
## uWSGI是什么？ 
> **uWSGI是一个全功能的HTTP服务器，实现了WSGI、uwsgi、http等协议**
> 
> **它要做的就是把HTTP协议转化成语言支持的网络协议。比如把HTTP协议转化成WSGI协议，让Python可以直接使用**
>
> **WSGI协议是Python 语言定义的 Web 服务器和 Web 应用程序或框架之间的一种简单而通用的接口**
> 
> **简单来说uWSGI就是用来沟通nginx和django的一座桥梁**
## Nginx+uWSGI+Diango 工作流程
> **`nginx` 是对外的服务接口，外部浏览器通过`url`访问`nginx`**
> 
> **`nginx` 接收到浏览器发送过来的`http`请求，将包进行解析**
> 
> **分析`url`，如果是静态文件请求就直接访问用户给`nginx`配置的静态文件目录，直接返回用户请求的静态文件**
> 
> **如果不是静态文件，而是一个动态的请求，那么`nginx`就将请求转发给`uwsgi`，`uwsgi` 接收到请求之后将包进行处理，处理成`wsgi`可以接受的格式，并发给`wsgi`，`wsgi` 根据请求调用应用程序的某个文件，某个文件的某个函数，最后处理完将返回值再次交给`wsgi`，`wsgi`将返回值进行打包，打包成`uwsgi`能够接收的格式，`uwsgi`接收`wsgi` 发送的请求，并转发给`nginx`, `nginx`最终将返回值返回给浏览器**
## uwsgi服务的开启&&关闭
- 在`~/acapp`启动uwsgi服务：**`uwsgi --ini scripts/uwsgi.ini`**
- 关闭uwsgi服务：`sudo pkill -f uwsgi -9`
## 针对 acapp 的优化
### 打包脚本优化
由于现在 **发布版本的脚本文件** 用的是打包在根目录里的 **static** 文件夹

每次修改好 **static** 文件夹后，不仅需要对 **js** 文件打包，还需要对 **static** 文件夹打包

不放把 "将static文件夹打包" 的 **shell** 代码一起加入 **js** 打包脚本中，从而实现一键打包

`scripts/compress_game_js.sh`
```
#! /bin/bash

JS_PATH=/home/acs/acapp/game/static/js/
JS_PATH_DIST=${JS_PATH}dist/
JS_PATH_SRC=${JS_PATH}src/

find $JS_PATH_SRC -type f -name '*.js' | sort | xargs cat > ${JS_PATH_DIST}game.js

echo "yes" | python3 manage.py collectstatic
```
### 鼠标点击事件的相对偏移
由于写游戏界面的时候，玩家移动是按照鼠标相对于当前整个浏览器取的位置参数 `e.clientX`

而 `acapp` 里，每个应用是一个小窗口，鼠标点击位置的参数应当是 **相对于整个游戏窗口的位置参数**

所有会导致出现，点击的位置与移动的位置不同，这里需要做出小优化

优化的逻辑 :

1. $clientX−窗口左侧到浏览器左侧的距离=玩家的目标X$
2. $clientY−窗口上侧到浏览器上侧的距离=玩家的目标Y$
这就要用到一个 `js` 的 `API` 了 : `getBoundingClientRect()`
```js
rectObject = object.getBoundingClientRect();
 
rectObject.top : 元素上边到视窗上边的距离;
rectObject.right : 元素右边到视窗左边的距离;
rectObject.bottom : 元素下边到视窗上边的距离;
rectObject.left : 元素左边到视窗左边的距离;
rectObject.width : 是元素自身的宽
rectObject.height : 是元素自身的高
```
`player/zbase.js`
```js
...
 add_listening_events() {
    ...
    this.playground.game_map.$canvas.mousedown(function(e) {
        // 创建 rect 对象
        const rect = outer.ctx.canvas.getBoundingClientRect();
        if (e.which === 3) {
            // 调整偏移量
            outer.move_to(e.clientX - rect.left, e.clientY - rect.top);
        } else if (e.which === 1) {
            if (outer.cur_skill === "fireball") {
                // 调整偏移量
                outer.shoot_fireball(e.clientX - rect.left, e.clientY - rect.top);
            }
        }
        ...
    });
    ...
}
...
```
### 将菜单界面重新设为主界面
`js/zbase.js` 的注释取消，使之创建出 **menu** 对象

`js/playground/zbase.js` 的注释取消，并设置逻辑，让 **playground** 打开后，才进行游戏界面初始化
```js
class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`);

        this.hide();    // 初始时隐藏
        // 游戏界面生成代码在下面展示 playground 时执行
        this.start();
    }
    ...
    show() {    // 打开 playground 界面
        this.$playground.show();
        // 开始生成游戏界面
        this.root.$ac_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];  // 存放当前游戏中的所有玩家
        // 将玩家加入游戏中
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, true));

        // 创建好 5 个人机
        for (let i = 0; i < 5; i ++ ) {
            this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, this.get_random_color(), this.height * 0.15, false));
        }

    }
    ...
}
```
### 调整 css 文件，适应窗口
在设置 `web` 网页的时候，有些设置了绝对值，可能对于窗口化的 `acapp` 显示效果差

将他们修改成相对数值

`game.css`
```js
...
.ac-game-menu-field {
    ...
    top: 40%;
    left: 20%;
}
.ac-game-menu-field-item {
    height: 6vh;
    ...
    font-size: 4vh;
    ...
}
...
```
# 创建账号系统 
[6. 创建账号系统 | 讲义](https://www.acwing.com/file_system/file/content/whole/index/content/3294700/)
***
## 用户名密码登录
- [6.1 用户名密码登录 | 讲义](https://www.acwing.com/blog/content/12373/)
- [6.1 上课笔记 | Andrew1729](https://www.acwing.com/solution/content/79314/)
- [6.1 上课笔记 | 吃饱喝足不学习](https://www.acwing.com/solution/content/75831/)
***
### 客户端请求与Django响应流程
> **用户在客户端通过`$.ajax`发送请求，根据`urls`路由到对应的`views`中的函数，处理`request`后返回`JsonResponse` 至客户端**
### 前期准备工作
做开发，先开启调试模式，如果不开启，服务器一旦运行错误，就只返回 `Error` 报错
`settings.py`
```python
...
DEBUG = True
...
```
不过 `django` 自带的 `User` 表并不能满足我们的需求，因此我们需要自己额外建表
### 创建用户表
所有的数据表都存在 `models` 里

我们在 `models` 里创建一个 `player` 文件夹，用于存储所有的 `player` 相关的表

然后对文件夹初始化 `__init__.py`，接着扩充成一个我们需要的数据表

`game/models/player/player.py`
```python
from django.db import models
from django.contrib.auth.models import User

class Player(models.Model): # Player 类继承自 Model 类
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # 说明Player是从User表扩充过来的，每一个player都与一个user是一一对应关联关系
    # 后一个参数是指，当user被删除后，对应的player也要被删除
    # （感觉就是外键的意思）
    photo = models.URLField(max_length=256, blank=True)
    # 用于存储用户的头像的url

    # 指定每个player数据展示在前台的数据
    def __str__(self):
        return str(self.user)    # 展示用户的用户名
```
将定义的表，注册到后台 `admin` 页面中

`game/admin.py`
```python
...
from game.models.player.player import Player

admin.site.register(Player)
```
然后将创建的数据表更新到 `django` 的数据库中去
```python
$ python3 manage.py makemigrations
> Migrations for 'game':
>   game/migrations/0001_initial.py
>     - Create model Player
$ 
$ python3 manage.py migrate
> Operations to perform:
>   Apply all migrations: admin, auth, contenttypes, game, sessions
> Running migrations:
>   Applying game.0001_initial... OK
```
然后重启一下服务，就可以在管理员页面看到新建的数据库了
### 实现客户端的类型判别（ACAPP or WEB）
由于我们实现的项目是前后端分离类型，因此对于不同的客户端，前端要控制生成不同的页面

为了增强扩展性，故这里要实现客户端类型的判别

**y总** 已经提前写好了 **ACAPP** 的接口，如果用户用的是 **ACAPP** 访问，则在新建对象 **ac_game** 时，会额外传递一个参数

我们只需按照这个接口去完成扩充即可

> **之后写小程序之类的同理，额外传一个接口**

`js/zbase.js`
```js
export class AcGame {
    constructor(id, AcWingOS) {
        this.id = id;
        this.$ac_game = $('#' + id);

        this.AcWingOS = AcWingOS;   //如果是acapp端，该变量就会带着一系列y总提供的接口

        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);

        this.start();
    }
    start() {

    }
}
```
### 构建登录功能框架
基本逻辑 : 用户访问页面 -> 进入登录页面 -> 提交登录信息 -> 核对登录信息 -> 返回登陆结果和其他信息

每实现一个函数，就需要实现三个部分：

1. `views` : 实现具体的调用数据库的逻辑
2. `urls` : 实现一个路由
3. `js` : 前端实现GET上述接口的过程

欲实现流程 : 

1. 用户访问网站，通过先前完成的路由，访问到 `web.html `
2. `web.html` 中的 `js` 部分创建了一个 `AcGame` 对象 
3. `AcGame` 对象创建的过程中，生成了 `Settings` 对象 
4. `Settings` 对象创建完成后，调用 `Settings.start()` 函数 
5. `Settings.start()` 函数调用了 `Settings.getinfo()` 函数
6. `Settings.getinfo()` 函数中执行了 `ajax` 向 `getinfo` 接口发起一个含参数 `platform` 的 `GET` 请求 
7. 通过 `urls` 路由的实现，最终定位到 `views/settings/getinfo.py` 文件的 `getinfo(request)` 函数 
8. 根据传递过来的 `platform` 函数，实现不同的 `JsonResponse` 返回 
9. `Settings.getinfo()` 接受到了 `response` 完成上述基本逻辑
#### views 
`views/settings/getinfo.py`
```python
from django.http import JsonResponse
from game.models.player.player import Player

def getinfo_acapp(request):
    player = Player.objects.all()[0]    # 取出数据库中第一个用户(调试该功能)
    return JsonResponse({
        'result': "success",
        'username': player.user.username,
        'photo': player.photo,
    })

def getinfo_web(request):
    player = Player.objects.all()[0]    # 取出数据库中第一个用户(调试该功能)
    return JsonResponse({
        'result': "success",
        'username': player.user.username,
        'photo': player.photo,
    })

def getinfo(request):   # 处理请求
    platform = request.GET.get('platform')  # 根据请求的平台不同，进行不同返回处理
    if platform == "ACAPP":
        return getinfo_acapp(request)
    elif platform == "WEB":
        return getinfo_web(request)
```
#### urls
`urls/settings/index.py`
```python
from django.urls import path
from game.views.settings.getinfo import getinfo

urlpatterns = [
    path("getinfo/", getinfo, name="settings_getinfo"),
]
```
路由建立好以后，访问 `xxxx/settings/getinfo`，可以看到 `getinfo.py` 返回的 `JSON` 类型的 `JSONResponse`
#### js
网页刚访问时，应先将 `menu` 关闭，然后打开登录界面，随意先修改一个让 `menu` 初始关闭

`static/js/src/menu/zbase.js`
```js
class AcGameMenu {
    constructor(root) {
        ...
        this.$menu.hide();
        ...
    }
    ...
```
`static/js/src/settings/zbase.js`
```js
class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.root.AcWingOS) this.platform = "ACAPP";
        this.start();
    }
    start() {
        this.getinfo();
    }
    register() {    // 打开注册界面
    }
    login() {       // 打开登录界面
    }
    getinfo() {
        let outer = this;
        $.ajax({
            url: "https://app1117.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {    // 登录成功，关闭登录界面，打开主菜单
                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();
                }
            }
        });
    }
    hide() {
    }
    show() {
    }
}
```
然后不要忘记在 `根js` 下创建对象
```js
export class AcGame {
    constructor(id, AcWingOS) {
        ...
        this.settings = new Settings(this);
        ...
    }
    ...
}
```
这样基本框架就完成了
#### 完善 HTTP 请求的函数
如果用户未登录，返回信息 "not login"

如果用户登录，返回信息 "success" 以及用户名和头像

`views/setting/getinfo.py`
```py
def getinfo_web(request):
    user = request.user
    if not user.is_authenticated:   # 未登录
        return JsonResponse({
            'result': "not login"
        })
    else:                           # 已登录
        player = Player.objects.get(user=user)
        return JsonResponse({
            'result': "success",
            'username': player.user.username,
            'photo': player.photo,
        })
```
注意前后台是一个登录系统，因此要先退掉后台，再测试
### 将用户头像渲染到玩家上
将返回的 `JsonResponse` 存到 `Settings` 类的变量中
`settings/zbase.js`
```js
class Settings {
    constructor(root) {
        ...
        this.username = "";
        this.photo = "";
        ...
    }
    ...
    getinfo() {
        let outer = this;
        $.ajax({
            ...
            success: function(resp) {
                ...
                if (resp.result === "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    ...
                }
                ..
            }
        });
    }
}
```
然后在 `Player` 里把用户的头像渲染到对应的玩家上

`playground/player/zbase.js`
```js
class Player {
    constructor(...) {
        ...
        this.img = new Image();
        this.img.src = this.playground.root.settings.photo;
    }
    ...
    render() {
        if (this.is_me) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, 
                               this.radius * 2, this.radius * 2);
            this.ctx.restore();
        } else {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }
    ...
}
```
### 实现登录界面的前端
先完成登录界面显示的逻辑

`settings/zbase.js`
```js
class Settings {
    ...
    register() {  // 打开注册界面
        this.$login.hide();
        this.$register.show();
    }

    login() {  // 打开登录界面
        this.$register.hide();
        this.$login.show();
    }
    ...
    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }
}
```
#### 实现前端的基础框架
`settings/zbase.js`
```js
class Settings {
    constructor(root) {
        ...
        this.$settings = $(`
<div class="ac-game-settings">
    <div class="ac-game-settings-login">
        <div class="ac-game-settings-title">
            登录
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="ac-game-settings-password">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>登录</button>
            </div>
        </div>
        <div class="ac-game-settings-error-message">
        </div>
        <div class="ac-game-settings-option">
            注册
        </div>
        <br>
        <div class="ac-game-settings-acwing">
            <img width="30" src="https://app165.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
            <br>
            <div>
                AcWing一键登录
            </div>
        </div>
    </div>
    <div class="ac-game-settings-register">
        <div class="ac-game-settings-title">
            注册
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="用户名">
            </div>
        </div>
        <div class="ac-game-settings-password ac-game-settings-password-first">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="密码">
            </div>
        </div>
        <div class="ac-game-settings-password ac-game-settings-password-second">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>注册</button>
            </div>
        </div>
        <div class="ac-game-settings-error-message">
        </div>
        <div class="ac-game-settings-option">
            登录
        </div>
        <br>
        <div class="ac-game-settings-acwing">
            <img width="30" src="https://app165.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
            <br>
            <div>
                AcWing一键登录
            </div>
        </div>
    </div>
</div>
`);
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login_username = this.$login.find(".ac-game-settings-username input");
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message");
        this.$login_register = this.$login.find(".ac-game-settings-option");
        
        this.$login.hide();

        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-second input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message");
        this.$register_login = this.$register.find(".ac-game-settings-option");

        this.$register.hide();

        this.root.$ac_game.append(this.$settings);
        ...
    }
    ...
}
```
对应的 `css` 文件部分：

`css/game.css`
```css
.ac-game-settings {
    width: 100%;
    height: 100%;
    background-image: url("/static/image/menu/background.gif");
    background-size: 100% 100%;
    user-select: none;
}

.ac-game-settings-login {
    height: 41vh;
    width: 20vw;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
}


.ac-game-settings-title {
    color: white;
    font-size: 3vh;
    text-align: center;
    padding-top: 2vh;
    margin-bottom: 2vh;
}

.ac-game-settings-username {
    display: block;
    height: 7vh;
}

.ac-game-settings-password {
    display: block;
    height: 7vh;
}

.ac-game-settings-submit {
    display: block;
    height: 7vh;
}

.ac-game-settings-acwing {
    display: block;
    height: 7vh;
}

.ac-game-settings-item {
    width: 100%;
    height: 100%;
}

.ac-game-settings-item > input {
    width: 90%;
    line-height: 3vh;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.ac-game-settings-item > button {
    color: white;
    width: 90%;
    line-height: 3vh;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #4CAF50;
    border-radius: 5px;
}

.ac-game-settings-error-message {
    color: red;
    font-size: 0.8vh;
    display: inline;
    float: left;
    padding-left: 1vw;
}

.ac-game-settings-option {
    color: white;
    font-size: 2vh;
    display: inline;
    float: right;
    padding-right: 1vw;
    cursor: pointer;
}

.ac-game-settings-acwing > img {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    display: block;
}

.ac-game-settings-acwing > div {
    color: white;
    font-size: 1.5vh;
    text-align: center;
    display: block;
}

.ac-game-settings-register {
    height: 49vh;
    width: 20vw;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
}
```
#### 实现登录/注册的相互切换
```js
class Settings {
    constructor(root) {
        ...
    }
    start() {
        this.getinfo();
        this.add_listening_events();
    }
    add_listening_events() {
        this.add_listening_events_login();
        this.add_listening_events_register();
    }
    add_listening_events_login() {
        let outer = this;
        this.$login_register.click(function() {
            outer.register();   // 跳到注册界面
        });
    }
    add_listening_events_register() {
        let outer = this;
        this.$register_login.click(function() {
            outer.login();      // 跳到登录界面
        })
    }
    ...
}
```
### 实现登录功能
`views/settings/login.py`
```python
from django.http import JsonResponse
from django.contrib.auth import authenticate, login

def signin(request):
    data = request.GET
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)
    if not user:
        return JsonResponse({
            'result': "用户名或密码不正确"
        })
    login(request, user)
    return JsonResponse({
        'result': "success"
    })
```
`urls/settings/index.py`
```python
from django.urls import path
from game.views.settings.getinfo import getinfo
from game.views.settings.login import signin

urlpatterns = [
    path("getinfo/", getinfo, name="settings_getinfo"),
    path("login/", signin, name="settings_login"),
]
```
`settings/zbase.js`
```js
class Settings{
    ...
    add_listening_events_login() {
        ...
        this.$login_submit.click(function() {
            outer.login_on_remote();
        });
    }
    ...
    login_on_remote() {     // 在远程服务器上登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();
        $.ajax({
            url: "https://app1117.acapp.acwing.com.cn/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }
}
```
### 实现登出功能
`views/settings/logout.py`
```python
from django.http import JsonResponse
from django.contrib.auth import logout

def signout(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
            'result': "success",
        })
    logout(request)
    return JsonResponse({
        'result': "success",
    })
```
`urls/settings/index.py`
```python
...
from game.views.settings.logout import signout
urlpatterns = [
    ...
    path("logout/", signout, name="settings_logout"),
]
```
`settings/zbase.js`
```js
...
login_on_remote() {     // 在远程服务器上登录
    let outer = this;
    let username = this.$login_username.val();
    let password = this.$login_password.val();
    this.$login_error_message.empty();

    $.ajax({
        url: "https://app1117.acapp.acwing.com.cn/settings/login/",
        type: "GET",
        data: {
            username: username,
            password: password,
        },
        success: function(resp) {
            console.log(resp);
            if (resp.result === "success") {
                location.reload();
            } else {
                outer.$login_error_message.html(resp.result);
            }
        }
    });
}
...
```
再顺便将 `menu` 菜单页面里的 `设置` 按钮也绑定上登出功能

`menu/zbase.js`
```js
add_listening_events() {
    let outer = this;
    ...
    this.$settings_mode.click(function() {
        ...
        outer.root.settings.logout_on_remote();
    });
}
```
### 实现注册功能
`views/settings/register.py`
```python
from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player

def register(request):
    data = request.GET
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()
    password_confirm = data.get("password_confirm", "").strip()

    if not username or not password:
        return JsonResponse({
            'result': "用户名或密码不能为空",
        })
    if password != password_confirm:
        return JsonResponse({
            'result': "两个密码不一致",
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': "用户名已存在",
        })
    user = User(username=username)
    user.set_password(password)
    user.save()
    Player.objects.create(user=user, photo="https://cdn.acwing.com/media/user/profile/photo/42832_lg_f999efc3c8.png")
    login(request, user)
    return JsonResponse({
        'result': "success",
    })
```
`urls/settings/index.py`
```python
...
from game.views.settings.register import register
...
urlpatterns = [
    ...
    path("register/", register, name="settings_register"),
]
```
`settings/zbase.js`
```js
...
add_listening_events_register() {
    ...
    this.$register_submit.click(function() {
        outer.register_on_remote();
    });
}
...
register_on_remote() {  // 在远程服务器上注册
    let outer = this;
    let username = this.$register_username.val();
    let password = this.$register_password.val();
    let password_confirm = this.$register_password_confirm.val();
    this.$register_error_message.empty();

    $.ajax({
        url: "https://app1117.acapp.acwing.com.cn/settings/register/",
        type: "GET",
        data: {
            username: username,
            password: password,
            password_confirm: password_confirm,
        },
        success: function(resp) {
            console.log(resp);
            if (resp.result === "success") {
                location.reload();
            } else {
                outer.$register_error_message.html(resp.result);
            }
        }
    })
}
...
```
## Redisஐ
### Redis是什么？
> **`Redis` 是一款内存高速缓存数据库**
### 为什么要使用Redis?
> **我们目前用的是`Django`自带的数据库`Sqlite`。`Django`是很容易将数据库迁移到`mySQL`的。但是存储效率不如`redis`，因为`redis`是内存数据库，所以调用东西都非常快，存的是一个一个的`<key, value>`，而且是单线程的**
### 在Django中集成Redis
1. 安装 `django_redis`
```
pip install django_redis
```
2. 配置 `settings.py`
```
CACHES = { 
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },  
    },  
}
USER_AGENTS_CACHE = 'default'
```
3. 启动 `redis-server`
```
sudo redis-server /etc/redis/redis.conf
```
### 在 Django 后台里操纵 Redis
```
$ python3 manage.py shell'

In [1]: from django.core.cache import cache # 引入redis

In [2]: cache.keys('*')                     # 查询redis里所有的关键字
Out[2]: []

In [3]: cache.set('yxc', 1, 5)              # 插入一个key-val，存在 5 s
Out[3]: True

In [4]: cache.keys('*')                     # 查询redis里所有的关键字
Out[4]: ['yxc']

In [5]: cache.set('yxc', 2, None)           # 插入一个key-val，不会过期
Out[5]: True

In [6]: cache.set('abc', 3, None)
Out[6]: True

In [7]: cache.keys('y*')
Out[7]: ['yxc']

In [8]: cache.has_key('abc')
Out[8]: True

In [9]: cache.has_key('abcd')
Out[9]: False

In [10]: cache.get('yxc')
Out[10]: 2

In [11]: cache.delete('yxc')
Out[11]: True

In [12]: cache.keys('*')
Out[12]: ['abc']

In [13]:
```
## Web端AcWing一键登录ஐ
- [6.2 Web端AcWing一键登录 | 讲义](https://www.acwing.com/blog/content/12466/)
- [6.2 上课笔记 | Andrew1729](https://www.acwing.com/solution/content/79354/)
- [6.2 Web端AcWing一键登录 | Vedio](https://www.acwing.com/video/3565/) 
	1. **Oauth2一键授权登录的基本原理**：$17m30s——29m15s——32m51s$
	2. 数据表添加`openid`信息：$33m20s——34m47s$
	3. **Oauth2一键授权登录的代码实现**：$35m20s——1h25s——1h27m20s$
***
> **用户点击`AcWing一键登录`，通过`urls & views`调用`apply_code`函数，将`state`放到`redis`中，将`appid & redirect_uri & scope & state` 传入`apply_code_url`链接，返回并重定向至`apply_code_url`向用户询问是否授权**
> 
> **用户点击`同意`后，重定向至`redirect_uri`链接，返回参数为`code`和`state`，通过`urls & views`调用`receive_code`函数**
> 
> **若验证`state`失败，直接重定向至初始界面**
> 
> **若验证`state`成功，将`appid & code & secret`发送至`AcWing服务器`，申请授权令牌`access_token`和用户的`openid`**
> 
> **若申请令牌成功，将`access_token & openid`发送至`AcWing服务器`，得到用户信息，创建并登录用户，最后重定向至初始界面**
## AcApp端AcWing一键登录ஐ
- [6.3 AcApp端AcWing一键登录 | 讲义](https://www.acwing.com/blog/content/12467/)
- [6.3 上课笔记 | Andrew1729](https://www.acwing.com/solution/content/79365/)
- [6.3 Acapp端AcWing一键登录 | Vedio](https://www.acwing.com/video/3566/) 
	1. **Oauth2一键授权登录的基本原理**：$10m——12m20s——16m35s——18m$
	2. **Oauth2一键授权登录的代码实现**：$19m25s——21m——23m25s——34m29s——42m10s$
***
# 实现联机对战ஐ
- [7. 实现联机对战 | 讲义](https://www.acwing.com/file_system/file/content/whole/index/content/3357332/)
- [7.1 上课笔记 | 大菜狗](https://www.acwing.com/solution/content/89506/)
- [7.2 上课笔记 | 菊花](https://www.acwing.com/solution/content/88801/)
***
## 统一长度单位
由于联机对战的时候，每个用户的客户端长宽不一样

在之前完成的游戏界面里，我们会根据当前客户端的大小，进行渲染

但是在联机对战的时候，应当让所有玩家的游戏界面保持同步才可以

所有，就引入了 **统一长度单位** 的目标

### 地图渲染
#### 地图 16:9 等比例缩放
实现逻辑：根据当前用户的客户端大小，统一渲染成 **16:9** 的游戏界面，且随着用户调整窗口大小，也动态调整

`js/src/playground/zbase.js`
```js
class AcGamePlayground {
    constructor(root) {
        ...
        this.root.$ac_game.append(this.$playground);// 未来可能会多次 show 因此把创建场景挪到这里
        ...
    }
    ...
    start() {
        let outer = this;
        $(window).resize(function() {
            outer.resize();
        });
    }
    resize() {
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        let unit = Math.min(this.width / 16, this.height / 9);  // 以最小的作为基准，渲染
        this.width = unit * 16;
        this.height = unit * 9;

        this.resize();

        this.scale = this.height;   // resize时，其他元素的渲染大小都以当前渲染的高度为基准，存为 scale 变量

        if (this.game_map) this.game_map.resize();  //如果此时地图已创建，则resize一下
    }
    show() {    // 打开 playground 界面
        this.$playground.show();
        this.resize();
        ...

    }
    ...
}
```
`js/src/playground/game_map/zbase.js`
```js
class GameMap extends AcGameObject {
    ...
    resize() {
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
    }
    ...
}
```
#### 地图居中
直接把 `canvas` 元素，用相对位置居中即可

`css/game.css`
```css
...
.ac-game-playground {
    ...
    background-color: grey;
}
.ac-game-playground > canvas {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
#### 解决地图 resize 时，会出现渐变成黑色的情况
原由是因为我们的实现逻辑是：每帧会渲染一层半透明的黑色背景

也就造就了一开始会出现灰屏的情况，解决方法很简单，直接 resize 完，强制涂一层不透明的黑色即可

`js/src/playground/game_map/zbase.js`
```js
class GameMap extends AcGameObject {
    ...
    resize() {
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.ctx.fillStyle = "rgba(0, 0, 0, 1)";    // resize 完，涂一层不透明的即可
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    ...
}
```
### 元素渲染
地图随着尺寸等比例放大缩小的同时，地图内的其他元素也应与背景一同等比例放大缩小

因此，我们只需把元素全部设为相对大小即可，用我们先前设置的 playground.scale 值即可
#### 玩家 Player
初始化的时候，转为传递 **scale** 的比例值

`js/src/playground/zbase.js`
```js
class AcGamePlayground {
    ...
    show() {    // 打开 playground 界面
        ...
        this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, "white", 0.15, true));
        for (let i = 0; i < 5; i ++ ) {
            this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, this.get_random_color(), 0.15, false));
        }

    }
}
```
`js/src/playground/player/zbase.js`
```js
class Player {
    ...
    start() {
        if (this.is_me) {
            ...
        } else {
            let tx = Math.random() * this.playground.width / this.playground.scale;
            let ty = Math.random() * this.playground.height / this.playground.scale;
            ...
        }
    }
    add_listening_events() {
        ...
        this.playground.game_map.$canvas.mousedown(function(e) {
            ...
            if (e.which === 3) {
                outer.move_to((e.clientX - rect.left) / outer.playground.scale, (e.clientY - rect.top) / outer.playground.scale);
            } else if (e.which === 1) {
                if (outer.cur_skill === "fireball") {
                    outer.shoot_fireball((e.clientX - rect.left) / outer.playground.scale, (e.clientY - rect.top) / outer.playground.scale);
                }
            }
            ...
        });
        ...
    }
    shoot_fireball(tx, ty) {
        let x = this.x, y = this.y;
        let radius = 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = "orange";
        let speed = 0.5;
        let move_length = 1.0;
        let damage = 0.01;
        new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length, damage);
    }
    ...
    update() {
        this.update_move();
        this.render();
    }
    update_move() { // 更新玩家移动
        ...
        if (!this.is_me && this.spent_time > 4 && Math.random() * 180 < 1) {
            ...
        }
        if (this.damage_speed > this.eps) {
            ...
        } else {
            if (this.move_length < this.eps) {
                ...
                if (!this.is_me) {
                    let tx = Math.random() * this.playground.width / this.playground.scale;
                    let ty = Math.random() * this.playground.height / this.playground.scale;
                    ...
                }
            } else {
                ...
            }
        }
    }
    render() {
        let scale = this.playground.scale;
        if (this.is_me) {
            ...
            this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, false);
            ...
            this.ctx.drawImage(this.img, (this.x - this.radius) * scale, (this.y - this.radius) * scale, this.radius * 2 * scale, this.radius * 2 * scale);
            ...
        } else {
            ...
            this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, 2 * Math.PI, false);
            ...
        }
    }
}
```
#### 火球 Fireball
`js/src/playground/skill/fireball/zbase.js`
```js
class Fireball {
    ...
    render() {
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
```
#### 粒子 Particle
`js/src/playground/particle/zbase.js`
```js
class Particle {
    ...
    render() {
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
```
## 增加“联机对战”模式
为了区分：用户自己，机器人，联机玩家

需要把 `is_me` 改成字符串，用以表示不同 **Player**

`menu/zbase.js`
```js
class AcGameMenu{
    ...
    add_listening_events() {
        ...
        this.$single_mode.click(function(){
            outer.hide();
            outer.root.playground.show("single mode");
        });
        this.$multi_mode.click(function() {
            outer.hide();
            outer.root.playground.show("multi mode");
        });
        ...
    }
    ...
}
```
`playground/zbase.js`
```js
class Playground {
    ...
    show(mode) {    // 打开 playground 界面
        ...
        this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, "white", 0.15, "me", this.root.settings.username, this.root.settings.photo)));
        if (mode === "single mode") {
            for (let i = 0; i < 5; i ++ ) {
                this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, this.get_random_color(), 0.15, "robot"));
            }
        } else if (mode === "multi mode") {
        }

    }
    ...
}
```
`playground/player/zbase.js`
```js
class Player extends AcGameObject {
    constructor(playground, x, y, radius, color, speed, character, username, photo) {
        ...
        this.character = character;
        this.username = username;
        this.photo = photo;
        ...
        if (this.character !== "robot") {
            this.img = new Image();
            this.img.src = this.photo;
        }
    }
    ...
    // 同理，根据对应的逻辑，修改后面所有的 is_me 为 character
}
```
## Django_channels
- [谈谈Websocket ](https://www.jianshu.com/p/bcefda55bce4)
- [HTTP/TCP](https://www.cnblogs.com/dreamroute/p/6247726.html)
***
### Django_channels是什么？
> **Django_Channels 是一个为Django 提供异步扩展的库，通常主要用来提供WebSocket 支持和后台任务**
>
> **`WSS` 是 `Web Socket` 协议的安全模式，支持 `C/S` 下的双向通信（HTTP协议只支持单向通信）**
### 配置Django_channels
1. 安装 `channels_redis`
```
pip install channels_redis
```
2. 配置 `acapp/asgi.py`
```
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from game.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'acapp.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
})
```
3. 配置 `acapp/settings.py`

在 `INSTALLED_APPS` 中添加 `channels` ，添加后如下所示：
```
INSTALLED_APPS = [ 
    'channels',
    'game.apps.GameConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```
然后在文件末尾添加：
```
ASGI_APPLICATION = 'acapp.asgi.application'
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}
```
4. 配置 `game/routing.py`
这一部分的作用相当于 `http` 的 `urls`

内容如下：
```
from django.urls import path

websocket_urlpatterns = [
]
```
5. 编写 `game/consumers`
这一部分的作用相当于 `http` 的 `views`

参考示例：

`consumers/multiplayer/index.py`
```
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print('accept')

        self.room_name = "room"
        await self.channel_layer.group_add(self.room_name, self.channel_name)

    async def disconnect(self, close_code):
        print('disconnect')
        await self.channel_layer.group_discard(self.room_name, self.channel_name);


    async def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
```
6. 启动 `django_channels`

在 `~/acapp` 目录下执行：
```
daphne -b 0.0.0.0 -p 5015 acapp.asgi:application
```
7. 建立 **WSS** 连接

`game/routing.py`
```
from django.urls import path
from game.consumers.multiplayer.index import MultiPlayer

websocket_urlpatterns = [
    path("wss/multiplayer/", MultiPlayer.as_asgi(), name="wss_multiplayer"),
]
```
`playground/zbase.js`
```
class AcGamePlayground {
    ...
    show(mode) {    // 打开 playground 界面
        ...
        if (mode === "single mode") {
            ...
        } else if (mode === "multi mode") {
            this.mps = new MultiPlayerSocket(this);
            this.mps.ws.onopen = function() {
                outer.mps.send_create_player();
            };
        }

    }
}
```
`playground/socket/multiplayer/zbase.js`
```
class MultiPlayerSocket {
    constructor(playground) {
        this.playground = playground;
        this.ws = new WebSocket("wss://app1117.acapp.acwing.com.cn/wss/multiplayer/");
        this.start();
    }
    start() {
    }
    send_create_player() {
        this.ws.send(JSON.stringify({
            'message': 'hello acapp server',
        }));
    }
    receive_create_player() {
    }
}
```
## 编写同步函数
一共需要完成四个通信：

（通信的逻辑基本都是先在本地完成，然后将结果返回给服务器，服务器再分发给其他客户端，达成同步）

1. **create-player** : 在所有玩家的游戏界面，创建一个新加入的玩家
2. **move-to** : 在所有玩家的游戏界面，将一个角色移动到一个位置
3. **shoot-fireball** : 在所有玩家的游戏界面，让一个角色发射一个火球
4. **attack** : 在所有玩家的游戏界面，让一个角色被攻击

一场游戏里，所有的元素（玩家，火球等）都需要唯一的标识，来方便同步

为此，我们可以直接修改一下游戏引擎，对于每个元素都创建我们需要的唯一标识

`playground/ac-game-object/zbase.js`
```js
class AcGameObject {
    constructor() {
        ...
        this.uuid = this.create_uuid();
    }
    create_uuid() {
        let res = "";
        for (let i = 0; i < 8; i ++ ) {
            let x = parseInt(Math.floor(Math.random() * 10));   // [0, 10)
            res += x;
        }
        return res;
    ...
}
```
`playground/zbase.js`
```js
class AcGamePlayground {
    ...
    show(mode) {
        ...
        if (mode === "single mode") {
            ...
        } else if (mode === "multi mode") {
            this.mps = new MultiPlayerSocket(this);
            this.mps.uuid = this.players[0].uuid;
            this.mps.ws.onopen = function() {
                outer.mps.send_create_player();
            };
        }
    }
    ...
}
```
`playground/socket/multiplayer/zbase.js`
```js
class MultiPlayerSocket {
    ...
    send_create_player() {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': 'create_player',
            'uuid': outer.uuid,
        }));
    }
}
```
接着，利用通信的方式，使得每个窗口内，逻辑上相同的元素，其 `uid` 也相同即可

原则是：哪个窗口创建的元素，就用他创建时的 `uid` 作为整个项目运行时的 `uid`

然后，我们打算用 **redis** 来实现存储每个游戏房间，以及元素，并初始默认设定每个房间上限 3 人
### create-player
#### 前端
`game/static/js/src/playground/socket/multiplayer/zbase.js`
```
class MultiPlayerSocket {
    constructor(playground) {
        this.playground = playground;

        this.ws = new WebSocket("wss://app1117.acapp.acwing.com.cn/wss/multiplayer/");

        this.start();
    }
    start() {
        this.receive();
    }
    receive() {
        let outer = this;
        this.ws.onmessage = function(e) {
            let data = JSON.parse(e.data);
            let uuid = data.uuid;
            if (uuid === outer.uuid) return false;

            let event = data.event;
            if (event === "create_player") {
                outer.receive_create_player(uuid, data.username, data.photo);
            }
        };
    }
    send_create_player(username, photo) {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': 'create_player',
            'uuid': outer.uuid,
            'username': username,
            'photo': photo,
        }));
    }
    receive_create_player(uuid, username, photo) {
        let player = new Player(
            this.playground,
            this.playground.width / 2 / this.playground.scale,
            0.5,
            0.05,
            "white",
            0.15,
            "enemy",
            username,
            photo,
        );
        player.uuid = uuid;
        this.playground.players.push(player);
    }
}
```
#### 后端
`settings.py`
```
...
ROOM_CAPACITY = 3
```
`consumers/multiplayer/index.py`
```
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.conf import settings
from django.core.cache import cache

class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = None
        for i in range(1000):   # 上限 1k 个房间
            name = "room-%d" % (i)
            # 当前房间为空，或房间内玩家人数不到 ROOM_CAPACITY
            if not cache.has_key(name) or len(cache.get(name)) < settings.ROOM_CAPACITY:
                self.room_name = name
                break
        if not self.room_name:
            return

        await self.accept()

        if not cache.has_key(self.room_name):   # 如果房间不存在，则新建房间
            cache.set(self.room_name, [], 3600) # 有效期 1 小时

        for player in cache.get(self.room_name):    # 对该房间已存在的用户，创建到新加入的用户的游戏界面中
            await self.send(text_data=json.dumps({
                'event': "create_player",
                'uuid': player['uuid'],
                'username': player['username'],
                'photo': player['photo'],
            }))
        await self.channel_layer.group_add(self.room_name, self.channel_name)

    async def disconnect(self, close_code):
        print('disconnect')
        await self.channel_layer.group_discard(self.room_name, self.channel_name);

    async def create_player(self, data):
        players = cache.get(self.room_name)
        players.append({
            'uuid': data['uuid'],
            'username': data['username'],
            'photo': data['photo'],
        })
        cache.set(self.room_name, players, 3600) # 更新房间存在时间为 1 小时（最后一次加入一名玩家时）
        # 群发消息更新
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': "group_create_player",  # 群发该消息后，作为客户端接受者，所接受用的函数名
                'event': "create_player",
                'uuid': data['uuid'],
                'username': data['username'],
                'photo': data['photo'],
            }
        )
    async def group_create_player(self, data):
        await self.send(text_data=json.dumps(data))

    async def receive(self, text_data):
        data = json.loads(text_data)
        event = data['event']
        if event == "create_player":
            await self.create_player(data)
```
#### redis 调试语句
打开 shell 交互
```
python3 manage.py shell
```
然后用 py3 交互进行 cache 调试
```
from django.core.cache import cache

def clear():
    for key in cache.keys('*'):
        cache.delete(key)

cache.keys('*') # 查询当前 redis 中所有 key

cache.get('room-1') # 查询当前 redis 中 key 为 room-1 的值
```
到目前为止，便可以在不同的窗口渲染同一批玩家了
### move-to
#### 前端
客户端的通信的发出和接受函数

`game/static/js/src/playground/socket/multiplayer/zbase.js`
```
class MultiPlayerSocket {
    ...
    receive() {
        let outer = this;
        this.ws.onmessage = function(e) {
            ...
            else if (event === "move_to") {
                outer.receive_move_to(uuid, data.tx, data.ty);
            }
        };
    }
    send_move_to(tx, ty) {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': 'move_to',
            'uuid': outer.uuid,
            'tx': tx,
            'ty': ty,
        }));
    }
    get_player(uuid) {
        let players = this.playground.players;
        for (let i = 0; i < players.length; i ++ ) {
            let player = players[i];
            if (player.uuid === uuid) {
                return player;
            }
        }
        return null;
    }
    receive_move_to(uuid, tx, ty) {
        let player = this.get_player(uuid);
        if (player) {
            player.move_to(tx, ty);
        }
    }
}
```
为了让游戏界面中对于要移动的元素做出移动动作，需要对 `move_to` 函数做出一些修改

首先要标识出当前为多人模式，然后模式为多人模式时，每次移动都会触发一次通信

`playground/zbase.js`
```
class AcGamePlayground {
    ...
    show(mode) {
        ...
        this.mode = mode;
    }
}
```
`playground/player/zbase.js`
```
class Player extends AcGameObject {
    ...
    add_listening_events() {
      ...
       this.playground.game_map.$canvas.mousedown(function(e) {
           ...
           if (e.which === 3) {
               let tx = (e.clientX - rect.left) / outer.playground.scale;
               let ty = (e.clientY - rect.top) / outer.playground.scale;
               outer.move_to(tx, ty);
               if (outer.playground.mode === "multi mode") {
                   outer.playground.mps.send_move_to(tx, ty);
               }
           }
           ...
   }
   ...
}
```
#### 后端
`consumers/multiplayer/index.py`
```
async def move_to(self, data):
    await self.channel_layer.group_send(
        self.room_name,
        {
            'type': "group_send_event",
            'event': "move_to",
            'uuid': data['uuid'],
            'tx': data['tx'],
            'ty': data['ty'],
        }
    )

async def group_send_event(self, data):
    await self.send(text_data=json.dumps(data))

async def receive(self, text_data):
    data = json.loads(text_data)
    event = data['event']
    if event == "create_player":
        await self.create_player(data)
    elif event == "move_to":
        await self.move_to(data)
```
### shoot-fireball
#### 前端
用一个数组来存一个玩家发射的所有火球，以便于子弹消失时，将他们找出并对应删掉

`playground/player/zbase.js`
```
class Player extends AcGameObject {
    constructor(playground, x, y, radius, color, speed, character, username, photo) {
        ...
        this.fireballs = [];    // 存该用户发射的所有火球
    }
    add_listening_events() {
        ...
        this.playground.game_map.$canvas.mousedown(function(e) {
            ...
            else if (e.which === 1) {
                let tx = (e.clientX - rect.left) / outer.playground.scale;
                let ty = (e.clientY - rect.top) / outer.playground.scale;
                if (outer.cur_skill === "fireball") {
                    let fireball = outer.shoot_fireball(tx, ty);
                    if (outer.playground.mode === "multi mode") {
                        outer.playground.mps.send_shoot_fireball(tx, ty, fireball.uuid);
                    }
                }
            }
            ...
        });
        $(window).keydown(function(e) {
            if (e.which === 81) {           // 键盘按下q事件
                outer.cur_skill = "fireball";
                return false;
            }
        });
    }
    ...
    shoot_fireball(tx, ty) {
        ...

        let fireball = new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length, damage);
        this.fireballs.push(fireball);
        return fireball;
    }
    destroy_fireball(uuid) {
        for (let i = 0; i < this.fireballs.length; i ++ ) {
            let fireball = this.fireballs[i];
            if (fireball.uuid == uuid) {
                fireball.destroy();
                break;
            }
        }
    }
    ...
```
`playground/skill/fireball/zbase.js`
```
class FireBall extends AcGameObject {
    ...
    on_destory() {
        let fireballs = this.player.fireballs;
        for (let i = 0; i < fireballs.length; i ++ ) {
            if (fireballs[i] === this) {
                fireballs.splice(i, 1);
                break;
            }
        }
    }
}
```
`game/static/js/src/playground/socket/multiplayer/zbase.js`
```
class MultiPlayerSocket {
    ...
    send_shoot_fireball(tx, ty, ball_uuid) {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': 'move_to',
            'uuid': outer.uuid,
            'tx': tx,
            'ty': ty,
            'ball_uuid': ball_uuid;
        }));
    }
    receive_shoot_fireball(uuid, tx, ty, ball_uuid) {
        let player = this.get_player(uuid);
        if (player) {
            let fireball = player.shoot_fireball(tx, ty);
            fireball.uuid = ball_uuid;
        }
    }
}
```
#### 后端
`consumers/multiplayer/index.py`
```
...
class MultiPlayer(AsyncWebsocketConsumer):
    ...
    async def shoot_fireball(self, data):
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': "group_send_event",
                'event': "shoot_fireball",
                'uuid': data['uuid'],
                'tx': data['tx'],
                'ty': data['ty'],
                'ball_uuid': data['ball_uuid'],
            }
        )
    async def receive(self, text_data):
        ...
        elif event == "shoot_fireball":
            await self.shoot_fireball(data)
```
### attack 
为了只让一个客户端进行攻击命中的判断，因此只有发出方的火球才做碰撞检测

其他客户端对于该火球只有动画效果

又由于碰撞检测是在一台客户端上进行的，因此多端之间可能会存在同步上的延迟

为此的解决方法是：碰撞检测成功时，强制把被击中玩家移动到发起方客户端中的位置，以避免击中延迟上发生的事情 
#### 前端
`playground/skill/fireball/zbase.js`
```
class FireBall extends AcGameObject {
    update() {
        if (this.move_length < this.eps) {
            this.destroy();
            return false;
        }
        this.update_move();

        if (this.player.character !== "enemy") {
            this.update_attack();
        }
        this.render();
    }
    attack(player) {
        ...
        if (this.playground.mode === "multi mode") {
            this.playground.mps.send_attack(player.uuid, player.x, player.y, angle, this.damage, this.uuid);
        }
        ...
    }
    ...
}
```
`playground/player/zbase.js`
```
class Player extends AcGameObject {
    ...
    receive_attack(x, y, angle, damage, ball_uuid, attacker) {
        attacker.destroy_fireball(ball_uuid);
        this.x = x;
        this.y = y;
        this.is_attacked(angle, damage);
    }
    ...
}
```
`game/static/js/src/playground/socket/multiplayer/zbase.js`
```
class MultiPlayerSocket {
    ...
    send_attack(attackee_uuid, x, y, angle, damage, ball_uuid) {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "attack",
            'uuid': outer.uuid,
            'attackee_uuid': attackee_uuid,
            'x': x,
            'y': y,
            'angle': angle,
            'damage': damage,
            'ball_uuid': ball_uuid,
        }));
    }
    receive_attack(uuid, attackee_uuid, x, y, angle, damage, ball_uuid) {
        let attacker = this.get_player(uuid);
        let attackee = this.get_player(attackee_uuid);
        if (attacker && attackee) {
            attackee.receive_attack(x, y, angle, damage, ball_uuid, attacker);
        }
    }
}
```
#### 后端
`consumers/multiplayer/index.py`
```
...
class MultiPlayer(AsyncWebsocketConsumer):
    ...
    async def attack(self, data):
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': "group_send_event",
                'event': "attack",
                'uuid': data['uuid'],
                'x': data['x'],
                'y': data['y'],
                'angle': data['angle'],
                'damage': data['damage'],
                'ball_uuid': data['ball_uuid'],
            }
        )
    ...
```
## 游戏的小优化
### 多人模式下游戏没有开始前，玩家不可以移动
为此我们先引入一个状态机：`'waiting' -> 'fighting' -> 'over'` 来标识当前游戏进行的状态

然后用一个 `notice_board` 计分板在前端显示出来

实现的逻辑就是：游戏初始时为 `waiting` 状态，房间内人数满 3 人时，才会进入 `fighting`，角色死亡时为 `over`

且发射火球，移动等行为，当且仅当玩家状态为 `fighting` 时，才可以做

然后设定火球技能的 cd 为 3 秒，且在游戏进入 `fighting` 时，先自动进入 cd 状态

这样就实现了初始 3 秒内，任何玩家不可攻击

`js/src/playground/notice_board/zbase.js`
```
class NoticeBoard extends AcGameObject {
    constructor(playground) {
        super();

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.text = "已就绪：0人";
    }
    start() {
    }

    write(text) {
        this.text = text;
    }

    update() {
        this.render();
    }

    render() {
        this.ctx.font = "20px serif";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.text, this.playground.width / 2, 20);
    }
}
```
`js/src/playground/zbase.js`
```
class AcGamePlayground {
    ...
    show(mode) {
        ...
        this.state = "waiting";     // waiting -> fighting -> over
        this.notice_board = new NoticeBoard(this);
        this.player_count = 0;
        ...
    }
}
```
`js/src/playground/player/zbase.js`
```
class Player extends AcGameObject {
    ...
    add_listening_events() {
        ...
        this.playground.game_map.$canvas.mousedown(function(e) {
            if (outer.playground.state !== "fighting")
                return false;
            ...
        }
        $(window).keydown(function(e) {
            if (outer.playground.state !== "fighting")
                return false;
            ...
        });
    }
    start() {
        this.playground.player_count ++ ;
        this.playground.notice_board.write("已就绪：" + this.playground.player_count + "人");
        if (this.playground.player_count >= 3) {
            this.playground.state = "fighting";
            this.playground.notice_board.write("Fighting");
        }
        ...
    }
    ...
}
```
### 技能CD
给火球技能设置 3s 的 cd，实现逻辑很简单，设定一个 cool_time 变量，每次渲染的时候减去上次渲染的时间间隔

然后 cool_time 为 0 时，技能才可以成功释放

另外修改冷却时间，只用修改自己的即可

`js/src/playground/player/zbase.js`
```
class Player extends AcGameObject {
    constructor(...) {
        ...
        if (this.character === "me") {
            this.fireball_coldtime = 3; // 单位：s
        }
    }
    ...
    add_listening_events() {
        ...
        this.playground.game_map.$canvas.mousedown(function(e) {
            ...
            else if (e.which === 1) {
                ...
                if (outer.cur_skill === "fireball") {
                    ...
                    if (outer.playground.mode === "multi mode") {
                        outer.playground.mps.send_shoot_fireball(tx, ty, fireball.uuid);
                    }
                    outer.fireball_coldtime = 3;
                }
            }
            ...
        });
        $(window).keydown(function(e) {
            ...
            if (outer.fireball_coldtime >= outer.eps)
                return false;
            ...
        });
    }
    update() {
        ...
        if (this.character === "me" && this.playground.state === "fighting") {
            this.update_coldtime();
        }
        ...
    }
    update_coldtime() {
        this.fireball_coldtime -= this.timedelta / 1000;
        this.fireball_coldtime = Math.max(0, this.fireball_coldtime);
    }
    ...
}
```
### 用图片来渲染技能CD
`js/src/playground/player/zbase.js`
```
class Player extends AcGameObject {
    constructor(...) {
        ...
        if (this.character === "me") {
            this.fireball_coldtime = 3; // 单位：s
            this.fireball_img = new Image();
            this.fireball_img.src = "https://cdn.acwing.com/media/article/image/2021/12/02/1_9340c86053-fireball.png";
        }
    }
    ...
    render() {
        ...
        if (this.character === "me" && this.playground.state === "fighting") {
            this.render_skill_coldtime();
        }
    }
     render_skill_coldtime() {
        let scale = this.playground.scale;
        let x = 1.5, y = 0.9, r = 0.04;

        // 渲染技能图标
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x * scale, y * scale, r * scale, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.fireball_img, (x - r) * scale, (y - r) * scale, r * 2 * scale, r * 2 * scale);
        this.ctx.restore();

        // 渲染冷却指示
        if (this.fireball_coldtime >= this.eps){
            this.ctx.beginPath();
            this.ctx.moveTo(x * scale, y * scale);
            this.ctx.arc(x * scale, y * scale, r * scale, 0 - Math.PI / 2, Math.PI * 2 * (1 - this.fireball_coldtime / 3) - Math.PI / 2, true);
            this.ctx.lineTo(x * scale, y * scale);
            this.ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
            this.ctx.fill();
        }
    }
    ...
```
### 添加一个闪现技能
#### 单机部分
`js/src/playground/player/zbase.js`
```
class Player extends AcGameObject {
    constructor(...) {
        ...
        if (this.character === "me") {
            ...
            this.blink_coldtime = 5;
            this.blink_img = new Image();
            this.blink_img.src = "https://cdn.acwing.com/media/article/image/2021/12/02/1_daccabdc53-blink.png";
        }
    }
    add_listening_events() {
        ...
        this.playground.game_map.$canvas.mousedown(function(e) {
            ...
            else if (e.which === 1) {
                ...
                else if (outer.cur_skill === "blink") {
                    outer.blink(tx, ty);
                    // 同步函数
                    if (outer.playground.mode === "multi mode") {
                        outer.playground.mps.send_blink(tx, ty);
                    }
                    outer.blink_coldtime = 5;
                }
            }
            outer.cur_skill = null; // 清空当前技能
        });
        $(window).keydown(function(e) {
            ...
            else if (e.which === 70) {    // f键
                if (outer.blink_coldtime >= outer.eps) return true;
                outer.cur_skill = "blink";
                return false;
            }
        });
    }
    ...
    blink(tx, ty) {
        let d = this.get_dist(this.x, this.y, tx, ty);
        d = Math.min(d, 0.5);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.x += d * Math.cos(angle);
        this.y += d * Math.sin(angle);

        this.move_length = 0;   // 闪现完停下来
    }
    ...
    render_skill_coldtime() {
        ...
        x = 1.62, y = 0.9, r = 0.04;
        // 闪现技能
        // 渲染技能图标
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x * scale, y * scale, r * scale, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.clip();
        this.ctx.drawImage(this.blink_img, (x - r) * scale, (y - r) * scale, r * 2 * scale, r * 2 * scale);
        this.ctx.restore();

        // 渲染冷却指示
        if (this.blink_coldtime >= this.eps){
            this.ctx.beginPath();
            this.ctx.moveTo(x * scale, y * scale);
            this.ctx.arc(x * scale, y * scale, r * scale, 0 - Math.PI / 2, Math.PI * 2 * (1 - this.blink_coldtime / 5) - Math.PI / 2, true);
            this.ctx.lineTo(x * scale, y * scale);
            this.ctx.fillStyle = "rgba(0, 0, 255, 0.6)";
            this.ctx.fill();
        }
    }
}
```
#### 联机部分
`game/static/js/src/playground/socket/multiplayer/zbase.js`
```
class MultiPlayerSocket {
    ...
    send_blink(tx, ty) {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "blink",
            'uuid': outer.uuid,
            'tx': tx,
            'ty': ty,
        }));
    }
    receive_blink(uuid, tx, ty) {
        let player = this.get_player(uuid);
        if (player) {
            player.blink(tx, ty);
        }
    }
}
```
`consumers/multiplayer/index.py`
```
...
class MultiPlayer(AsyncWebsocketConsumer):
    ...
    async def blink(self, data):
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': "group_send_event",
                'event': "blink",
                'uuid': data['uuid'],
                'tx': data['tx'],
                'ty': data['ty'],
            }
        )
```
# 实现聊天系统ஐ
- [8.1 上课笔记 | 大菜狗](https://www.acwing.com/solution/content/89508/)
***
## 优化键盘绑定事件
这部分算是之前的遗留问题，先前的 `keydown` 监听事件绑定在了 `window` 上会出现一个问题

如果在一个浏览器内打开多个 `ACAPP`，此时按下键位触发 `keydown` 事件，会被浏览器内所有的 `ACAPP` 都捕获到

之前影响不大，但对此次要实现的聊天系统就有着致命的影响，即打开一个 `ACAPP` 的聊天栏，其他都会被打开

所有我们要将 `keydown` 监听事件绑定到 `canvas` 上

`playground/player/zbase.js`
```
class Player extends AcGameObject {
    ...
    add_listening_events() {
        ...
        this.playground.game_map.$canvas.keydown(function(e) {
            if (outer.playground.state !== "fighting")
                return true;
            if (e.which === 81) {           // 键盘按下q事件
                if (outer.fireball_coldtime >= outer.eps) return true;
                outer.cur_skill = "fireball";
                return false;
            } else if (e.which === 70) {    // f键
                if (outer.blink_coldtime >= outer.eps) return true;
                outer.cur_skill = "blink";
                return false;
            }
        });
    }
}
```
`playground/game-map/zbase.js`
```
class GameMap extends AcGameObject {
    constructor(playground) {
        ...
        this.$canvas = $(`<canvas tabindex=0></canvas>`);
        ...
    }
    start() {
        this.$canvas.focus();
    }
}
```
## 本地前端
要实现两个部分： 1. 文本输入框（让用户输入要发送的信息） 2. 历史记录显示框（之前用户发送的信息的显示框）

欲实现逻辑：用户按下 `<Enter>` 后，游戏界面弹出文本输入框，然后聚焦于文本输入框，且同时弹出历史记录显示框 3 秒

然后用户输入信息后，按下 `<Enter>` 后发出信息，接着信息会显示在历史记录显示框最下方，并弹出历史记录显示框 3 秒

`playground/chat_field/zbase.js`

`chat field` 负责管理 文本输入框 和 历史记录显示框
```
class ChatField {
    constructor(playground) {
        this.playground = playground;

        this.$history = $(`<div class="ac-game-chat-field-history"></div>`);
        this.$input = $(`<input type="text" class="ac-game-chat-field-input">`);

        this.$history.hide();
        this.$input.hide();

        this.func_id = null;

        this.playground.$playground.append(this.$history);
        this.playground.$playground.append(this.$input);

        this.start();
    }

    start() {
        this.add_listening_events();
    }
    add_listening_events() {
        let outer = this;
        this.$input.keydown(function(e) {
            if (e.which === 27) {   //ESC
                outer.hide_input();
                return false;
            } else if (e.which === 13) {
                let username = outer.playground.root.settings.username;
                let text = outer.$input.val();
                if (text) {
                    outer.$input.val("");
                    outer.add_message(username, text);
                }
                return false;
            }
        });
    }
    show_history() {
        let outer = this;
        this.$history.fadeIn();
        if (this.func_id) clearTimeout(this.func_id);
        this.func_id = setTimeout(function() {
            outer.$history.fadeOut();
            outer.func_id = null;
        }, 3000);
    }
    render_message(message) {
        return $(`<div>${message}</div>`);
    }
    add_message(username, text) {
        this.show_history();
        let message = `[${username}] ${text}`;
        this.$history.append(this.render_message(message));
        this.$history.scrollTop(this.$history[0].scrollHeight);
    }
    show_input() {
        this.show_history();
        this.$input.show();
        this.$input.focus();    // 输入时，聚焦于输入框
    }
    hide_input() {
        this.$input.hide();
        this.playground.game_map.$canvas.focus();   // 退出时，聚焦回游戏界面
    }
}
```
`playground/zbase.js`

把它创建出来

```
class AcGamePlayground {
    ...
    show(mode) {    //打开 playground 界面
        ...
        else if (mode === "multi mode") {
            this.chat_field = new ChatField(this);
            ...
        }

    }
}
```
`playground/player/zbase.js`

添加监听事件

```
class Player extends AcGameObject {
    ...
    add_listening_events() {
        ...
        this.playground.game_map.$canvas.keydown(function(e) {
            if (e.which === 13) {   // enter (显示对话框)
                if (outer.playground.mode === "multi mode") {
                    outer.playground.chat_field.show_input();
                    return false;
                }
            } else if (e.which === 27) {    // esc（关闭对话框）
                if (outer.playground.mode === "multi mode") {
                    outer.playground.char_field.hide_input();
                    return false;
                }
            }
            ...
        }
    }
}
```
`game.css`
```
...
.ac-game-chat-field-history {
    position: absolute;
    top: 66%;
    left: 20%;
    transform: translate(-50%, -50%);
    width: 20%;
    height: 32%;
    color: white;
    font-size: 2vh;
    padding: 5px;
    overflow: auto;
}

.ac-game-chat-field-history::-webkit-scrollbar {
    width: 0;
}

.ac-game-chat-field-input {
    position: absolute;
    top: 86%;
    left: 20%;
    transform: translate(-50%, -50%);
    width: 20%;
    height: 3vh;
    color: white;
    font-size: 2vh;
    background-color: rgba(222,225,230, 0.2);
}
```
## 联机聊天窗
### 前端
`playground/chat_field/zbase.js`
```
class ChatField {
    ...
    add_listening_events() {
        ...
        this.$input.keydown(function(e) {
            ...
            else if (e.which === 13) {
                ...
                if (text) {
                    ...
                    outer.playground.mps.send_message(text);
                }
                ...
            }
        });
    }
    ...
}
```
`js/src/playground/socket/multiplayer/zbase.js`
```
class MultiPlayerSocket {
    ...
    send_message(text) {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "message",
            'uuid': outer.uuid,
            'username': outer.playground.root.settings.username,
            'text': text,
        }));
    }
    receive_message(username, text) {
        this.playground.chat_field.add_message(username, text);
    }
}
```
### 后端
`consumers/multiplayer/index.py`
```
...
class MultiPlayer(AsyncWebsocketConsumer):
    ...
    async def message(self, data):
        await self.channel_layer.group_send(
            self.room_name,
            {
                'type': "group_send_event",
                'event': "message",
                'uuid': data['uuid'],
                'username': data['username'],
                'text': data['text'],
            }
        )
```
# 实现匹配系统ஐ
- [9. 实现匹配系统 | 讲义](https://www.acwing.com/file_system/file/content/whole/index/content/3435229/)
- [9.1 上课笔记 | 一只野生彩色铅笔](https://www.acwing.com/activity/content/code/content/2360556/)
***
本章节内容是利用 `thrift` 创建客户端-服务端交互的接口

然后利用该接口完成一个匹配系统

匹配系统由一个消息队列 + 生产者-消费者模型 + 匹配池 完成

基本与 Linux基础课 里的部分完全一致

当时我们是拿 cpp 来写的，写了差不多 200 行

本节会拿 py 来实现，差不多 140 行即可

`thrift` 接口文件
```
namespace py match_service

service Match {
    i32 add_player(1: i32 score, 2: string uuid, 3: string username, 4: string photo, 5: string channel_name),
}
```
然后用该源文件生成接口文件
## 服务端
配置 `asgi.py` 让服务端进程可以调用客户端进程里的函数

`acapp/acapp/asgi.py`
```
import os

import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'acapp.settings')
django.setup()
...
from channels.layers import get_channel_layer
channel_layer = get_channel_layer()
...
```
`acapp/match_system/src/main.py`
```
#! /usr/bin/env python3

import glob
import sys
sys.path.insert(0, glob.glob('../../')[0])

from match_server.match_service import Match

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

from queue import Queue
from time import sleep
from threading import Thread

from acapp.asgi import channel_layer
from asgiref.sync import async_to_sync
from django.core.cache import cache

queue = Queue()  # 消息队列

class Player:
    def __init__(self, score, uuid, username, photo, channel_name):
        self.score = score
        self.uuid = uuid
        self.username = username
        self.photo = photo
        self.channel_name = channel_name
        self.waiting_time = 0  # 等待时间


class Pool:
    def __init__(self):
        self.players = []

    def add_player(self, player):
        self.players.append(player)

    def check_match(self, a, b):
        dt = abs(a.score - b.score)
        a_max_dif = a.waiting_time * 50
        b_max_dif = b.waiting_time * 50
        return dt <= a_max_dif and dt <= b_max_dif

    def match_success(self, ps):
        print("Match Success: %s %s %s" % (ps[0].username, ps[1].username, ps[2].username))
        room_name = "room-%s-%s-%s" % (ps[0].uuid, ps[1].uuid, ps[2].uuid)
        players = []
        for p in ps:
            async_to_sync(channel_layer.group_add)(room_name, p.channel_name)
            players.append({
                'uuid': p.uuid,
                'username': p.username,
                'photo': p.photo,
                'hp': 100,
            })
        cache.set(room_name, players, 3600)  # 有效时间：1小时
        for p in ps:
            async_to_sync(channel_layer.group_send)(
                room_name,
                {
                    'type': "group_send_event",
                    'event': "create_player",
                    'uuid': p.uuid,
                    'username': p.username,
                    'photo': p.photo,
                }
            )

    def increase_waiting_time(self):
        for player in self.players:
            player.waiting_time += 1

    def match(self):
        while len(self.players) >= 3:
            self.players = sorted(self.players, key=lambda p: p.score)
            flag = False
            for i in range(len(self.players) - 2):
                a, b, c = self.players[i], self.players[i + 1], self.players[i + 2]
                if self.check_match(a, b) and self.check_match(a, c) and self.check_match(b, c):
                    self.match_success([a, b, c])
                    self.players = self.players[:i] + self.players[i + 3:]
                    flag = True
                    break
            if not flag:
                break

        self.increase_waiting_time()



class MatchHandler:
    def add_player(self, score, uuid, username, photo, channel_name):
        print("Add Player: %s %d" % (username, score))
        player = Player(score, uuid, username, photo, channel_name)
        queue.put(player)
        return 0


def get_player_from_queue():
    try:
        return queue.get_nowait()
    except:
        return None


def worker():
    pool = Pool()
    while True:
        player = get_player_from_queue()
        if player:
            pool.add_player(player)
        else:
            pool.match()
            sleep(1)



if __name__ == '__main__':
    handler = MatchHandler()
    processor = Match.Processor(handler)
    transport = TSocket.TServerSocket(host='127.0.0.1', port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TThreadedServer(
        processor, transport, tfactory, pfactory)

    Thread(target=worker, daemon=True).start()

    print('Starting the server...')
    server.serve()
    print('done.')
```
## 客户端
扩展数据库表，让其可以存放 rank分 的信息

`game/models/player/player.py`
```
...
class Player(models.Model):
    ...
    score = models.IntegerField(default=1500)
    ...
```
`consumers/multiplayer/index.py`
```
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.conf import settings
from django.core.cache import cache

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

from match_system.src.match_server.match_service import Match
from game.models.player.player import Player
from channels.db import database_sync_to_async

class MultiPlayer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        if self.room_name:
            await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def create_player(self, data):
        self.room_name = None
        self.uuid = data['uuid']
        # Make socket
        transport = TSocket.TSocket('127.0.0.1', 9090)
        # Buffering is critical. Raw sockets are very slow
        transport = TTransport.TBufferedTransport(transport)

        # Wrap in a protocol
        protocol = TBinaryProtocol.TBinaryProtocol(transport)

        # Create a client to use the protocol encoder
        client = Match.Client(protocol)

        def db_get_player():
            return Player.objects.get(user__username=data['username'])

        player = await database_sync_to_async(db_get_player)()

        # Connect!
        transport.open()

        client.add_player(player.score, data['uuid'], data['username'], data['photo'], self.channel_name)

        # Close!
        transport.close()
    
    async def group_send_event(self, data):
        if not self.room_name:
            keys = cache.keys('*%s*' % (self.uuid))
            if keys:
                self.room_name = keys[0]
        await self.send(text_data=json.dumps(data))
    ...
```
# 项目收尾ஐ
## 加密、压缩js代码
安装 `terser` :
```
sudo apt-get update
sudo apt-get install npm
sudo npm install terser -g
```
`terser` 不仅支持文件输入，也支持标准输入。结果会输出到标准输出中。

使用方式：
```
terser xxx.js -c -m
```
我们将整合 `js` 文件的脚本修改一下即可：

`scripts/compress_game_js.sh`
```
#! /bin/bash

JS_PATH=/home/acs/acapp/game/static/js/
JS_PATH_DIST=${JS_PATH}dist/
JS_PATH_SRC=${JS_PATH}src/

find $JS_PATH_SRC -type f -name '*.js' | sort | xargs cat | terser -c -m > ${JS_PATH_DIST}game.js

echo "yes" | python3 manage.py collectstatic
```
## 清理监听函数
在AcAPP关闭之前触发的事件可以通过如下api添加：
```
AcWingOS.api.window.on_close(func);
```
注意：

- 同一个页面中，多个 `acapp` 引入的 `js` 代码只会加载一次，因此 `AC_GAME_OBJECTS` 等全局变量是同一个页面、同一个 `acapp` 的所有窗口共用的
- 各自创建的局部变量是独立的，比如 `new AcGame()` 创建出的对象各个窗口是独立的

我们给每一个窗口创建一个 `uid` 然后根据不同的 `uid` 进行事件解绑

`playground/zbase.js`
```
class AcGamePlayground {
    ...
    create_uuid() {
        let res = "";
        for (let i = 0; i < 8; i ++ ) {
            let x = parseInt(Math.floor(Math.random() * 10));   //[0, 10)
            res += x;
        }
        return res;
    }
    start() {
        let outer = this;
        let uuid = this.create_uuid();
        $(window).on(`resize.${uuid}`, function() {
            outer.resize();
        });

        if (this.root.AcWingOS) {
            outer.root.AcWingOS.api.window.on_close(function() {
                $(window).off(`resize.${uuid}`);
            });
        }
    }
    ...
}
```
## 编写每局游戏的结束界面
单独创建一个结束界面，然后游戏结束的时候渲染出该结束界面即可

因为结束界面要覆盖在游戏界面之上，因此我们需要先修改一下游戏引擎，添加一个 `late_update`

在每一帧渲染的内容最后再渲染，从而实现结束界面叠加在游戏界面之上的效果

`ac_game_object/zbase.js`
```
...
class AcGameObject {
    ...
    late_update() { // 每一帧均会执行一次，且在所有 update 执行完后才执行

    }
    ...
}
...
let AC_GAME_ANIMATION = function(timestamp) {
    ...
    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
        let obj = AC_GAME_OBJECTS[i];
        obj.late_update();
    }
    ...
}
...
```
然后我们做一个渲染出结束界面的类

`playground/score_board/zbase.js`
```
class ScoreBoard extends AcGameObject {
    constructor(playground) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;

        this.state = null;  // win-胜利；lose-失败

        this.win_img = new Image();
        this.win_img.src = "https://cdn.acwing.com/media/article/image/2021/12/17/1_8f58341a5e-win.png";

        this.lose_img = new Image();
        this.lose_img.src = "https://cdn.acwing.com/media/article/image/2021/12/17/1_9254b5f95e-lose.png";
    }
    start() {
    }

    add_listening_events() {    // 点击后，返回主页面
        let outer = this;
        let $canvas = this.playground.game_map.$canvas;

        $canvas.on('click', function() {
            outer.playground.hide();
            outer.playground.root.menu.show();
        });
    }

    win() {
        this.state = "win";
        let outer = this;
        setTimeout(function() {
            outer.add_listening_events();
        }, 1000);   // 1秒后监听点击事件
    }

    lose() {
        this.state = "lose";
        let outer = this;
        setTimeout(function() {
            outer.add_listening_events();
        }, 1000);   // 1秒后监听点击事件
    }

    late_update() {
        this.render();  // 渲染在图层最上方
    }
    render() {
        let len = this.playground.height / 2;
        if (this.state === "win") {
            this.ctx.drawImage(this.win_img, this.playground.width / 2 - len / 2, this.playground.height / 2 - len / 2, len, len);
        } else if (this.state === "lose") {
            this.ctx.drawImage(this.lose_img, this.playground.width / 2 - len / 2, this.playground.height / 2 - len / 2, len, len);
        }
    }
}
```
通过游戏结束的逻辑判断，渲染结束界面，同时在结束并返回主菜单的时候，重置游戏元素

游戏元素重置

`playground/zbase.js`
```
class AcGamePlayground {
    ...
    show(mode) {    // 打开 playground 界面
        ...
        this.score_board = new ScoreBoard(this);
        ...
    }
    ...
    hide() {
        // 清空所有游戏元素
        while (this.players && this.players.length > 0) {
            this.players[0].destroy();
        }
        if (this.game_map) {
            this.game_map.destroy();
            this.game_map = null;
        }
        if (this.notice_board) {
            this.notice_board.destroy();
            this.notice_board = null;
        }
        if (this.score_board) {
            this.score_board.destroy();
            this.score_board = null;
        }
        this.$playground.empty();   // 清空所有html标签
        this.$playground.hide();
    }
}
```
游戏结束的逻辑判断

`playground/player/zbase.js`
```
class Player extends AcGameObject {
    ...
    update() {
        ...
        this.update_win();
        ...
    }
    update_win() {
        // 竞赛状态，且只有一名玩家，且改名玩家就是我，则胜利
        if (this.playground.state === "fighting" && this.character === "me" && this.playground.players.length === 1) {
            this.playground.state = "over";
            this.playground.score_board.win();
        }
    }
    ...
    on_destroy() {
        // 我死亡，且游戏处于竞赛状态，则失败
        if (this.character === "me" && this.playground.state === "fighting") {
            this.playground.state = "over"
            this.playground.score_board.lose();
        }
        ...
    }
}
```
## 更新战绩
这里我们完全交给后端来判断

在处理广播的 `attack` 信息的时候，先前我们额外留了一个参数 `hp`

围绕该 `hp` 进行续写，若当前房间内 `hp` 大于 0 的玩家少于等于 1 个

则对于所有 `hp` 为 0 的玩家减 `rank` 分，大于 0 的玩家加 `rank` 分

`consumers/multiplayer/index.py`
```
...
class MultiPlayer(AsyncWebsocketConsumer):
    ...
    async def attack(self, data):
        if not self.room_name:
            return
        players = cache.get(self.room_name)

        if not players:
            return

        for player in players:
            if player['uuid'] == data['attackee_uuid']:
                player['hp'] -= 25

        remain_cnt = 0
        for player in players:
            if player['hp'] > 0:
                remain_cnt += 1

        if remain_cnt > 1:  # 继续进行游戏
            if self.room_name:
                cache.set(self.room_name, players, 3600)
        else:   # 结算 
            def db_update_player_score(username, score):
                player = Player.objects.get(user__username=username)
                player.score += score
                player.save()
            for player in players:
                if player['hp'] <= 0:
                    await database_sync_to_async(db_update_player_score)(player['username'], -5)
                else:
                    await database_sync_to_async(db_update_player_score)(player['username'], 10)
        ...
    ...
```
## 添加favicon.ico
这是修正一个小 BUG，之前 web 端一直没有网页显示图标，这里给他加上去

`game/templates/multiends/web.html`
```
...
<head>
    ...
    <link rel="icon" href="https://cdn.acwing.com/media/article/image/2021/12/17/1_be4c11ce5f-acapp.png">
</head>
...
```
# 各种环境命令
1. 启动`django`项目，在`~/acapp`目录下执行：
```
python3 manage.py runserver 0.0.0.0:8000
```
2. 每次修改好 `game/static`  下的文件后，需要在`~/acapp`目录下运行打包文件：
```
./scripts/compress_game_js.sh
```
3. 在定义完一个数据表之后，需要将创建的数据表更新到 `django` 的数据库中去：
```python
$ python3 manage.py makemigrations
> Migrations for 'game':
>   game/migrations/0001_initial.py
>     - Create model Player
$ 
$ python3 manage.py migrate
> Operations to perform:
>   Apply all migrations: admin, auth, contenttypes, game, sessions
> Running migrations:
>   Applying game.0001_initial... OK
```
4. 启动`nginx`服务，用于域名访问：
```
sudo /etc/init.d/nginx start
```
5. 启动`uwsgi`服务，用于域名访问：
```
uwsgi --ini scripts/uwsgi.ini
```
6. 关闭`uwsgi`服务：
```
sudo pkill -f uwsgi -9
```
7. 启动 `redis-server`，用于一键登录：
```
sudo redis-server /etc/redis/redis.conf
```
8. 启动 `Django_channels`，用于联机对战，在`~/acapp`目录下执行：
```
daphne -b 0.0.0.0 -p 5015 acapp.asgi:application
```
9. 启动`thrift`服务，用于匹配系统，在`~/acapp/match_system/src/`目录下执行：
```
./main.py
```
10. 版本更新，在[术士之战](https://www.acwing.com/user/myspace/application/update/2433/)中将 `js地址` 一栏更新为：
```
// 本地文件夹中对应的文件也需要更改名字
https://app2433.acapp.acwing.com.cn/static/js/dist/game-版本号.js
```
