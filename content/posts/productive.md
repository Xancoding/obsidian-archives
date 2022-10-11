---
title: "如何提高生产力？" # 标题
date: 2022-10-11T07:47:58+08:00 # 创建时间
author: ["Xan"] # 作者
categories: # 分类
- Tech
tags: # 标签
- Life
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



[Django框架课](https://www.acwing.com/activity/content/punch_the_clock/72/)
***
[[SSH]]
[[Docker]]
[[SHELL]]
[[Ngnix&uwsgi]]
[[Redis]]
[[WSS]]
[[Django_channels]]
[[账号系统]]
[[JS简易游戏引擎实现]]
[[JS模块引用]]
[acapp 项目自动化运行](https://www.acwing.com/solution/content/114359/)
***
# 项目创建&运行
[2.1. 创建 django 项目](https://www.acwing.com/solution/content/72577/)
1. `ssh django`
2. `django-admin startproject acapp`：在当前目录下创建名为`acapp`的`django`项目
3. 将项目用`git`维护起来
	1. `ssh-key-gen`：在`服务器`中生成密钥（`git`通过`ssh`传文件）
	2. 在`AcGit`中`SSH密钥`中添加`SSH公钥`
	3. `git init`：创建`git`仓库
	4. 在`AcGit`上新建空白项目
```

git config --global user.name xxx
git config --global user.email xxx@xxx.com
git add .
git commit -m "xxx"
git remote add origin git@git.acwing.com:xxx/XXX.git #建立连接
git push --set-upstream origin master
```
-  在本地运行项目： `python3 manage.py runserver 0.0.0.0:8000`
- 重点：每个 app 里面有这四个东西
	- Models：管理数据库数据
	- Views：管理 `http` 函数（接收浏览器请求，返回字符串至浏览器）
	- Urls：管理路由，即链接与函数的对应关系 (接收链接，调用相对应的函数)
	- Templates：存储网页模板管理 `html`  文件
[2.1上课笔记](https://www.acwing.com/solution/content/73097/)
# 菜单界面&项目架构设计
[创建菜单界面-Vedio](https://www.acwing.com/video/3519/)
[创建菜单界面-讲义](https://www.acwing.com/file_system/file/content/whole/index/content/3199626/)
[3.1 上课笔记](https://www.acwing.com/solution/content/73121/)
将 `src`文件夹下的 `JS`源文件打包至 `dist` 文件夹
```shell

#! /bin/bash

JS_PATH=/home/acs/acapp/game/static/js/
JS_PATH_DIST=${JS_PATH}dist/
JS_PATH_SRC=${JS_PATH}src/

find $JS_PATH_SRC -type f -name '*.js' | sort | xargs cat > ${JS_PATH_DIST}game.js
```
**网页渲染流程**：根据用户的链接，首先进入`acapp/urls.py`，根据`path`再进入`game/urls/index.py`，再根据`path`进入下一层`url`或调用相对应的`views`中的`index.py`函数，函数接收参数，在网页端渲染`templates/multiends`下的`web.html`，`html`中有`JS`执行
注意：本项目为前后端分离，即通过`JS`在`client`中渲染项目(动态生成页面)，而不是在`server`渲染项目
# 游戏界面
### 单人游戏
[4.1 创建游戏界面-Vedio](https://www.acwing.com/video/3520/)
[4.1 上课笔记](https://www.acwing.com/solution/content/79181/)
- 若修改`static文件夹`下的相关文件，需在`~/acapp`下执行`./scripts/compress_game_js.sh`来打包文件
### 联机对战
[实现联机对战——讲义](https://www.acwing.com/file_system/file/content/whole/index/content/3357332/)
[7.1 实现联机对战（上）-Vedio](https://www.acwing.com/video/3581/) 
[配置channelsredis](https://www.acwing.com/blog/content/12692/)
统一长度单位：7m20s~38m 
创建的时候相对于窗口大小创建不同元素适应窗口，画的时候要在这个窗口绝对位置去画
增加“联机对战”模式：40m10s~49m
联机原理：50m~1h2m40s
配置channelsredis：1h2m40s~1h09m11s
[7.1 上课笔记](https://www.acwing.com/solution/content/89506/)
[7.2 实现联机对战（下）-Vedio](https://www.acwing.com/video/3582/)
[7.2 上课笔记](https://www.acwing.com/solution/content/88801/)
#### 调试
1. `~/acapp` 文件夹下执行 `python3 manage.py shell`
2. 
```python

Def clear ():
	For key in cache. Keys ('*'):
		Cache. Delete(key)
```

3. `from django.core.cache import cache`

# 聊天系统
[8.1 聊天功能的实现-Vedio](https://www.acwing.com/video/3603/) 
[8.1 上课笔记](https://www.acwing.com/solution/content/89508/)

# 匹配系统
[[Thrift]]
[9.1 实现匹配系统——thrift服务-Vedio](https://www.acwing.com/video/3618/)
[9.1 上课笔记](https://www.acwing.com/activity/content/code/content/2360556/)
# 项目收尾
[讲义](https://www.acwing.com/file_system/file/content/whole/index/content/3435229/)
[9.2 实现匹配系统——项目收尾-Vedio](https://www.acwing.com/video/3619/ )
[9.2 上课笔记](https://www.acwing.com/activity/content/code/content/2360556/)
# 版本更新
 - 在[术士之战](https://www.acwing.com/user/myspace/application/update/2433/)中将**js地址**一栏更新为`https://app2433.acapp.acwing.com.cn/static/js/dist/game-版本号.js`
	- 注：文件夹中对应的文件也需要更改名字




