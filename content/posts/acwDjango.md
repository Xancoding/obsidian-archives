---
title: "AcWing Django 框架课" # 标题
date: 2022-10-29T18:23:59+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- AcWing
- Django
- 新技能
keywords: # 关键词
- Tech
- AcWing
- Django
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
### **实现一个路由重定向**
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
#### **网页渲染流程**
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
## **实现游戏引擎框架**
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
# 部署nginx与对接acapp 
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
